from __future__ import annotations

from typing import Any, Dict, Iterable, List, Tuple

CHECKS = (
    "four_options",
    "single_correct",
    "has_explanation",
    "source_linked",
    "competency_detected",
)


def validate(item: Dict[str, Any], known_competency_ids: Iterable[str]) -> Dict[str, bool]:
    options: List[str] = item.get("options") or []
    correct_index = item.get("correct_index", -1)
    stripped = [str(option).strip() for option in options]

    return {
        "four_options": len(options) == 4,
        "single_correct": (
            isinstance(correct_index, int)
            and 0 <= correct_index < len(options)
            and len(set(stripped)) == len(stripped)
        ),
        "has_explanation": len(str(item.get("explanation", "")).strip()) > 10,
        "source_linked": len(str(item.get("source_excerpt", "")).strip()) > 20,
        "competency_detected": item.get("competency_id") in set(known_competency_ids),
    }


def passed_count(flags: Dict[str, bool]) -> int:
    return sum(1 for check in CHECKS if flags.get(check))


def partition(
    items: Iterable[Dict[str, Any]], known_competency_ids: Iterable[str]
) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """Return (accepted, rejected); accepted items pass all five checks."""
    known = list(known_competency_ids)
    accepted, rejected = [], []
    for item in items:
        flags = validate(item, known)
        enriched = {**item, "validation": flags, "validation_score": passed_count(flags)}
        (accepted if enriched["validation_score"] == 5 else rejected).append(enriched)
    return accepted, rejected
