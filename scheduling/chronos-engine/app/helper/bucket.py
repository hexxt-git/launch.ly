from datetime import datetime, timedelta
from enum import Enum

class TimeBucket(Enum):
    YEARLY = "yearly_bucket"
    MONTHLY = "monthly_bucket"
    WEEKLY = "weekly_bucket"
    DAILY ="daily_bucket"
    HOURLY = "hourly_bucket"
    
    
def get_bucket_name(scheduled_time: datetime):
    now = datetime.now(scheduled_time.tzinfo) 
    if scheduled_time > now + timedelta(days=30):
        return TimeBucket.YEARLY.value
    elif scheduled_time > now + timedelta(days=7):
        return TimeBucket.MONTHLY.value
    elif scheduled_time > now + timedelta(days=1):
        return TimeBucket.WEEKLY.value
    elif scheduled_time > now + timedelta(hours=1):
        return TimeBucket.DAILY.value
    else:
        return TimeBucket.HOURLY.value

    
    
    

