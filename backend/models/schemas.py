from typing import Optional, Literal
from pydantic import BaseModel, Field


class UserInput(BaseModel):
    resume: str = Field(..., min_length=20, max_length=20000)
    target_role: str = Field(..., min_length=2, max_length=200)
    country: str = Field("us", max_length=2)


class TransferableSkill(BaseModel):
    has: str
    maps_to: str


class MissingSkill(BaseModel):
    skill: str
    importance: Literal["high", "medium", "low"]
    difficulty: Literal["easy", "medium", "hard"]
    priority: int


class GapAnalysis(BaseModel):
    matched_skills: list[str]
    transferable_skills: list[TransferableSkill]
    missing_skills: list[MissingSkill]
    seniority_delta: str


class UpskillingItem(BaseModel):
    skill: str
    why_it_matters: str
    suggested_steps: list[str]
    estimated_weeks: int


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
    readiness_score: int
    career_move_type: Literal["vertical", "horizontal", "cross-industry"]
    gap_analysis: GapAnalysis
    upskilling: list[UpskillingItem]
    assignments: list[str]
    jobs: list[Job]
    contacts: list[Contact]