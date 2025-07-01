
import os
import logging
from fastapi import FastAPI, Request, HTTPException, status
import asyncpg
import motor.motor_asyncio
from kafka.admin import KafkaAdminClient, NewTopic
from kafka.errors import TopicAlreadyExistsError

from models.campaign import CreateScheduledCampaign, ScheduleinDb
from repositories.campaign import CampaignRepository

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = FastAPI()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://mongo:27017/schedule_db")
POSTGRES_DSN = os.getenv("POSTGRES_DSN", "postgresql://user:password@postgres:5432/scheduler_buckets")
KAFKA_BROKERS = os.getenv("KAFKA_BROKERS", "kafka:9092")
topic_name = "campaign_tasks"
async def setup_database_tables(pool: asyncpg.Pool):
    logger.info("Checking/Creating PostgreSQL tables...")
    async with pool.acquire() as connection:
        commands = [
            "CREATE TABLE IF NOT EXISTS yearly_bucket (id SERIAL PRIMARY KEY NOT NULL UNIQUE, scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL);",
            "CREATE TABLE IF NOT EXISTS monthly_bucket (id SERIAL PRIMARY KEY, scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL);",
            "CREATE TABLE IF NOT EXISTS weekly_bucket (id SERIAL PRIMARY KEY, scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL);",
            "CREATE TABLE IF NOT EXISTS daily_bucket (id SERIAL PRIMARY KEY,  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL);",
            "CREATE TABLE IF NOT EXISTS hourly_bucket (id SERIAL PRIMARY KEY,  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL);",
                        """
            CREATE TABLE IF NOT EXISTS kafka_outbox (
                id SERIAL PRIMARY KEY,
                payload TEXT NOT NULL, -- Changed from JSONB to TEXT
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                status VARCHAR(20) DEFAULT 'pending'
            );
            """,
            "CREATE INDEX IF NOT EXISTS idx_yearly_scheduled_time ON yearly_bucket(scheduled_time);",
            "CREATE INDEX IF NOT EXISTS idx_monthly_scheduled_time ON monthly_bucket(scheduled_time);",
            "CREATE INDEX IF NOT EXISTS idx_weekly_scheduled_time ON weekly_bucket(scheduled_time);",
            "CREATE INDEX IF NOT EXISTS idx_daily_scheduled_time ON daily_bucket(scheduled_time);",
            "CREATE INDEX IF NOT EXISTS idx_hourly_scheduled_time ON hourly_bucket(scheduled_time);",
            "CREATE INDEX IF NOT EXISTS idx_kafka_outbox_status ON kafka_outbox(status, created_at);"
        ]
        
        for command in commands:
            await connection.execute(command)
            
    logger.info("PostgreSQL tables setup complete.")
async def setup_kafka_topic():
    logger.info("Checking Kafka topic setup...")
    try:
        admin_client = KafkaAdminClient(bootstrap_servers=KAFKA_BROKERS)
        existing_topics = admin_client.list_topics()
        if topic_name in existing_topics:
            logger.info(f"Kafka topic '{topic_name}' already exists.")
        else:
            logger.info(f"Kafka topic '{topic_name}' not found. Creating it with 3 partitions...")
            new_topic = NewTopic(name=topic_name, num_partitions=3, replication_factor=1)
            admin_client.create_topics(new_topics=[new_topic], validate_only=False)
            logger.info(f"Kafka topic '{topic_name}' created successfully.")
    except Exception as e:
        logger.error(f"Failed to setup Kafka topic: {e}")
    finally:
        if 'admin_client' in locals():
            admin_client.close()
    
@app.on_event("startup")
async def startup_event():
    try:
        app.state.mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
        app.state.mongo_db = app.state.mongo_client.schedule_db
        logger.info("MongoDB client started.")
        
        app.state.pg_pool = await asyncpg.create_pool(dsn=POSTGRES_DSN)
        await setup_database_tables(app.state.pg_pool)
        await setup_kafka_topic()


    except Exception as e:
        logger.critical(f"FATAL: Database connection failed during startup: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Runs when the app shuts down. Closes connections."""
    logger.info("--- Shutting down application ---")
    if hasattr(app.state, 'mongo_client'):
        app.state.mongo_client.close()
    if hasattr(app.state, 'pg_pool'):
        await app.state.pg_pool.close()
    logger.info("Database clients shut down successfully.")


@app.get("/")
async def read_root():
    return {"message": "Chronos Engine API is running!"}


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check(request: Request):
    services_status = {"api": "ok", "mongodb": "error", "postgresql": "error"}
    try:
        await request.app.state.mongo_db.command('ping')
        services_status["mongodb"] = "ok"
    except Exception as e:
        logger.error(f"Health check failed for MongoDB: {e}")

    try:
        async with request.app.state.pg_pool.acquire() as connection:
            await connection.fetchval("SELECT 1")
        services_status["postgresql"] = "ok"
    except Exception as e:
        logger.error(f"Health check failed for PostgreSQL: {e}")



    if "error" in services_status.values():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=services_status
        )
    return services_status


@app.post("/campaigns", status_code=status.HTTP_201_CREATED)
async def create_campaign(campaign: CreateScheduledCampaign, request: Request)->ScheduleinDb:
    db_clients = {
        "mongo_db": request.app.state.mongo_db,
        "pg_pool": request.app.state.pg_pool
    }
    return await CampaignRepository.schedule_campaign(campaign, db_clients)