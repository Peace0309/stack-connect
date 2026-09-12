
from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.mcq.chunker import chunk
from app.mcq.document_parser import SUPPORTED, normalise, parse
from app.models import LearningMaterial
from app.schemas.schemas import MaterialOut

router = APIRouter(prefix="/materials", tags=["materials"])


@router.post("/{user_id}/upload", response_model=MaterialOut)
async def upload(user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in SUPPORTED:
        raise HTTPException(400, f"Unsupported file type. Allowed: {sorted(SUPPORTED)}")

    content = await file.read()
    try:
        text = normalise(parse(content, file.filename or "upload"))
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(422, f"Could not parse the document: {exc}") from exc

    material = LearningMaterial(
        user_id=user_id,
        file_name=file.filename or "upload",
        file_type=suffix.lstrip("."),
        file_size_bytes=len(content),
        char_count=len(text),
        chunk_count=len(chunk(text)),
        status="parsed",
    )
    db.add(material)
    db.commit()
    db.refresh(material)
    return material


@router.get("/{user_id}", response_model=list[MaterialOut])
def list_materials(user_id: int, db: Session = Depends(get_db)):
    return (
        db.query(LearningMaterial)
        .filter(LearningMaterial.user_id == user_id)
        .order_by(LearningMaterial.uploaded_at.desc())
        .all()
    )
