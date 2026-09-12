from __future__ import annotations

import os

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
for origin in os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001,http://localhost:8080,http://localhost:8081,http://localhost:8082",
).split(",")
        if origin.strip()
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?",
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


@app.on_event("startup")
def on_startup() -> None:
    # Schema is owned by database/schema.sql; create_all is a dev convenience.
    if os.getenv("APP_ENV", "development") == "development":
        Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["system"])
def health() -> dict:
    return {"status": "ok", "service": "ps101-api", "igot_mode": os.getenv("IGOT_MODE", "mock")}
