from sqlalchemy import Column, ForeignKey, Integer, Text

from app.core.database import Base


class InterviewAnswer(Base):
    __tablename__ = "interview_answers"

    id = Column(Integer, primary_key=True, index=True)

    question_id = Column(
        Integer,
        ForeignKey("interview_questions.id"),
        nullable=False,
    )

    answer = Column(
        Text,
        nullable=False,
    )

    score = Column(
         Integer,
        default=0,
    )

    feedback = Column(
        Text,
        nullable=True,
    )

    ideal_answer = Column(
        Text,
        nullable=True,
    )