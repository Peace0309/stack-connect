
import os
import tempfile
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.mcq_offline.generator import generate_mcqs
from app.mcq_offline.document_parser import extract_text
from app.mcq_offline.chunker import chunk_text
from app.mcq_offline.validator import validate_mcqs
from app.mcq_offline.evaluator import evaluate_answer

router = APIRouter(prefix="/mcqs/offline", tags=["mcqs-offline"])


class TextRequest(BaseModel):
    text: str
    num_questions: Optional[int] = 3


class EvaluateRequest(BaseModel):
    mcq: dict
    selected_option: str


@router.post("/generate-from-text")
def generate_from_text(request: TextRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="No text provided")

    mcqs = generate_mcqs(request.text, num_questions=request.num_questions)
    valid_mcqs, rejected = validate_mcqs(mcqs)

    return {
        "source": "offline_model",
        "mcqs": valid_mcqs,
        "rejected_count": len(rejected),
    }


@router.post("/generate-from-file")
async def generate_from_file(
    file: UploadFile = File(...),
    num_questions: int = Form(3),
):
    suffix = os.path.splitext(file.filename)[1]
    content = await file.read()

    # Use a real temp file instead of writing into the working directory,
    # so this never collides with anything the Gemini section is doing.
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(content)
        tmp_path = tmp.name

    try:
        text = extract_text(tmp_path)
        chunks = chunk_text(text)

        all_mcqs = []
        for chunk in chunks[:3]:  # limit chunks for response speed
            all_mcqs.extend(generate_mcqs(chunk, num_questions=num_questions))

        valid_mcqs, rejected = validate_mcqs(all_mcqs)
    finally:
        os.remove(tmp_path)

    return {
        "source": "offline_model",
        "mcqs": valid_mcqs,
        "rejected_count": len(rejected),
    }


@router.post("/evaluate")
def evaluate(request: EvaluateRequest):
    return evaluate_answer(request.mcq, request.selected_option)


@router.get("/health")
def health_check():
    return {"status": "Offline MCQ generation is running", "requires_internet": False}
