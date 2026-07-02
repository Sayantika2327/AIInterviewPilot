from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    job_description = Column(
        Text,
        nullable=False,
    )

    current_question = Column(
        Integer,
        default=1,
    )

    total_questions = Column(
        Integer,
        default=10,
    )

    status = Column(
        String(20),
        default="in_progress",
    )

    overall_score = Column(
        Integer,
        default=0,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )