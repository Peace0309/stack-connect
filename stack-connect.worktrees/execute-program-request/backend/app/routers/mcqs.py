"""MCQ generation, validation, review/edit and the in-place test."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.ai.skill_gap_engine import apply_mcq_results
from app.database.session import get_db
from app.mcq.mcq_generator import generate
from app.mcq.mcq_validator import validate
from app.models import MCQ, Competency, LearningMaterial, UserCompetency
from app.schemas.schemas import MCQGenerateRequest, MCQTestSubmit, MCQUpdate

router = APIRouter(prefix="/mcqs", tags=["mcqs"])


def _serialise(row: MCQ) -> dict:
    return {
        "id": row.id,
        "competency_id": row.competency_id,
        "question": row.question,
        "options": row.options,
        "correct_index": row.correct_index,
        "explanation": row.explanation,
        "source_excerpt": row.source_excerpt,
        "difficulty": row.difficulty,
        "language": row.language,
        "generator": row.generator,
        "validation": {
            "four_options": row.valid_four_options,
            "single_correct": row.valid_single_correct,
            "has_explanation": row.valid_explanation,
            "source_linked": row.valid_source_linked,
            "competency_detected": row.valid_competency,
        },
    }


@router.post("/generate")
def generate_mcqs(payload: MCQGenerateRequest, db: Session = Depends(get_db)) -> dict:
    material = db.get(LearningMaterial, payload.material_id)
    if not material:
        raise HTTPException(404, "Material not found")
    if not material.storage_path:
        raise HTTPException(422, "Parsed text unavailable; re-upload the material")

    text = open(material.storage_path, encoding="utf-8").read()
    known = [c.id for c in db.query(Competency).all()]

    items = generate(text, payload.count, payload.difficulty, payload.language, material.file_name)
    created = []
    for item in items:
        flags = validate(item, known)
        row = MCQ(
            material_id=material.id,
            competency_id=item.get("competency_id") if flags["competency_detected"] else None,
            question=item["question"],
            options=item["options"],
            correct_index=item["correct_index"],
            explanation=item["explanation"],
            source_excerpt=item["source_excerpt"],
            difficulty=item.get("difficulty", payload.difficulty),
            language=item.get("language", payload.language),
            generator=item.get("generator", "ai"),
            valid_four_options=flags["four_options"],
            valid_single_correct=flags["single_correct"],
            valid_explanation=flags["has_explanation"],
            valid_source_linked=flags["source_linked"],
            valid_competency=flags["competency_detected"],
        )
        db.add(row)
        created.append(row)

    material.status = "generated"
    db.commit()
    for row in created:
        db.refresh(row)
    return {"material_id": material.id, "items": [_serialise(row) for row in created]}


@router.get("/material/{material_id}")
def list_mcqs(material_id: int, db: Session = Depends(get_db)) -> list[dict]:
    rows = db.query(MCQ).filter(MCQ.material_id == material_id).all()
    return [_serialise(row) for row in rows]


@router.patch("/{mcq_id}")
def update_mcq(mcq_id: int, payload: MCQUpdate, db: Session = Depends(get_db)) -> dict:
    row = db.get(MCQ, mcq_id)
    if not row:
        raise HTTPException(404, "Question not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(row, field, value)
    row.edited_by_user = True

    known = [c.id for c in db.query(Competency).all()]
    flags = validate(_serialise(row), known)
    row.valid_four_options = flags["four_options"]
    row.valid_single_correct = flags["single_correct"]
    row.valid_explanation = flags["has_explanation"]
    row.valid_source_linked = flags["source_linked"]
    row.valid_competency = flags["competency_detected"]
    db.commit()
    db.refresh(row)
    return _serialise(row)


@router.post("/{user_id}/test")
def submit_test(user_id: int, payload: MCQTestSubmit, db: Session = Depends(get_db)) -> dict:
    rows = db.query(MCQ).filter(MCQ.material_id == payload.material_id).all()
    if not rows:
        raise HTTPException(404, "No questions for this material")

    per_competency: dict[str, dict[str, int]] = {}
    correct_count = 0
    for row in rows:
        key = row.competency_id or "data-quality"
        bucket = per_competency.setdefault(key, {"correct": 0, "total": 0})
        bucket["total"] += 1
        if payload.answers.get(str(row.id)) == row.correct_index:
            bucket["correct"] += 1
            correct_count += 1

    current = {
        r.competency_id: r.current_level
        for r in db.query(UserCompetency).filter(UserCompetency.user_id == user_id)
    }
    updated = apply_mcq_results(current, per_competency)
    for competency_id, level in updated.items():
        record = (
            db.query(UserCompetency)
            .filter(
                UserCompetency.user_id == user_id,
                UserCompetency.competency_id == competency_id,
            )
            .first()
        )
        if record:
            record.current_level = level
            record.source = "mcq-test"
        else:
            db.add(
                UserCompetency(
                    user_id=user_id,
                    competency_id=competency_id,
                    current_level=level,
                    source="mcq-test",
                )
            )
    db.commit()

    return {
        "correct_count": correct_count,
        "total_questions": len(rows),
        "per_competency": per_competency,
        "updated_levels": updated,
    }
