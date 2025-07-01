# File: app/workers/daily_worker.py

import asyncio
from .base import BaseWorker

class DailyWorker(BaseWorker):
    def __init__(self):
        super().__init__(worker_name="DailyWorker", sleep_interval_seconds=3600)

    async def do_work(self):
  
        async with self.pg_pool.acquire() as connection:
            async with connection.transaction():
                sql = """
                    WITH moved_tasks AS (
                        DELETE FROM daily_bucket
                        WHERE scheduled_time <= NOW() + interval '1 hour'
                        RETURNING mongodb_task_id, scheduled_time
                    )
                    INSERT INTO hourly_bucket (mongodb_task_id, scheduled_time)
                    SELECT mongodb_task_id, scheduled_time
                    FROM moved_tasks;
                """
                result = await connection.execute(sql)
                try:
                    moved_count = int(result.split(" ")[2])
                    if moved_count > 0:
                        self.logger.info(f"Moved {moved_count} tasks from daily to hourly bucket.")
                except (IndexError, ValueError):
                    pass 

if __name__ == "__main__":
    worker = DailyWorker()
    worker.start()