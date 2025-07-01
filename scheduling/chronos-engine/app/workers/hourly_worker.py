
import asyncio
from .base import BaseWorker 

class HourlyWorker(BaseWorker):
    def __init__(self):
        super().__init__(worker_name="HourlyWorker", sleep_interval_seconds=300)# 5 minutes

    async def do_work(self):
        
        async with self.pg_pool.acquire() as connection:
            async with connection.transaction():
                sql = """
                    WITH moved_tasks AS (
                        DELETE FROM hourly_bucket
                        WHERE scheduled_time <= NOW()
                        RETURNING id
                    )
                    INSERT INTO kafka_outbox (mongodb_task_id, payload)
                    SELECT id, json_build_object('task_id', id) AS payload
                    FROM moved_tasks;
                """
                result = await connection.execute(sql)
                try:
                    moved_count = int(result.split(" ")[2])
                    if moved_count > 0:
                        self.logger.info(f"Moved {moved_count} tasks to kafka_outbox.")
                except (IndexError, ValueError):
                    pass


if __name__ == "__main__":
    worker = HourlyWorker()
    worker.start() 