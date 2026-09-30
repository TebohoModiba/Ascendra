from typing import Optional
from pydantic import BaseModel, Field


class UserInput(BaseModel):
    resume: str = Field(..., min_length=20, max_length=20000)
    target_role: str = Field(..., min_length=2, max_length=200)
    country: str = Field("us", max_length=2)


class Contact(BaseModel):
    name: Optional[str] = None
    email: str
    position: Optional[str] = None
    confidence: Optional[int] = None
    company: Optional[str] = None


class Job(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    url: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None


class SuggestionResponse(BaseModel):
    upskilling: list[str]
    assignments: list[str]
    jobs: list[Job]
    contacts: list[Contact]