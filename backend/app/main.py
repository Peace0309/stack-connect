from __future__ import annotations

import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import Base, engine
from app.routers import (
    admin,
    assessments,
    auth,
    competencies,
    igot,
    materials,
    mcqs,
    mcq_offline,
    progress,
    recommendations,
    skill_gaps,
    users,
    chatbot,
)

app = FastAPI(
    title="StatConnect — AI-Enabled Learning Platform API",
    description=(
        "Closed-loop capacity building for India's official statistical system: "
        "profile → assessment → skill-gap detection → recommendation → learning → "
        "material upload → MCQ generation → in-place test → competency update."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:8080,http://localhost:5173,http://localhost:3000",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=(
        r"http://(localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}"
        r"|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?"
    ),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api"

app.include_router(auth.router, prefix=API_PREFIX)
app.include_router(users.router, prefix=API_PREFIX)
app.include_router(competencies.router, prefix=API_PREFIX)
app.include_router(assessments.router, prefix=API_PREFIX)
app.include_router(skill_gaps.router, prefix=API_PREFIX)
app.include_router(recommendations.router, prefix=API_PREFIX)
app.include_router(igot.router, prefix=API_PREFIX)
app.include_router(materials.router, prefix=API_PREFIX)
app.include_router(mcqs.router, prefix=API_PREFIX)
app.include_router(mcq_offline.router, prefix=API_PREFIX)
app.include_router(progress.router, prefix=API_PREFIX)
app.include_router(admin.router, prefix=API_PREFIX)
app.include_router(chatbot.router, prefix=API_PREFIX)


@app.on_event("startup")
def on_startup() -> None:
    print("API started. Database initialization skipped.")


@app.get("/health", tags=["system"])
def health() -> dict:
    return {
        "status": "ok",
        "service": "ps101-api",
        "igot_mode": os.getenv("IGOT_MODE", "mock"),
    }