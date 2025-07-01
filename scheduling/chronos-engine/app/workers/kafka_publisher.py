# File: app/workers/kafka_publisher.py

import os
import asyncio
import pydantic
from aiokafka import AIOKafkaProducer
from models.kafka_payload import KafkaMessage
from .base import BaseWorker
KAFKA_BROKERS = os.getenv("KAFKA_BROKERS", "kafka:9092")
KAFKA_TOPIC = "campaign_tasks"

class KafkaPublisherWorker(BaseWorker):
    def __init__(self):
        super().__init__(worker_name="KafkaPublisherWorker", sleep_interval_seconds=5)
        self.producer = None
    async def setup(self):
        await super().setup()
        self.producer = AIOKafkaProducer(bootstrap_servers=KAFKA_BROKERS)
        await self.producer.start()
        self.logger.info("AIOKafkaProducer started.")

    async def shutdown(self):
        if self.producer:
            await self.producer.stop()
        await super().shutdown()

    async def do_work(self):
        async with self.pg_pool.acquire() as connection:
            sql_select = """
                SELECT id, payload FROM kafka_outbox
                WHERE status = 'pending' ORDER BY created_at LIMIT 10 FOR UPDATE SKIP LOCKED;
            """
            records = await connection.fetch(sql_select)
            if not records:
                return

            self.logger.info(f"Found {len(records)} tasks in outbox to publish.")
            for record in records:
                try:
                    task_id_from_db = record['payload']#your payload
                    kafka_message = KafkaMessage(task_id=task_id_from_db)
                    message_value = kafka_message.model_dump_json()
                    await self.producer.send_and_wait(
                        KAFKA_TOPIC,
                        value=message_value.encode('utf-8'),
                        key=record['mongodb_task_id'].encode('utf-8')
                    )
                    
                    sql_update = "UPDATE kafka_outbox SET status = 'sent' WHERE id = $1"
                    await connection.execute(sql_update, record['id'])
                    self.logger.info(f"Published task {record['mongodb_task_id']} and marked as sent.")
                except Exception as e:
                    self.logger.error(f"Failed to publish task with outbox ID {record['id']}. It will be retried. Error: {e}")

if __name__ == "__main__":
    worker = KafkaPublisherWorker()
    worker.start()