from pydantic import BaseModel


class InterviewStartRequest(BaseModel):
    job_description: str


class InterviewStartResponse(BaseModel):
    interview_id: int
    question: str


class InterviewAnswerRequest(BaseModel):
    question: str
    answer: str


class InterviewEvaluationResponse(BaseModel):
    score: int
    feedback: str
    ideal_answer: str


class InterviewNextRequest(BaseModel):
    interview_id: int
    answer: str