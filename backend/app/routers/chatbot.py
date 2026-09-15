from __future__ import annotations

import os
import time
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

router = APIRouter(
    prefix="/chatbot",
    tags=["chatbot"],
)


# ============================================================
# SYSTEM PROMPT
# ============================================================

SYSTEM_PROMPT = """
You are the StatConnect AI Learning Assistant.

StatConnect is an AI-enabled learning platform designed to help
users identify competency gaps and improve their skills through
personalized learning.

You can help users with:

1. Assessment
2. Skill Gaps
3. Personalized Learning Path
4. iGOT Courses
5. MCQ / Quiz Generation
6. Learning Progress
7. Dashboard
8. General questions about the StatConnect platform

Rules:
- Keep answers clear and concise.
- Use simple language.
- Give practical guidance when the user asks how to use a feature.
- Do not invent user-specific scores, competency values, courses,
  or database records.
- If something is mock/demo data, clearly say so.
- Stay related to learning, training, competencies, and StatConnect.
- Do not claim that an action was completed unless the backend
  actually completed it.
"""


# ============================================================
# OFFLINE FALLBACK RESPONSES
# ============================================================

OFFLINE_RESPONSES = {
    "assessment": (
        "The Assessment module measures your current competency level. "
        "Open Assessment, answer the questions, and submit the test. "
        "Your results can then be used to identify competency gaps."
    ),

    "skill_gap": (
        "A skill gap is the difference between the competency level "
        "required for a role and your current competency level."
    ),

    "course": (
        "The Learning Path and iGOT Catalogue can be used to explore "
        "recommended training courses. In this prototype, some course "
        "data may be mock/demo data."
    ),

    "mcq": (
        "Open the MCQ Generator, upload your learning material, and "
        "generate multiple-choice questions from the content."
    ),

    "progress": (
        "The Progress section shows learning activity, completed "
        "training, assessment performance, and competency progress."
    ),

    "dashboard": (
        "The Dashboard provides an overview of your competencies, "
        "learning progress, skill gaps, and recommended training."
    ),
}


# ============================================================
# REQUEST / RESPONSE MODELS
# ============================================================

class ChatMessage(BaseModel):
    role: str
    content: str = Field(..., max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: List[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    source: str


# ============================================================
# OFFLINE RESPONSE
# ============================================================

def get_offline_response(message: str) -> str:
    text = message.lower().strip()

    # Assessment
    if any(word in text for word in [
        "assessment",
        "assess",
        "test",
        "exam",
    ]):
        return OFFLINE_RESPONSES["assessment"]

    # Skill gap
    if any(phrase in text for phrase in [
        "skill gap",
        "skill gaps",
        "competency gap",
        "competency gaps",
        "gap",
    ]):
        return OFFLINE_RESPONSES["skill_gap"]

    # Courses / training / iGOT
    if any(word in text for word in [
        "course",
        "courses",
        "training",
        "igot",
        "learning path",
    ]):
        return OFFLINE_RESPONSES["course"]

    # MCQ / quiz
    if any(word in text for word in [
        "mcq",
        "quiz",
        "question",
        "questions",
    ]):
        return OFFLINE_RESPONSES["mcq"]

    # Progress
    if any(word in text for word in [
        "progress",
        "completed",
        "completion",
        "performance",
    ]):
        return OFFLINE_RESPONSES["progress"]

    # Dashboard
    if "dashboard" in text:
        return OFFLINE_RESPONSES["dashboard"]

    return (
        "I can help you with Assessment, Skill Gaps, Courses, "
        "Learning Path, MCQ Generation, Progress, and Dashboard."
    )


# ============================================================
# GEMINI CLIENT
# ============================================================

def get_gemini_client() -> Optional[genai.Client]:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if not api_key:
        return None

    return genai.Client(api_key=api_key)


# ============================================================
# BUILD CONVERSATION
# ============================================================

def build_prompt(
    message: str,
    history: List[ChatMessage],
) -> str:

    conversation = []

    for item in history[-10:]:
        role = item.role.lower().strip()
        content = item.content.strip()

        if not content:
            continue

        if role == "user":
            conversation.append(
                f"User: {content}"
            )

        elif role == "assistant":
            conversation.append(
                f"Assistant: {content}"
            )

    conversation.append(
        f"User: {message.strip()}"
    )

    return (
        SYSTEM_PROMPT.strip()
        + "\n\n"
        + "Conversation:\n"
        + "\n".join(conversation)
        + "\n\nAssistant:"
    )


# ============================================================
# GEMINI REQUEST
# ============================================================

def ask_gemini(
    message: str,
    history: List[ChatMessage],
) -> Optional[str]:

    client = get_gemini_client()

    if client is None:
        return None

    primary_model = os.getenv(
        "AI_MODEL",
        "gemini-3.8-flash",
    ).strip()

    # Ordered fallback models.
    models = []

    for model_name in [
        primary_model,
        "gemini-3.7-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash",
    ]:
        if model_name not in models:
            models.append(model_name)

    prompt = build_prompt(
        message,
        history,
    )

    last_error = None

    for model_name in models:

        # Two attempts for temporary availability errors.
        for attempt in range(2):

            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_PROMPT,
                    ),
                )

                text = getattr(response, "text", None)

                if isinstance(text, str):
                    text = text.strip()

                if text:
                    return text

                last_error = (
                    f"Empty response from model {model_name}"
                )

            except Exception as exc:
                last_error = exc
                error_text = str(exc).upper()

                # Temporary service availability / rate-limit errors.
                temporary_error = any(
                    marker in error_text
                    for marker in [
                        "503",
                        "UNAVAILABLE",
                        "RESOURCE_EXHAUSTED",
                        "429",
                        "DEADLINE",
                        "TIMEOUT",
                    ]
                )

                if temporary_error:

                    # Small backoff before retry.
                    time.sleep(2 if attempt == 0 else 4)
                    continue

                # Permanent/auth/configuration error:
                # don't repeatedly retry the same model.
                break

    # Log only the error type/message.
    print(
        f"[Gemini] All models failed. Last error: {last_error}"
    )

    return None


# ============================================================
# CHAT ENDPOINT
# ============================================================

@router.post(
    "/message",
    response_model=ChatResponse,
)
def send_message(request: ChatRequest):

    message = request.message.strip()

    if not message:
        return ChatResponse(
            reply="Please enter a message.",
            source="validation",
        )

    ai_reply = ask_gemini(
        message,
        request.history,
    )

    # Gemini successful
    if ai_reply:
        return ChatResponse(
            reply=ai_reply,
            source="gemini",
        )

    # Gemini unavailable -> offline fallback
    offline_reply = get_offline_response(
        message
    )

    return ChatResponse(
        reply=offline_reply,
        source="offline",
    )


# ============================================================
# CHATBOT HEALTH
# ============================================================

@router.get("/health")
def chatbot_health():

    api_key_configured = bool(
        os.getenv("GEMINI_API_KEY", "").strip()
    )

    return {
        "status": "ok",
        "provider": os.getenv(
            "AI_PROVIDER",
            "gemini",
        ),
        "api_key_configured": api_key_configured,
        "model": os.getenv(
            "AI_MODEL",
            "gemini-3.8-flash",
        ),
        "fallback_available": True,
    }