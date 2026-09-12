from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, Iterable, List

WEIGHTS: Dict[str, float] = {
    "skill_gap": 0.35,
    "role_relevance": 0.25,
    "learning_history": 0.15,
    "difficulty_match": 0.10,
    "department_priority": 0.10,
    "career_relevance": 0.05,
}

assert abs(sum(WEIGHTS.values()) - 1.0) < 1e-9, "recommendation weights must sum to 1"


@dataclass
class ScoredCourse:
    course: Dict[str, Any]
    score: float
    components: Dict[str, float] = field(default_factory=dict)
    targeted_gaps: List[Dict[str, Any]] = field(default_factory=list)


def _clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def recommend(
    gap_rows: Iterable[Dict[str, Any]],
    courses: Iterable[Dict[str, Any]],
    completed_course_ids: Iterable[str] = (),
    enrolled_course_ids: Iterable[str] = (),
    limit: int | None = None,
) -> List[ScoredCourse]:
    """Rank courses for one officer.

    gap_rows: [{competency_id, current, required, gap, severity}, ...]
    courses:  catalogue rows with competency_ids and relevance metadata
    """
    rows = {row["competency_id"]: row for row in gap_rows}
    completed = set(completed_course_ids)
    enrolled = set(enrolled_course_ids)

    results: List[ScoredCourse] = []
    for course in courses:
        targeted = [rows[cid] for cid in course["competency_ids"] if cid in rows]

        max_gap = max((row["gap"] for row in targeted), default=0)
        skill_gap = _clamp(max_gap / 4.0)

        touched = sum(1 for row in targeted if row["current"] > 0)
        learning_history = (touched / len(targeted)) if targeted else 0.5
        if course["id"] in completed:
            learning_history = 0.0
        elif course["id"] in enrolled:
            learning_history *= 0.6

        avg_current = (
            sum(row["current"] for row in targeted) / len(targeted) if targeted else 0.0
        )
        difficulty_match = _clamp(1 - abs(course["level"] - (avg_current + 1)) / 4.0)

        components = {
            "skill_gap": skill_gap,
            "role_relevance": float(course["role_relevance"]),
            "learning_history": learning_history,
            "difficulty_match": difficulty_match,
            "department_priority": float(course["department_priority"]),
            "career_relevance": float(course["career_relevance"]),
        }

        score = sum(components[key] * weight for key, weight in WEIGHTS.items())
        results.append(
            ScoredCourse(
                course=course,
                score=round(score * 100, 1),
                components=components,
                targeted_gaps=[row for row in targeted if row["gap"] > 0],
            )
        )

    results.sort(key=lambda item: item.score, reverse=True)
    return results[:limit] if limit else results
