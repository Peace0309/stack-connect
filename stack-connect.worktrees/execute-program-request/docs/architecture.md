# Architecture — SIH PS 101

AI-Enabled Learning Platform for India's Official Statistical System.

## 1. Closed-loop design

The platform is built around one continuous loop. Every stage writes back into
the competency profile, so recommendations change as the officer learns.

```text
   ┌──────────────────────────────────────────────────────────────┐
   │                                                              │
   ▼                                                              │
Learner Profile ─▶ Competency Assessment ─▶ AI Skill-Gap Detection │
                                                   │              │
                                                   ▼              │
                            Personalised Learning Recommendation   │
                                                   │              │
                                                   ▼              │
                       Mock iGOT Course Recommendation & Enrolment │
                                                   │              │
                                                   ▼              │
                                       Learning Progress Tracking  │
                                                   │              │
                                                   ▼              │
                    Upload Learning Material (PDF/DOCX/PPTX/TXT)   │
                                                   │              │
                                                   ▼              │
                  AI MCQ Generation + 5-point validation gate      │
                                                   │              │
                                                   ▼              │
                      In-place Assessment Review & Test            │
                                                   │              │
                                                   ▼              │
                          Competency Profile Update ───────────────┘
```

## 2. System layers

```text
┌──────────────────────────────────────────────────────────────────┐
│  Presentation — React 19 + TanStack Start + Tailwind + Recharts  │
│  Landing · Login · Dashboard · Competencies · Assessment · Gaps  │
│  Learning Path · iGOT Catalogue · MCQ Studio · Progress · Admin  │
└───────────────────────────┬──────────────────────────────────────┘
                            │  REST / JSON  (VITE_API_BASE_URL)
┌───────────────────────────▼──────────────────────────────────────┐
│  API — FastAPI (uvicorn), OpenAPI at /docs                        │
│  routers: auth users competencies assessments skill_gaps          │
│           recommendations igot materials mcqs progress admin      │
└───┬───────────────┬────────────────┬───────────────┬─────────────┘
    │               │                │               │
┌───▼──────┐ ┌──────▼───────┐ ┌──────▼────────┐ ┌────▼───────────┐
│ Skill-gap│ │ Recommender  │ │ MCQ pipeline  │ │ Mock iGOT      │
│ engine   │ │ 35/25/15/10/ │ │ parse→chunk→  │ │ service        │
│          │ │ 10/5 weights │ │ generate→     │ │ catalogue,     │
│          │ │              │ │ validate(5)   │ │ search, enrol  │
└───┬──────┘ └──────┬───────┘ └──────┬────────┘ └────┬───────────┘
    └───────────────┴────────────────┴───────────────┘
                            │  SQLAlchemy 2.0
┌───────────────────────────▼──────────────────────────────────────┐
│  PostgreSQL 14+  (database/schema.sql, database/seed.sql)         │
└──────────────────────────────────────────────────────────────────┘

External (optional): AI provider via AI gateway. If unavailable, the
deterministic offline MCQ generator takes over with no loss of workflow.
```

## 3. Component responsibilities

| Component | Module | Responsibility |
|---|---|---|
| Skill-gap engine | `backend/app/ai/skill_gap_engine.py` | `gap = required − current`, severity classification, level blending after assessments and MCQ tests |
| Recommender | `backend/app/recommendation/engine.py` | Six-factor weighted scoring, fixed weights, transparent per-component breakdown |
| Document parser | `backend/app/mcq/document_parser.py` | PyMuPDF / python-docx / python-pptx / plain text extraction |
| Chunker | `backend/app/mcq/chunker.py` | Sentence-aware overlapping chunks for prompting and retrieval |
| MCQ generator | `backend/app/mcq/mcq_generator.py` | AI generation first, deterministic offline generation as fallback |
| MCQ validator | `backend/app/mcq/mcq_validator.py` | The 5-point gate; items failing any check are flagged for review |
| Mock iGOT | `backend/app/mock_igot/service.py` | Catalogue, search, enrolment and progress with a documented live-mode seam |

## 4. Scoring model (fixed)

| Factor | Weight |
|---|---|
| Skill gap | 35% |
| Role relevance | 25% |
| Learning history | 15% |
| Difficulty match | 10% |
| Department priority | 10% |
| Career relevance | 5% |

Severity: `0 → No Gap`, `1 → Low`, `2 → Medium`, `3 → High`, `4+ → Critical`.

## 5. Security

- Password hashing with bcrypt; JWT bearer tokens with role claims.
- Role separation: `employee` and `admin`; admin analytics never exposes
  personally identifying learner rows.
- Unit-level statistical data handling follows the confidentiality principle
  reflected in the cyber-security competency content.

## 6. Explicitly out of scope

NSSTA TPAC programmes, a StatLearn AI assistant, and any standalone
quiz-player module are deliberately not part of this architecture.
