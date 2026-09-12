from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base


class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160), unique=True, nullable=False)
    ministry: Mapped[str] = mapped_column(String(160), default="Ministry of Statistics and Programme Implementation")
    state: Mapped[str | None] = mapped_column(String(80))
    users: Mapped[list["User"]] = relationship(back_populates="department")


class Role(Base):
    __tablename__ = "roles"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str] = mapped_column(String(40), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(160), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(160), nullable=False)
    designation: Mapped[str] = mapped_column(String(160), nullable=False)
    grade: Mapped[str | None] = mapped_column(String(60))
    division: Mapped[str | None] = mapped_column(String(160))
    location: Mapped[str | None] = mapped_column(String(120))
    department_id: Mapped[int | None] = mapped_column(ForeignKey("departments.id"))
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)
    learning_hours: Mapped[float] = mapped_column(Numeric(7, 1), default=0)
    joined_on: Mapped[date] = mapped_column(Date, server_default=func.current_date())
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    department: Mapped[Department | None] = relationship(back_populates="users")
    role: Mapped[Role] = relationship()
    competencies: Mapped[list["UserCompetency"]] = relationship(back_populates="user")
    training: Mapped[list["TrainingHistory"]] = relationship(back_populates="user")


class Competency(Base):
    __tablename__ = "competencies"
    id: Mapped[str] = mapped_column(String(60), primary_key=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    category: Mapped[str] = mapped_column(String(40), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    required_level: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    is_emerging: Mapped[bool] = mapped_column(Boolean, default=False)


class UserCompetency(Base):
    __tablename__ = "user_competencies"
    __table_args__ = (UniqueConstraint("user_id", "competency_id"),)
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    competency_id: Mapped[str] = mapped_column(ForeignKey("competencies.id", ondelete="CASCADE"))
    current_level: Mapped[int] = mapped_column(SmallInteger, default=0)
    source: Mapped[str] = mapped_column(String(30), default="assessment")
    assessed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user: Mapped[User] = relationship(back_populates="competencies")
    competency: Mapped[Competency] = relationship()


class Course(Base):
    __tablename__ = "courses"
    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    code: Mapped[str] = mapped_column(String(60), unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    provider: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    level: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    duration_hours: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    format: Mapped[str] = mapped_column(String(20), nullable=False)
    rating: Mapped[float] = mapped_column(Numeric(2, 1), default=0)
    learners: Mapped[int] = mapped_column(Integer, default=0)
    department_priority: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)
    career_relevance: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)
    role_relevance: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False)
    source_system: Mapped[str] = mapped_column(String(40), default="mock-igot")

    competencies: Mapped[list["CourseCompetency"]] = relationship(back_populates="course")


class CourseCompetency(Base):
    __tablename__ = "course_competencies"
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id", ondelete="CASCADE"), primary_key=True)
    competency_id: Mapped[str] = mapped_column(ForeignKey("competencies.id", ondelete="CASCADE"), primary_key=True)
    weight: Mapped[float] = mapped_column(Numeric(3, 2), default=1.0)

    course: Mapped[Course] = relationship(back_populates="competencies")


class TrainingHistory(Base):
    __tablename__ = "training_history"
    __table_args__ = (UniqueConstraint("user_id", "course_id"),)
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id", ondelete="CASCADE"))
    status: Mapped[str] = mapped_column(String(20), default="enrolled")
    progress: Mapped[int] = mapped_column(SmallInteger, default=0)
    hours_logged: Mapped[float] = mapped_column(Numeric(6, 1), default=0)
    enrolled_at: Mapped[date] = mapped_column(Date, server_default=func.current_date())
    completed_at: Mapped[date | None] = mapped_column(Date)

    user: Mapped[User] = relationship(back_populates="training")
    course: Mapped[Course] = relationship()


class Assessment(Base):
    __tablename__ = "assessments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    kind: Mapped[str] = mapped_column(String(30), default="competency")
    pass_percentage: Mapped[int] = mapped_column(SmallInteger, default=60)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    questions: Mapped[list["AssessmentQuestion"]] = relationship(back_populates="assessment")


class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id", ondelete="CASCADE"))
    competency_id: Mapped[str] = mapped_column(ForeignKey("competencies.id"))
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[list] = mapped_column(JSONB, nullable=False)
    correct_index: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False)
    difficulty: Mapped[str] = mapped_column(String(10), default="Medium")
    position: Mapped[int] = mapped_column(SmallInteger, default=1)

    assessment: Mapped[Assessment] = relationship(back_populates="questions")


class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id", ondelete="CASCADE"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    correct_count: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    total_questions: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    per_competency: Mapped[dict] = mapped_column(JSONB, default=dict)
    answers: Mapped[dict] = mapped_column(JSONB, default=dict)
    submitted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Recommendation(Base):
    __tablename__ = "recommendations"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id", ondelete="CASCADE"))
    score: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    rank: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    component_scores: Mapped[dict] = mapped_column(JSONB, nullable=False)
    targeted_gaps: Mapped[list] = mapped_column(JSONB, default=list)
    generated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class LearningMaterial(Base):
    __tablename__ = "learning_materials"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    file_type: Mapped[str] = mapped_column(String(10), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    storage_path: Mapped[str | None] = mapped_column(Text)
    char_count: Mapped[int] = mapped_column(Integer, default=0)
    chunk_count: Mapped[int] = mapped_column(Integer, default=0)
    language: Mapped[str] = mapped_column(String(30), default="English")
    status: Mapped[str] = mapped_column(String(20), default="parsed")
    uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    mcqs: Mapped[list["MCQ"]] = relationship(back_populates="material")


class MCQ(Base):
    __tablename__ = "mcqs"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    material_id: Mapped[int] = mapped_column(ForeignKey("learning_materials.id", ondelete="CASCADE"))
    competency_id: Mapped[str | None] = mapped_column(ForeignKey("competencies.id"))
    question: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[list] = mapped_column(JSONB, nullable=False)
    correct_index: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False)
    source_excerpt: Mapped[str] = mapped_column(Text, nullable=False)
    difficulty: Mapped[str] = mapped_column(String(10), default="Medium")
    language: Mapped[str] = mapped_column(String(30), default="English")
    generator: Mapped[str] = mapped_column(String(20), default="ai")
    valid_four_options: Mapped[bool] = mapped_column(Boolean, default=False)
    valid_single_correct: Mapped[bool] = mapped_column(Boolean, default=False)
    valid_explanation: Mapped[bool] = mapped_column(Boolean, default=False)
    valid_source_linked: Mapped[bool] = mapped_column(Boolean, default=False)
    valid_competency: Mapped[bool] = mapped_column(Boolean, default=False)
    edited_by_user: Mapped[bool] = mapped_column(Boolean, default=False)

    material: Mapped[LearningMaterial] = relationship(back_populates="mcqs")


class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    kind: Mapped[str] = mapped_column(String(30), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    body: Mapped[str | None] = mapped_column(Text)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
