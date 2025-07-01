import logging
import os
import asyncio
import aiosqlite


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

SQLITE_PATH = os.getenv("SQLITE_PATH", "../../../../webapp/prisma/dev.db")


class BaseWorker:
    def __init__(self, worker_name: str, sleep_interval_seconds: int):
        self.worker_name = worker_name
        self.sleep_interval = sleep_interval_seconds
        self.sqlite_db = None
        self.logger = logging.getLogger(self.worker_name)

    async def setup(self):
        self.logger.info("--- Setting up worker ---")
        try:
            self.sqlite_db = await aiosqlite.connect(SQLITE_PATH)
            self.sqlite_db.row_factory = aiosqlite.Row  # Optional: allows dict-like access to rows
            self.logger.info(f"SQLite database opened at {SQLITE_PATH}.")
        except Exception as e:
            self.logger.error(f"Failed to connect to SQLite: {e}")
            raise

    async def shutdown(self):
        self.logger.info("--- Shutting down worker ---")
        if self.sqlite_db:
            await self.sqlite_db.close()
            self.logger.info("SQLite connection closed.")

    async def do_work(self):
        raise NotImplementedError("Subclasses must implement do_work method.")

    async def run(self):
        await self.setup()
        try:
            while True:
                self.logger.info("Waking up to do work...")
                try:
                    await self.do_work()
                except Exception as e:
                    self.logger.error(f"Error doing work: {e}")
                self.logger.info(f"Work complete. Sleeping for {self.sleep_interval} seconds.")
                await asyncio.sleep(self.sleep_interval)
        except asyncio.CancelledError:
            self.logger.info("Received cancellation signal.")
        finally:
            await self.shutdown()

    def start(self):
        try:
            asyncio.run(self.run())
        except KeyboardInterrupt:
            self.logger.info("Worker stopped by user.")
