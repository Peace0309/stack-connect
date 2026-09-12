# AI-Enabled Learning Platform for India's Official Statistical System

**Smart India Hackathon — Problem Statement 101 (PS 101)**
Ministry of Statistics and Programme Implementation (MoSPI)

A closed-loop capacity-building platform: every statistical officer is
assessed, diagnosed, given a personalised learning path from the iGOT
Karmayogi catalogue, tracked through completion, and re-assessed on their own
training material — with the competency profile updating at every step.

---

## 1. Problem statement

Officers across the National Statistical System need continuously updated
skills in survey methodology, modern data science, digital governance and
managerial practice. Training today is generic, disconnected from measured
capability, and offers no feedback loop between what an officer learns and
what they are recommended next.

**This platform closes that loop:**

```text
Learner Profile → Competency Assessment → AI Skill-Gap Detection →
Personalised Learning Recommendation → Mock iGOT Course Recommendation →
Learning Progress → Upload Learning Material (PDF/DOCX/PPTX/TXT) →
AI MCQ Generation + 5-point Validation → In-place Assessment Review & Test →
Competency Profile Update → Updated Recommendations ↺
```

**Deliberately out of scope:** NSSTA TPAC programmes, a StatLearn AI
assistant, and any standalone quiz-player module.

---

## 2. Architecture

```text
┌────────────────────────────────────────────────────────────────┐
│ Frontend — React 19 · TanStack Start · Tailwind · Recharts     │
│ Landing · Login · Dashboard · Competencies · Assessment        │
│ Skill Gaps · Learning Path · iGOT Catalogue · MCQ Studio       │
│ Progress · Admin Workforce Analytics                           │
└──────────────────────────┬─────────────────────────────────────┘
                           │ REST / JSON
┌──────────────────────────▼─────────────────────────────────────┐
│ Backend — FastAPI (uvicorn) · OpenAPI at /docs                  │
│ auth · users · competencies · assessments · skill_gaps ·        │
│ recommendations · igot · materials · mcqs · progress · admin    │
└──┬──────────────┬───────────────┬──────────────┬───────────────┘
   │              │               │              │
┌──▼─────────┐ ┌──▼──────────┐ ┌──▼───────────┐ ┌▼──────────────┐
│ Skill-gap  │ │ Recommender │ │ MCQ pipeline │ │ Mock iGOT     │
│ engine     │ │ 35/25/15/   │ │ parse→chunk→ │ │ catalogue,    │
│ req−current│ │ 10/10/5     │ │ gen→validate │ │ search, enrol │
└──┬─────────┘ └──┬──────────┘ └──┬───────────┘ └┬──────────────┘
   └──────────────┴───────────────┴──────────────┘
                           │ SQLAlchemy 2.0
┌──────────────────────────▼─────────────────────────────────────┐
│ PostgreSQL 14+  ·  database/schema.sql + database/seed.sql      │
└────────────────────────────────────────────────────────────────┘
        Optional: AI gateway → offline deterministic fallback
```

Details: [`docs/architecture.md`](docs/architecture.md) ·
[`docs/api-documentation.md`](docs/api-documentation.md) ·
[`docs/database-design.md`](docs/database-design.md)

---

## 3. Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TanStack Start/Router, TypeScript, Vite, Tailwind CSS, Recharts, Lucide |
| Backend | Python 3.11+, FastAPI, Pydantic v2, uvicorn, SQLAlchemy 2.0 |
| Database | PostgreSQL 14+ (psycopg2) |
| Documents | PyMuPDF (PDF), python-docx, python-pptx |
| ML / AI | scikit-learn, pandas, numpy, sentence-transformers, FAISS; AI gateway for MCQ generation |
| Auth | JWT (python-jose) + bcrypt (passlib) |

---

## 4. Folder tree

