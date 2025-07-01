import os
import logging
import asyncio
import motor.motor_asyncio
import uvicorn
from aiokafka import AIOKafkaConsumer
from datetime import datetime, timezone
from pydantic import BaseModel, ValidationError
from fastapi import FastAPI, Request
from starlette.responses import StreamingResponse
from ..models.campaign import kafkaMessage

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("CampaignExecutor")

KAFKA_BROKERS = os.getenv("KAFKA_BROKERS", "localhost:9092")
KAFKA_TOPIC = "campaign_tasks"
KAFKA_CONSUMER_GROUP = "campaign_executor_group"
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8001
sse_queue = asyncio.Queue()
app = FastAPI()

@app.get("/events")
async def sse_endpoint(request: Request):

    async def event_generator():
        while True:
            if await request.is_disconnected():
                logger.info("Client disconnected from SSE stream.")
                break
            
            campaign_json = await sse_queue.get()
            yield f"data: {campaign_json}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


class CampaignExecutor:
    def __init__(self, queue: asyncio.Queue):
        self.mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
        self.mongo_db = self.mongo_client.schedule_db
        self.consumer = AIOKafkaConsumer(
            KAFKA_TOPIC,
            bootstrap_servers=KAFKA_BROKERS,
            group_id=KAFKA_CONSUMER_GROUP,
            auto_offset_reset='earliest'
        )
        self.sse_queue = queue
        logger.info("CampaignExecutor instance created.")

    async def _execute_single_campaign(self, campaign: kafkaMessage):

        logger.info("--- EXECUTING CAMPAIGN ---")
        logger.info(f"  Campaign ID:   {campaign.id}")
        logger.info(f"  Name:          {campaign.name}")
        logger.info(f"  Contact:       {campaign.contact}")
        logger.info("--------------------------")


        # Put the processed message onto the queue for SSE streaming
        await self.sse_queue.put(campaign.model_dump_json())
        logger.info(f"Campaign {campaign.id} sent to SSE stream.")


    async def run_consumer(self):

        await self.consumer.start()
        try:
            async for msg in self.consumer:
                try:
                    campaign = kafkaMessage.model_validate_json(msg.value)
                    logger.info(f"Consumer received valid campaign: {campaign.id}")
                    await self._execute_single_campaign(campaign)
                except ValidationError as e:
                    logger.error(f"Pydantic validation failed for message: {msg.value.decode('utf-8')}\nError: {e}")
                except Exception as e:
                    logger.error(f"Error processing message: {e}", exc_info=True)
        finally:
            await self.consumer.stop()
            self.mongo_client.close()

async def main():

    executor = CampaignExecutor(queue=sse_queue)
    
    config = uvicorn.Config(app, host=SERVER_HOST, port=SERVER_PORT, log_level="info")
    server = uvicorn.Server(config)

    consumer_task = asyncio.create_task(executor.run_consumer())
    server_task = asyncio.create_task(server.serve())

    await asyncio.gather(consumer_task, server_task)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Application stopped by user.")