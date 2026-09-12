-- =====================================================================
-- SIH PS 101 — AI-Enabled Learning Platform for India's Official
-- Statistical System
-- PostgreSQL 14+ schema
--
-- NOTE: This schema deliberately contains NO tpac_programmes table and no
-- NSSTA TPAC entities. They are out of scope for this solution.
-- =====================================================================

BEGIN;

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS mcqs CASCADE;
DROP TABLE IF EXISTS learning_materials CASCADE;
DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS assessment_attempts CASCADE;
DROP TABLE IF EXISTS assessment_questions CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS training_history CASCADE;
DROP TABLE IF EXISTS course_competencies CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS user_competencies CASCADE;
DROP TABLE IF EXISTS competencies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS departments CASCADE;

-- ---------------------------------------------------------------------
-- Organisation
-- ---------------------------------------------------------------------
CREATE TABLE departments (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(160) NOT NULL UNIQUE,
    ministry        VARCHAR(160) NOT NULL DEFAULT 'Ministry of Statistics and Programme Implementation',
    state           VARCHAR(80),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE roles (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(40) NOT NULL UNIQUE,       -- employee | admin
    name            VARCHAR(80) NOT NULL,
    description     TEXT
);

CREATE TABLE users (
    id                  SERIAL PRIMARY KEY,
    email               VARCHAR(160) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,
    full_name           VARCHAR(160) NOT NULL,
    designation         VARCHAR(160) NOT NULL,
    grade               VARCHAR(60),
    division            VARCHAR(160),
    location            VARCHAR(120),
    department_id       INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    role_id             INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    learning_hours      NUMERIC(7,1) NOT NULL DEFAULT 0 CHECK (learning_hours >= 0),
    joined_on           DATE NOT NULL DEFAULT CURRENT_DATE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_users_department ON users(department_id);
CREATE INDEX idx_users_role ON users(role_id);

-- ---------------------------------------------------------------------
-- Competency framework
-- ---------------------------------------------------------------------
CREATE TABLE competencies (
    id              VARCHAR(60) PRIMARY KEY,           -- e.g. 'sampling'
    name            VARCHAR(160) NOT NULL,
    category        VARCHAR(40) NOT NULL
                     CHECK (category IN ('Statistical','Technical','Digital Governance','Behavioural & Managerial')),
    description     TEXT NOT NULL,
    required_level  SMALLINT NOT NULL CHECK (required_level BETWEEN 1 AND 5),
    is_emerging     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_competencies_category ON competencies(category);

CREATE TABLE user_competencies (
    id              BIGSERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    competency_id   VARCHAR(60) NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    current_level   SMALLINT NOT NULL DEFAULT 0 CHECK (current_level BETWEEN 0 AND 5),
    source          VARCHAR(30) NOT NULL DEFAULT 'assessment'
                     CHECK (source IN ('baseline','assessment','course','mcq-test','manual')),
    assessed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, competency_id)
);
CREATE INDEX idx_user_competencies_user ON user_competencies(user_id);

-- ---------------------------------------------------------------------
-- Course catalogue (mirrors the mock iGOT Karmayogi service)
-- ---------------------------------------------------------------------
CREATE TABLE courses (
    id                      VARCHAR(40) PRIMARY KEY,   -- e.g. 'igot-101'
    code                    VARCHAR(60) NOT NULL UNIQUE,
    title                   VARCHAR(220) NOT NULL,
    provider                VARCHAR(160) NOT NULL,
    description             TEXT NOT NULL,
    level                   SMALLINT NOT NULL CHECK (level BETWEEN 1 AND 5),
    duration_hours          SMALLINT NOT NULL CHECK (duration_hours > 0),
    format                  VARCHAR(20) NOT NULL CHECK (format IN ('Self-paced','Blended','Instructor-led')),
    rating                  NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
    learners                INTEGER NOT NULL DEFAULT 0,
    department_priority     NUMERIC(3,2) NOT NULL CHECK (department_priority BETWEEN 0 AND 1),
    career_relevance        NUMERIC(3,2) NOT NULL CHECK (career_relevance BETWEEN 0 AND 1),
    role_relevance          NUMERIC(3,2) NOT NULL CHECK (role_relevance BETWEEN 0 AND 1),
    source_system           VARCHAR(40) NOT NULL DEFAULT 'mock-igot',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE course_competencies (
    course_id       VARCHAR(40) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    competency_id   VARCHAR(60) NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    weight          NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (weight BETWEEN 0 AND 1),
    PRIMARY KEY (course_id, competency_id)
);
CREATE INDEX idx_course_competencies_competency ON course_competencies(competency_id);

-- ---------------------------------------------------------------------
-- Enrolment / training history
-- ---------------------------------------------------------------------
CREATE TABLE training_history (
    id              BIGSERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       VARCHAR(40) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status          VARCHAR(20) NOT NULL DEFAULT 'enrolled'
                     CHECK (status IN ('enrolled','in-progress','completed','dropped')),
    progress        SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    hours_logged    NUMERIC(6,1) NOT NULL DEFAULT 0,
    enrolled_at     DATE NOT NULL DEFAULT CURRENT_DATE,
    completed_at    DATE,
    UNIQUE (user_id, course_id),
    CHECK (completed_at IS NULL OR completed_at >= enrolled_at)
);
CREATE INDEX idx_training_history_user ON training_history(user_id);
CREATE INDEX idx_training_history_status ON training_history(status);

-- ---------------------------------------------------------------------
-- Assessments
-- ---------------------------------------------------------------------
CREATE TABLE assessments (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    kind            VARCHAR(30) NOT NULL DEFAULT 'competency'
                     CHECK (kind IN ('competency','material-mcq')),
    pass_percentage SMALLINT NOT NULL DEFAULT 60 CHECK (pass_percentage BETWEEN 0 AND 100),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assessment_questions (
    id              BIGSERIAL PRIMARY KEY,
    assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    competency_id   VARCHAR(60) NOT NULL REFERENCES competencies(id) ON DELETE RESTRICT,
    prompt          TEXT NOT NULL,
    options         JSONB NOT NULL,
    correct_index   SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
    explanation     TEXT NOT NULL,
    difficulty      VARCHAR(10) NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy','Medium','Hard')),
    position        SMALLINT NOT NULL DEFAULT 1,
    CHECK (jsonb_array_length(options) = 4)
);
CREATE INDEX idx_assessment_questions_assessment ON assessment_questions(assessment_id);
CREATE INDEX idx_assessment_questions_competency ON assessment_questions(competency_id);

CREATE TABLE assessment_attempts (
    id                  BIGSERIAL PRIMARY KEY,
    assessment_id       INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    correct_count       SMALLINT NOT NULL CHECK (correct_count >= 0),
    total_questions     SMALLINT NOT NULL CHECK (total_questions > 0),
    score_percentage    NUMERIC(5,2) GENERATED ALWAYS AS
                          (ROUND(correct_count * 100.0 / NULLIF(total_questions, 0), 2)) STORED,
    per_competency      JSONB NOT NULL DEFAULT '{}'::jsonb,
    answers             JSONB NOT NULL DEFAULT '{}'::jsonb,
    submitted_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (correct_count <= total_questions)
);
CREATE INDEX idx_attempts_user ON assessment_attempts(user_id, submitted_at DESC);

-- ---------------------------------------------------------------------
-- Recommendations produced by the weighted engine
-- ---------------------------------------------------------------------
CREATE TABLE recommendations (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           VARCHAR(40) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    score               NUMERIC(5,2) NOT NULL CHECK (score BETWEEN 0 AND 100),
    rank                SMALLINT NOT NULL CHECK (rank > 0),
    component_scores    JSONB NOT NULL,   -- {skill_gap, role_relevance, learning_history, ...}
    targeted_gaps       JSONB NOT NULL DEFAULT '[]'::jsonb,
    generated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, course_id, generated_at)
);
CREATE INDEX idx_recommendations_user ON recommendations(user_id, rank);

-- ---------------------------------------------------------------------
-- Uploaded learning material and generated MCQs
-- ---------------------------------------------------------------------
CREATE TABLE learning_materials (
    id              BIGSERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name       VARCHAR(255) NOT NULL,
    file_type       VARCHAR(10) NOT NULL CHECK (file_type IN ('pdf','docx','pptx','txt','md')),
    file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes > 0),
    storage_path    TEXT,
    char_count      INTEGER NOT NULL DEFAULT 0,
    chunk_count     INTEGER NOT NULL DEFAULT 0,
    language        VARCHAR(30) NOT NULL DEFAULT 'English',
    status          VARCHAR(20) NOT NULL DEFAULT 'parsed'
                     CHECK (status IN ('uploaded','parsed','generated','failed')),
    uploaded_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_materials_user ON learning_materials(user_id, uploaded_at DESC);

CREATE TABLE mcqs (
    id                      BIGSERIAL PRIMARY KEY,
    material_id             BIGINT NOT NULL REFERENCES learning_materials(id) ON DELETE CASCADE,
    competency_id           VARCHAR(60) REFERENCES competencies(id) ON DELETE SET NULL,
    question                TEXT NOT NULL,
    options                 JSONB NOT NULL,
    correct_index           SMALLINT NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
    explanation             TEXT NOT NULL,
    source_excerpt          TEXT NOT NULL,
    difficulty              VARCHAR(10) NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy','Medium','Hard')),
    language                VARCHAR(30) NOT NULL DEFAULT 'English',
    generator               VARCHAR(20) NOT NULL DEFAULT 'ai' CHECK (generator IN ('ai','deterministic')),
    -- 5-point validation gate
    valid_four_options      BOOLEAN NOT NULL DEFAULT FALSE,
    valid_single_correct    BOOLEAN NOT NULL DEFAULT FALSE,
    valid_explanation       BOOLEAN NOT NULL DEFAULT FALSE,
    valid_source_linked     BOOLEAN NOT NULL DEFAULT FALSE,
    valid_competency        BOOLEAN NOT NULL DEFAULT FALSE,
    edited_by_user          BOOLEAN NOT NULL DEFAULT FALSE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK (jsonb_array_length(options) = 4)
);
CREATE INDEX idx_mcqs_material ON mcqs(material_id);
CREATE INDEX idx_mcqs_competency ON mcqs(competency_id);

-- ---------------------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------------------
CREATE TABLE notifications (
    id              BIGSERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kind            VARCHAR(30) NOT NULL
                     CHECK (kind IN ('assessment','enrollment','progress','material','mcq-test','system')),
    title           VARCHAR(200) NOT NULL,
    body            TEXT,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

COMMIT;
