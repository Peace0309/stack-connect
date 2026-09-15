from __future__ import annotations

import os
import tempfile
from typing import Optional

from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from pydantic import BaseModel

from app.mcq_offline.document_parser import extract_text
from app.mcq_offline.chunker import chunk_text
from app.mcq_offline.validator import validate_mcqs
from app.mcq_offline.evaluator import evaluate_answer


router = APIRouter(
    prefix="/mcqs/offline",
    tags=["mcqs-offline"],
)


class TextRequest(BaseModel):
    text: str
    num_questions: Optional[int] = 3


class EvaluateRequest(BaseModel):
    mcq: dict
    selected_option: str


def _get_generator():
    """
    Lazy import:
    the heavy NLP/transformer models are loaded only when
    offline MCQ generation is actually requested.
    """
    from app.mcq_offline.generator import generate_mcqs

    return generate_mcqs


@router.post("/generate-from-text")
def generate_from_text(request: TextRequest):

    if not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text provided",
        )

    if request.num_questions is None:
        request.num_questions = 3

    if not 1 <= request.num_questions <= 20:
        raise HTTPException(
            status_code=400,
            detail="num_questions must be between 1 and 20",
        )

    try:
        generate_mcqs = _get_generator()

        mcqs = generate_mcqs(
            request.text,
            num_questions=request.num_questions,
        )

        valid_mcqs, rejected = validate_mcqs(mcqs)

        return {
            "source": "offline_model",
            "mcqs": valid_mcqs,
            "rejected_count": len(rejected),
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Offline MCQ generation failed: {exc}",
        ) from exc


@router.post("/generate-from-file")
async def generate_from_file(
    file: UploadFile = File(...),
    num_questions: int = Form(3),
):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Filename is missing",
        )

    if not 1 <= num_questions <= 20:
        raise HTTPException(
            status_code=400,
            detail="num_questions must be between 1 and 20",
        )

    suffix = os.path.splitext(file.filename)[1]
    content = await file.read()

    with tempfile.NamedTemporaryFile(
        suffix=suffix,
        delete=False,
    ) as tmp:
        tmp.write(content)
        tmp_path = tmp.name

    try:
        text = extract_text(tmp_path)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="No readable text found in the uploaded file",
            )

        chunks = chunk_text(text)

        generate_mcqs = _get_generator()

        all_mcqs = []

        for chunk in chunks[:3]:
            all_mcqs.extend(
                generate_mcqs(
                    chunk,
                    num_questions=num_questions,
                )
            )

        valid_mcqs, rejected = validate_mcqs(
            all_mcqs
        )

        return {
            "source": "offline_model",
            "mcqs": valid_mcqs,
            "rejected_count": len(rejected),
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Offline MCQ generation failed: {exc}",
        ) from exc

    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass


@router.post("/evaluate")
def evaluate(request: EvaluateRequest):
    return evaluate_answer(
        request.mcq,
        request.selected_option,
    )


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "offline-mcq",
        "requires_internet": False,
        "model_loaded": False,
        "note": (
            "The offline model is loaded lazily only when "
            "MCQ generation is requested."
        ),
    }