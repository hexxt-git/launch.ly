import uuid
from pydantic import BaseModel, Field
from datetime import datetime, timezone

class meta(BaseModel):
    id :str
    name :str
    contact:str
    startTime :datetime
class kafkaMessage(meta):
    pass    
    
    

        
