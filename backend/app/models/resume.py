from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Float,
    Text,
)
from sqlalchemy.sql import func

from app.core.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    file_path = Column(String(500), nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # ---------- ATS ----------
    job_description = Column(Text)

    ats_score = Column(Float, default=0)

    matched_skills = Column(Text)

    missing_skills = Column(Text)

    suggestions = Column(Text)