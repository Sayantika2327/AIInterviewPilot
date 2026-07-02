from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer

from app.core.database import Base


class UserStats(Base):
    __tablename__ = "user_stats"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
    )

    resume_uploaded = Column(
        Boolean,
        default=False,
    )

    ats_score = Column(
        Float,
        default=0,
    )

    interview_score = Column(
        Float,
        default=0,
    )

    interviews_taken = Column(
        Integer,
        default=0,
    )