```text
.
├── README.md
├── .env.example
├── database/
│   ├── schema.sql              # full PostgreSQL DDL (no TPAC tables)
│   └── seed.sql                # 20 competencies, 16 courses, users, 15 questions
├── docs/
│   ├── architecture.md
│   ├── api-documentation.md
│   └── database-design.md
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # FastAPI app, CORS, routers, /docs
│       ├── database/session.py # engine, SessionLocal, get_db
│       ├── models/models.py    # SQLAlchemy ORM
│       ├── schemas/schemas.py  # Pydantic request/response models
│       ├── routers/            # auth users competencies assessments
│       │                       # skill_gaps recommendations igot materials
│       │                       # mcqs progress admin
│       ├── ai/skill_gap_engine.py
│       ├── recommendation/engine.py    # 35/25/15/10/10/5
│       ├── mcq/
│       │   ├── document_parser.py
│       │   ├── chunker.py
│       │   ├── mcq_generator.py        # AI + deterministic fallback
│       │   └── mcq_validator.py        # 5-point gate
│       └── mock_igot/service.py
└── src/                        # React frontend
    ├── routes/                 # index login dashboard profile competencies
    │                           # assessment gaps learning-path courses mcq
    │                           # progress admin
    ├── components/platform/    # AppShell, KpiCard, charts
    └── lib/platform/           # types, data, engine, store, mcq-mock
```

---

## 5. Local setup

### 5.1 Prerequisites
Node.js 20+, Python 3.11+, PostgreSQL 14+.

### 5.2 Environment
```bash
cp .env.example .env
# edit .env: DATABASE_URL, JWT_SECRET, and optionally LOVABLE_API_KEY
```

### 5.3 PostgreSQL
```bash
createdb ps101
psql -d ps101 -f database/schema.sql
psql -d ps101 -f database/seed.sql

# verify
psql -d ps101 -c "SELECT COUNT(*) FROM competencies;"   -- 20
psql -d ps101 -c "SELECT COUNT(*) FROM courses;"        -- 16
```

### 5.4 Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
API: http://localhost:8000 · Swagger: http://localhost:8000/docs · Health: `/health`

### 5.5 Frontend (React + Vite)
```bash
npm install
npm run dev
```
App: http://localhost:8080

---

## 6. Demo credentials

| Role | Email | Password | Lands on |
|---|---|---|---|
| Employee — Ananya Sharma, Statistical Officer | `employee@demo.gov.in` | `Demo@123` | `/dashboard` |
| Administrator — R. Venkatesan, DDG (Capacity Building) | `admin@demo.gov.in` | `Admin@123` | `/admin` |

Suggested demo walkthrough: sign in as the employee → take the 15-question
assessment → view skill gaps → open the learning path → enrol from the iGOT
catalogue → mark a course complete → upload a PDF in the MCQ studio →
review and edit the generated questions → take the in-place test → return to
the dashboard and watch the recommendations change.

---

## 7. Mock iGOT Karmayogi integration

Everything iGOT-related in this prototype is labelled
**"iGOT Integration: Prototype / Mock API"** in the UI and in every API
response.

- Catalogue, search, enrolment and progress are served by
  `backend/app/mock_igot/service.py` from the seeded `courses` table.
- The function signatures in that module are the integration contract: set
  `IGOT_MODE=live` and `IGOT_BASE_URL` / `IGOT_API_KEY` in `.env`, then swap
  the SQL bodies for the real iGOT REST calls. Nothing else in the platform
  changes.
- Course metadata (`department_priority`, `career_relevance`,
  `role_relevance`) is representative demo data, not official MoSPI ratings.

---

## 8. AI and offline fallback mode

MCQ generation tries the AI provider first and falls back automatically:

1. **AI mode** — the parsed document is chunked and sent to the configured
   model, which returns strict JSON items.
2. **Offline deterministic mode** — used whenever no API key is set,
   `AI_PROVIDER=offline`, the network is unavailable, credits are exhausted,
   or the model returns malformed JSON. Questions are built directly from
   extracted sentences with keyword-based competency detection.

Both paths produce identical structures and pass through the same **five-point
validation gate**:

1. exactly four options
2. one unambiguous correct answer
3. an explanation is present
4. the item is linked to a source excerpt
5. a competency was detected in the framework

The demo therefore runs end to end with **no API key, no network and no
credits** — a hackathon-safe guarantee.

---

## 9. Scoring reference

**Skill gap** = `required_level − current_level`, floored at 0 →
`0 No Gap · 1 Low · 2 Medium · 3 High · 4+ Critical`.

**Recommendation score** (identical in `backend/app/recommendation/engine.py`
and `src/lib/platform/engine.ts`):

| Factor | Weight |
|---|---|
| Skill gap | 35% |
| Role relevance | 25% |
| Learning history | 15% |
| Difficulty match | 10% |
| Department priority | 10% |
| Career relevance | 5% |

---

## 10. Licence

Prepared for Smart India Hackathon evaluation. All course, workforce and
officer data is synthetic demo data.
