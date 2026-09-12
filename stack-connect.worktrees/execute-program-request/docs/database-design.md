# Database Design

PostgreSQL 14+. DDL in `database/schema.sql`, demo data in `database/seed.sql`.

> There is no `tpac_programmes` table and no TPAC entity anywhere in this
> design — it is out of scope for PS 101 as scoped here.

## Entity map

```text
departments ──< users >── roles
                 │
                 ├──< user_competencies >── competencies
                 │                              │
                 ├──< training_history >── courses ──< course_competencies >┘
                 │
                 ├──< assessment_attempts >── assessments ──< assessment_questions
                 │
                 ├──< recommendations >── courses
                 │
                 ├──< learning_materials >──< mcqs >── competencies
                 │
                 └──< notifications
```

## Tables

| Table | Purpose | Key columns |
|---|---|---|
| `departments` | Divisions and state directorates | `name` unique |
| `roles` | `employee`, `admin` | `code` unique |
| `users` | Officers and administrators | `email` unique, FK `department_id`, `role_id` |
| `competencies` | The 20-competency framework | text PK (`sampling`), `category` check, `required_level` 1-5, `is_emerging` |
| `user_competencies` | Current level per officer | unique `(user_id, competency_id)`, `current_level` 0-5, `source` |
| `courses` | iGOT catalogue mirror | text PK (`igot-105`), relevance weights 0-1 |
| `course_competencies` | Course ↔ competency mapping | composite PK |
| `training_history` | Enrolment and completion | unique `(user_id, course_id)`, `progress` 0-100 |
| `assessments` | Assessment definitions | `kind` = `competency` \| `material-mcq` |
| `assessment_questions` | Items | `options` JSONB with `jsonb_array_length = 4`, `correct_index` 0-3 |
| `assessment_attempts` | Submitted attempts | `score_percentage` generated column, `per_competency` JSONB |
| `recommendations` | Engine output snapshots | `score`, `rank`, `component_scores` JSONB |
| `learning_materials` | Uploaded files | `file_type` check, `char_count`, `chunk_count`, `status` |
| `mcqs` | Generated items | five `valid_*` boolean gate columns, `generator`, `edited_by_user` |
| `notifications` | In-app events | `kind` check, `is_read` |

## Design decisions

**Natural text keys for competencies and courses.** `sampling` and `igot-105`
are stable, human-readable and shared verbatim with the frontend, so no
identifier translation layer is needed.

**JSONB for options and per-competency results.** Option lists are always
exactly four entries (enforced by a `CHECK` on `jsonb_array_length`), and
scoring breakdowns are naturally sparse maps. Keeping them as JSONB avoids a
wide, mostly empty relational fan-out while remaining queryable.

**Validation as five boolean columns, not a single flag.** The prototype must
show *which* of the five checks an item failed, and administrators need to
audit generation quality per check.

**Generated `score_percentage`.** Computed and stored by PostgreSQL, so
reporting queries can never disagree with the application's arithmetic.

**Levels 0-5.** `0` means "not assessed" for `user_competencies`, while
`competencies.required_level` is always 1-5.

## Constraints and integrity

- Foreign keys cascade on delete from `users`, `courses`, `assessments` and
  `learning_materials` so removing an officer or a material leaves no orphans.
- `training_history` enforces `completed_at >= enrolled_at`.
- `assessment_attempts` enforces `correct_count <= total_questions`.
- Range checks on every 0-1 relevance weight, every 0-100 progress value and
  every 1-5 level.

## Indexes

`users(department_id)`, `users(role_id)`, `competencies(category)`,
`user_competencies(user_id)`, `course_competencies(competency_id)`,
`training_history(user_id)`, `training_history(status)`,
`assessment_questions(assessment_id)`, `assessment_attempts(user_id, submitted_at DESC)`,
`recommendations(user_id, rank)`, `learning_materials(user_id, uploaded_at DESC)`,
`mcqs(material_id)`, `mcqs(competency_id)`,
`notifications(user_id, is_read, created_at DESC)`.

These cover the platform's hot paths: a learner's dashboard, the admin
department roll-up, and MCQ retrieval for one uploaded material.
