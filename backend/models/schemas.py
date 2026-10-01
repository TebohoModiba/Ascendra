from typing import Optional, Literal
from pydantic import BaseModel, Field


class UserInput(BaseModel):
    resume: str = Field(..., min_length=20, max_length=20000)
    target_role: str = Field(..., min_length=2, max_length=200)
    country: str = Field("us", max_length=2)


# ---- AI reasoning models ----

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


# ---- External data models ----

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


# ---- Trend analysis models ----

class EmergingSkill(BaseModel):
    skill: str
    why: str
    demand: Literal["high", "medium"]


class DecliningSkill(BaseModel):
    skill: str
    why: str
    timeline: str


class HotLocation(BaseModel):
    city: str
    count: Optional[int] = None


class SalaryRange(BaseModel):
    min: Optional[float] = None
    max: Optional[float] = None
    median: Optional[float] = None


class TrendAnalysis(BaseModel):
    market_outlook: str
    demand_trend: Literal["rising", "stable", "cooling"]
    emerging_skills: list[EmergingSkill]
    declining_skills: list[DecliningSkill]
    salary_trend: str
    hot_locations: list[HotLocation]
    top_companies: list[str]
    salary_range: Optional[SalaryRange] = None
    sample_size: int
    confidence: Literal["high", "medium", "low"]


# ---- API response ----

class SuggestionResponse(BaseModel):
    readiness_score: int
    career_move_type: Literal["vertical", "horizontal", "cross-industry"]
    gap_analysis: GapAnalysis
    upskilling: list[UpskillingItem]
    assignments: list[str]
    jobs: list[Job]
    contacts: list[Contact]
    trend_analysis: TrendAnalysis