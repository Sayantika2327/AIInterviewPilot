from pydantic import BaseModel, EmailStr


# ----------------------------
# Register Request
# ----------------------------
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


# ----------------------------
# Login Request
# ----------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ----------------------------
# User Response
# ----------------------------
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    resume_uploaded: bool = False
    ats_score: float = 0
    interview_score: float = 0
    interviews_taken: int = 0

    class Config:
        from_attributes = True


# ----------------------------
# JWT Token Response
# ----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str