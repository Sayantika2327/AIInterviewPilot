from sqlalchemy.orm import Session

from app.models.interview_answer import InterviewAnswer
from app.models.interview_question import InterviewQuestion


class InterviewAnswerRepository:

    @staticmethod
    def create(
        db: Session,
        question_id: int,
        answer: str,
        score: int,
        feedback: str,
        ideal_answer: str,
    ):

        obj = InterviewAnswer(
            question_id=question_id,
            answer=answer,
            score=score,
            feedback=feedback,
            ideal_answer=ideal_answer,
        )

        db.add(obj)
        db.commit()
        db.refresh(obj)

        return obj

    @staticmethod
    def get_all_by_interview(
        db: Session,
        interview_id: int,
    ):

        return (
            db.query(InterviewAnswer)
            .join(
                InterviewQuestion,
                InterviewAnswer.question_id == InterviewQuestion.id,
            )
            .filter(
                InterviewQuestion.interview_id == interview_id
            )
            .all()
        )

    @staticmethod
    def get_full_interview(
        db: Session,
        interview_id: int,
    ):

        return (
            db.query(
                InterviewQuestion.question_number,
                InterviewQuestion.question,
                InterviewAnswer.answer,
                InterviewAnswer.score,
                InterviewAnswer.feedback,
                InterviewAnswer.ideal_answer,
            )
            .join(
                InterviewAnswer,
                InterviewQuestion.id == InterviewAnswer.question_id,
            )
            .filter(
                InterviewQuestion.interview_id == interview_id,
            )
            .order_by(
                InterviewQuestion.question_number,
            )
            .all()
        )