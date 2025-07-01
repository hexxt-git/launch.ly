
import asyncio
import logging
from .monthly_worker import MonthlyWorker
from .weekly_worker import WeeklyWorker
from .daily_worker import DailyWorker
from .hourly_worker import HourlyWorker
from .kafka_publisher import KafkaPublisherWorker
from kafka_consumer.campaign_executor import CampaignExecutor
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("MainWorkerProcess")
async def main():
    logger.info("test test test test ")
    tasks_to_run = [
        MonthlyWorker(),
        WeeklyWorker(),
        DailyWorker(),
        HourlyWorker(),
        KafkaPublisherWorker(),
        CampaignExecutor(),  
    ]
    tasks = [
        asyncio.create_task(instance.run()) for instance in tasks_to_run
    ]

    logger.info(f"Scheduled {len(tasks)} background tasks to run concurrently.")

    await asyncio.gather(*tasks)
if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("test test hbss")