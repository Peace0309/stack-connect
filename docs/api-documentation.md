# API Documentation

Base URL: `http://localhost:8000/api`
Interactive docs: `http://localhost:8000/docs` (Swagger) · `/redoc`
Auth: `Authorization: Bearer <JWT>` on all endpoints except `/auth/login` and `/health`.

## Auth

### POST `/auth/login`
```json
{ "email": "employee@demo.gov.in", "password": "Demo@123" }
```
Response `200`:
```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {
    "id": 1, "email": "employee@demo.gov.in", "full_name": "Ananya Sharma",
    "designation": "Statistical Officer", "department": "Official Statistics Division",
    "role": "employee", "learning_hours": 42.5
  }
}
```
Errors: `401` invalid credentials, `403` inactive account.

## Users
| Method | Path | Description |
|---|---|---|
| GET | `/users` | List officers (admin view) |
| GET | `/users/{user_id}` | Single learner profile |

## Competencies
| Method | Path | Description |
|---|---|---|
| GET | `/competencies` | The 20-competency framework with required levels |
| GET | `/competencies/user/{user_id}` | Current levels for one officer |

## Assessments

### GET `/assessments/{assessment_id}/questions`
Returns items without the correct answer.

### POST `/assessments/{user_id}/submit`
```json
{ "assessment_id": 1, "answers": { "1": 0, "2": 1, "3": 1 } }
```
Response:
```json
{
  "attempt_id": 12, "correct_count": 9, "total_questions": 15,
  "score_percentage": 60.0,
  "per_competency": { "sampling": { "correct": 1, "total": 2 } },
  "updated_levels": { "sampling": 3, "python": 2 }
}
```
Scoring is computed from stored `correct_index` values — nothing is hardcoded.

## Skill gaps

### GET `/skill-gaps/{user_id}`
```json
{
  "rows": [{ "competency_id": "ai-ml", "name": "AI / Machine Learning",
             "category": "Technical", "current": 1, "required": 4,
             "gap": 3, "severity": "High" }],
  "summary": { "No Gap": 4, "Low": 6, "Medium": 5, "High": 4, "Critical": 1 },
  "overall_competency": 2.1
}
```

## Recommendations
| Method | Path | Description |
|---|---|---|
| GET | `/recommendations/weights` | The fixed 0.35/0.25/0.15/0.10/0.10/0.05 weights |
| GET | `/recommendations/{user_id}?limit=8` | Ranked courses with per-factor breakdown |

```json
[{
  "rank": 1, "score": 78.4,
  "course": { "id": "igot-105", "title": "Applied Machine Learning for Public Data" },
  "component_scores": { "skill_gap": 0.75, "role_relevance": 0.8, "learning_history": 0.5,
                        "difficulty_match": 0.5, "department_priority": 1.0, "career_relevance": 0.95 },
  "targeted_gaps": [{ "competency_id": "ai-ml", "gap": 3, "severity": "High" }]
}]
```

## iGOT (mock)
> Every response carries `"source": "iGOT Integration: Prototype / Mock API"`.

| Method | Path | Description |
|---|---|---|
| GET | `/igot/courses?query=&competency_id=&format=` | Search the catalogue |
| GET | `/igot/courses/{course_id}` | Course detail |
| POST | `/igot/enroll/{user_id}` | Idempotent enrolment — body `{ "course_id": "igot-105" }` |

## Materials
| Method | Path | Description |
|---|---|---|
| POST | `/materials/{user_id}/upload` | `multipart/form-data` file; PDF, DOCX, PPTX, TXT, MD |
| GET | `/materials/{user_id}` | Upload history |

Errors: `400` unsupported type, `422` unparseable document.

## MCQs

### POST `/mcqs/generate`
```json
{ "material_id": 7, "count": 6, "difficulty": "Medium", "language": "English" }
```
Each returned item includes the 5-point validation block:
```json
{
  "id": 41, "competency_id": "sampling", "question": "…",
  "options": ["…","…","…","…"], "correct_index": 0,
  "explanation": "…", "source_excerpt": "…", "generator": "ai",
  "validation": { "four_options": true, "single_correct": true,
                  "has_explanation": true, "source_linked": true,
                  "competency_detected": true }
}
```

| Method | Path | Description |
|---|---|---|
| GET | `/mcqs/material/{material_id}` | List generated items |
| PATCH | `/mcqs/{mcq_id}` | Edit question, options, correct answer or competency; revalidates |
| POST | `/mcqs/{user_id}/test` | Submit answers; updates competency levels |

## Progress
| Method | Path | Description |
|---|---|---|
| GET | `/progress/{user_id}` | Enrolments with status and percentage |
| PUT | `/progress/{user_id}` | `{ "course_id": "igot-107", "progress": 100 }` — completion raises the covered competencies and logs hours |

## Admin

### GET `/admin/overview?department=`
Workforce KPIs, competency-level distribution, emerging-skill demand vs
capability, and per-department statistics.

## System
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness plus the active `igot_mode` |

## Error format
```json
{ "detail": "Human-readable message" }
```
`400` validation · `401` unauthenticated · `403` forbidden · `404` missing ·
`422` unprocessable input · `500` unexpected failure.
