from __future__ import annotations

import json
import os
import re
from typing import Any, Dict, List

import httpx

from app.mcq.chunker import chunk, sentences

COMPETENCY_KEYWORDS: Dict[str, List[str]] = {
    "sampling": ["sample", "stratif", "cluster", "weight", "psu"],
    "survey-design": ["questionnaire", "survey design", "pilot", "instrument"],
    "national-accounts": ["gdp", "national account", "sna", "supply-use"],
    "price-statistics": ["cpi", "wpi", "price index", "inflation"],
    "data-quality": ["quality", "editing", "imputation", "non-sampling"],
    "econometrics": ["regression", "time series", "forecast", "seasonal"],
    "official-stats-standards": ["fundamental principles", "nqaf", "classification"],
    "python": ["python", "pandas", "numpy"],
    "r-stats": [" r ", "rmarkdown", "tidyverse"],
    "sql": ["sql", "join", "query", "database"],
    "ai-ml": ["machine learning", "model", "training data", "neural"],
    "gis": ["gis", "spatial", "geo-cod", "map"],
    "big-data": ["big data", "administrative data", "web scrap"],
    "data-viz": ["dashboard", "chart", "visualis", "visualiz"],
    "cybersecurity": ["security", "dpdp", "confidential", "encrypt"],
    "e-governance": ["e-governance", "digital public infrastructure", "api"],
    "open-data": ["open data", "ndsap", "metadata", "dissemination"],
    "communication": ["communicat", "briefing", "policy maker"],
    "project-management": ["project", "field supervision", "schedule"],
    "leadership": ["leadership", "team", "mentor"],
}

DEFAULT_COMPETENCY = "data-quality"


def detect_competency(text: str) -> str:
    lowered = f" {text.lower()} "
    best, best_hits = DEFAULT_COMPETENCY, 0
    for competency_id, keywords in COMPETENCY_KEYWORDS.items():
        hits = sum(lowered.count(keyword) for keyword in keywords)
        if hits > best_hits:
            best, best_hits = competency_id, hits
    return best


# --- deterministic offline generator ---------------------------------
def generate_offline(
    text: str, count: int, difficulty: str, language: str, source_name: str
) -> List[Dict[str, Any]]:
    pool = sentences(text) or [
        f"{source_name} describes standard practice in official statistics."
    ]
    items: List[Dict[str, Any]] = []
    for index in range(count):
        excerpt = pool[index % len(pool)]
        competency_id = detect_competency(excerpt)
        keyword = _key_term(excerpt)
        correct = keyword
        distractors = [f"Not {keyword}", f"The opposite of {keyword}", "None of the above"]
        options = [correct, *distractors]
        items.append(
            {
                "competency_id": competency_id,
                "question": (
                    f"According to the uploaded material, which term correctly completes "
                    f"this statement? \u201c{excerpt[:180]}\u2026\u201d"
                ),
                "options": options,
                "correct_index": 0,
                "explanation": (
                    f"The source passage states this directly: \u201c{excerpt[:160]}\u201d"
                ),
                "source_excerpt": excerpt[:400],
                "difficulty": difficulty,
                "language": language,
                "generator": "deterministic",
            }
        )
    return items


def _key_term(sentence: str) -> str:
    words = [w for w in re.findall(r"[A-Za-z-]{5,}", sentence)]
    return words[0] if words else "the stated principle"


# --- AI generator ----------------------------------------------------
PROMPT = (
    "You generate multiple-choice questions for Indian government statistical "
    "officers. Return STRICT JSON: {{\"items\":[{{\"competency_id\":str,"
    "\"question\":str,\"options\":[4 strings],\"correct_index\":int,"
    "\"explanation\":str,\"source_excerpt\":str}}]}}. Exactly 4 options, one "
    "unambiguously correct, explanation grounded in the excerpt. Language: {language}. "
    "Difficulty: {difficulty}. Produce {count} questions.\n\nMATERIAL:\n{material}"
)


def generate_ai(
    text: str, count: int, difficulty: str, language: str, source_name: str
) -> List[Dict[str, Any]]:
    api_key = os.getenv("LOVABLE_API_KEY")
    if not api_key or os.getenv("AI_PROVIDER", "lovable") == "offline":
        raise RuntimeError("AI provider not configured")

    material = "\n\n".join(chunk(text)[:4])
    response = httpx.post(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        headers={"Authorization": f"Bearer {api_key}"},
        json={
            "model": os.getenv("AI_MODEL", "google/gemini-3.8-flash"),
            "messages": [
                {
                    "role": "user",
                    "content": PROMPT.format(
                        language=language,
                        difficulty=difficulty,
                        count=count,
                        material=material[:12000],
                    ),
                }
            ],
        },
        timeout=90,
    )
    response.raise_for_status()
    content = response.json()["choices"][0]["message"]["content"]
    payload = json.loads(re.sub(r"^```(json)?|```$", "", content.strip(), flags=re.M))
    items = payload.get("items", [])
    for item in items:
        item.setdefault("difficulty", difficulty)
        item.setdefault("language", language)
        item["generator"] = "ai"
        if not item.get("competency_id"):
            item["competency_id"] = detect_competency(item.get("source_excerpt", ""))
    return items


def generate(
    text: str, count: int, difficulty: str, language: str, source_name: str
) -> List[Dict[str, Any]]:
    try:
        items = generate_ai(text, count, difficulty, language, source_name)
        if items:
            return items
    except Exception:  # noqa: BLE001 — any AI failure falls back offline
        pass
    return generate_offline(text, count, difficulty, language, source_name)
