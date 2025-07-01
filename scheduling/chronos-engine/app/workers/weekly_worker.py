# File: app/workers/weekly_worker.py

import asyncio
from .base import BaseWorker

class WeeklyWorker(BaseWorker):
    def __init__(self):
        super().__init__(worker_name="WeeklyWorker", sleep_interval_seconds=86400)

    async def do_work(self):
        async with self.pg_pool.acquire() as connection:
            async with connection.transaction():
                sql = """
                    WITH moved_tasks AS (
                        DELETE FROM weekly_bucket
                        WHERE scheduled_time <= NOW() + interval '1 day'
                        RETURNING id, scheduled_time
                    )
                    INSERT INTO daily_bucket (id, scheduled_time)
                    SELECT mongodb_task_id, scheduled_time
                    FROM moved_tasks;
                """
                result = await connection.execute(sql)
                try:
                    moved_count = int(result.split(" ")[2])
                    if moved_count > 0:
                        self.logger.info(f"Moved {moved_count} tasks from weekly to daily bucket.")
                except (IndexError, ValueError):
                    pass

if __name__ == "__main__":
    worker = WeeklyWorker()
    worker.start()