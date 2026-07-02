from pydantic import BaseModel


class QuestionAnalysis(BaseModel):
    question_number: int
    question: str
    candidate_answer: str
    ideal_answer: str
    score: int
    feedback: str


class InterviewReportRequest(BaseModel):
    interview_id: int


class InterviewReportResponse(BaseModel):
    overall_score: int
    technical_score: int
    communication_score: int
    confidence_score: int
    problem_solving_score: int

    strengths: list[str]
    weaknesses: list[str]
    learning_roadmap: list[str]

    overall_feedback: str
    hiring_recommendation: str

    question_analysis: list[QuestionAnalysis]