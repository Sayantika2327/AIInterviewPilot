from sqlalchemy import Column, ForeignKey, Integer, Text

from app.core.database import Base


class InterviewReport(Base):
    __tablename__ = "interview_reports"

    id = Column(Integer, primary_key=True, index=True)

    interview_id = Column(
        Integer,
        ForeignKey("interviews.id"),
        nullable=False,
    )

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    confidence_score = Column(Integer)

    overall_score = Column(Integer)

    strengths = Column(Text)

    weaknesses = Column(Text)

    roadmap = Column(Text)