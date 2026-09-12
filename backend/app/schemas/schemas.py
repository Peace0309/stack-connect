"""Pydantic v2 request/response schemas."""

from __future__ import annotations

from datetime import date, datetime
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field


# --- auth ------------------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    designation: str
    grade: Optional[str] = None
    division: Optional[str] = None
    location: Optional[str] = None
    department: Optional[str] = None
    role: Literal["employee", "admin"]
    learning_hours: float = 0
    joined_on: Optional[date] = None

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# --- competencies ----------------------------------------------------
class CompetencyOut(BaseModel):
    id: str
    name: str
    category: str
    description: str
    required_level: int
    is_emerging: bool = False

    model_config = {"from_attributes": True}


class UserCompetencyOut(BaseModel):
    competency_id: str
    current_level: int
    source: str
    assessed_at: datetime

    model_config = {"from_attributes": True}


class GapRow(BaseModel):
    competency_id: str
    name: str
    category: str
    current: int
    required: int
    gap: int
    severity: Literal["No Gap", "Low", "Medium", "High", "Critical"]


class SkillGapReport(BaseModel):
    rows: List[GapRow]
    summary: Dict[str, int]
    overall_competency: float


# --- assessments -----------------------------------------------------
class QuestionOut(BaseModel):
    id: int
    competency_id: str
    prompt: str
    options: List[str]
    difficulty: str

    model_config = {"from_attributes": True}


class AttemptSubmit(BaseModel):
    assessment_id: int
    answers: Dict[str, int]


class AttemptResult(BaseModel):
    attempt_id: int
    correct_count: int
    total_questions: int
    score_percentage: float
    per_competency: Dict[str, Dict[str, int]]
    updated_levels: Dict[str, int]


# --- courses / recommendations --------------------------------------
class CourseOut(BaseModel):
    id: str
    code: str
    title: str
    provider: str
    description: str
    level: int
    duration_hours: int
    format: str
    rating: float
    learners: int
    competency_ids: List[str] = []
    source: str = "iGOT Integration: Prototype / Mock API"


class RecommendationOut(BaseModel):
    rank: int
    score: float
    course: CourseOut
    component_scores: Dict[str, float]
    targeted_gaps: List[GapRow] = []


class EnrollRequest(BaseModel):
    course_id: str


class ProgressUpdate(BaseModel):
    course_id: str
    progress: int = Field(ge=0, le=100)


class EnrollmentOut(BaseModel):
    course_id: str
    status: str
    progress: int
    enrolled_at: date
    completed_at: Optional[date] = None

    model_config = {"from_attributes": True}


# --- materials / MCQs ------------------------------------------------
class MaterialOut(BaseModel):
    id: int
    file_name: str
    file_type: str
    char_count: int
    chunk_count: int
    status: str
    uploaded_at: datetime

    model_config = {"from_attributes": True}


class MCQGenerateRequest(BaseModel):
    material_id: int
    count: int = Field(default=6, ge=1, le=20)
    difficulty: Literal["Easy", "Medium", "Hard"] = "Medium"
    language: str = "English"


class ValidationFlags(BaseModel):
    four_options: bool
    single_correct: bool
    has_explanation: bool
    source_linked: bool
    competency_detected: bool

    @property
    def passed(self) -> int:
        return sum(self.model_dump().values())


class MCQOut(BaseModel):
    id: int
    competency_id: Optional[str]
    question: str
    options: List[str]
    correct_index: int
    explanation: str
    source_excerpt: str
    difficulty: str
    language: str
    generator: str
    validation: ValidationFlags


class MCQUpdate(BaseModel):
    question: Optional[str] = None
    options: Optional[List[str]] = None
    correct_index: Optional[int] = Field(default=None, ge=0, le=3)
    explanation: Optional[str] = None
    competency_id: Optional[str] = None


class MCQTestSubmit(BaseModel):
    material_id: int
    answers: Dict[str, int]


# --- admin -----------------------------------------------------------
class DepartmentStats(BaseModel):
    department: str
    officials: int
    average_competency: float
    critical_gaps: int
    average_learning_hours: float
    assessment_attempts: int


class AdminOverview(BaseModel):
    total_officials: int
    average_competency: float
    critical_gaps: int
    average_learning_hours: float
    assessment_attempts: int
    level_distribution: Dict[str, int]
    emerging_skills: List[Dict[str, Any]]
    departments: List[DepartmentStats]
