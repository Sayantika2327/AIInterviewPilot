from pydantic import BaseModel
from datetime import datetime


class UploadResponse(BaseModel):
    filename: str
    uploaded_at: datetime