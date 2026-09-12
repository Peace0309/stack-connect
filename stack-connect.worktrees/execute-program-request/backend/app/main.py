"""SIH PS 101 — AI-Enabled Learning Platform for India's Official Statistical System.

FastAPI application entry point. Interactive API docs at /docs (Swagger) and
/redoc. Out of scope by design: NSSTA TPAC programmes, a StatLearn AI
assistant, and any standalone quiz-player module.
"""

from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import Base, engine
from app.routers import (
    admin,
    assessment,
    auth,
    competency,
    igot,
    material,
    mcqs,
    progress,
    recommendations,
    skill_gaps,
    users,
)

app = FastAPI(
    title="PS 101 — AI-Enabled Learning Platform API",
    description=(
        "Closed-loop capacity building for India's official statistical system: "
        "profile → assessment → skill-gap detection → recommendation → learning → "
        "material upload → MCQ generation → in-place test → competency update."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:8080").split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api"
app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(users.router, prefix=API_PREFIX)
app.include_router(competency.router, prefix=API_PREFIX)
app.include_router(assessment.router, prefix=API_PREFIX)
app.include_router(skill_gaps.router, prefix=API_PREFIX)
app.include_router(recommendations.router, prefix=API_PREFIX)
app.include_router(igot.router, prefix=API_PREFIX)
app.include_router(material.router, prefix=API_PREFIX)
app.include_router(mcqs.router, prefix=API_PREFIX)
app.include_router(progress.router, prefix=API_PREFIX)
app.include_router(admin.router, prefix=API_PREFIX)


@app.on_event("startup")
def on_startup() -> None:
    # Schema is owned by database/schema.sql; create_all is a dev convenience.
    if os.getenv("APP_ENV", "development") == "development":
        Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["system"])
def health() -> dict:
    return {"status": "ok", "service": "ps101-api", "igot_mode": os.getenv("IGOT_MODE", "mock")}
