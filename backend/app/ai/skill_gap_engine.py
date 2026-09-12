from __future__ import annotations

from typing import Any, Dict, Iterable, List, Mapping

SEVERITY_ORDER = ["No Gap", "Low", "Medium", "High", "Critical"]


def classify(gap: int) -> str:
    if gap <= 0:
        return "No Gap"
    if gap == 1:
        return "Low"
    if gap == 2:
        return "Medium"
    if gap == 3:
        return "High"
    return "Critical"


def build_gap_rows(
    competencies: Iterable[Mapping[str, Any]],
    levels: Mapping[str, int],
) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for competency in competencies:
        current = int(levels.get(competency["id"], 0))
        required = int(competency["required_level"])
        gap = max(0, required - current)
        rows.append(
            {
                "competency_id": competency["id"],
                "name": competency["name"],
                "category": competency["category"],
                "current": current,
                "required": required,
                "gap": gap,
                "severity": classify(gap),
            }
        )
    return rows


def score_to_level(correct: int, total: int) -> int:
    """Translate percentage correct into a 1-5 proficiency level."""
    if total <= 0:
        return 1
    pct = correct / total
    if pct >= 0.90:
        return 5
    if pct >= 0.75:
        return 4
    if pct >= 0.55:
        return 3
    if pct >= 0.35:
        return 2
    return 1


def apply_assessment(
    levels: Mapping[str, int],
    per_competency: Mapping[str, Mapping[str, int]],
) -> Dict[str, int]:
    """Blend prior level with the freshly assessed level (closed loop step 1)."""
    updated = dict(levels)
    for competency_id, result in per_competency.items():
        total = int(result.get("total", 0))
        correct = int(result.get("correct", 0))
        assessed = score_to_level(correct, total)
        prior = int(updated.get(competency_id, 1))
        updated[competency_id] = max(1, round((prior + assessed) / 2))
    return updated


def apply_mcq_results(
    levels: Mapping[str, int],
    per_competency: Mapping[str, Mapping[str, int]],
) -> Dict[str, int]:
    """Update levels after an in-place material-generated MCQ test."""
    updated = dict(levels)
    for competency_id, result in per_competency.items():
        total = int(result.get("total", 0))
        correct = int(result.get("correct", 0))
        pct = (correct / total) if total else 0.0
        prior = int(updated.get(competency_id, 1))
        if pct >= 0.70:
            new_level = prior + 1
        elif pct >= 0.40:
            new_level = prior
        else:
            new_level = prior - 1
        updated[competency_id] = max(1, min(5, new_level))
    return updated


def overall_competency(levels: Mapping[str, int], competency_ids: Iterable[str]) -> float:
    ids = list(competency_ids)
    if not ids:
        return 0.0
    return round(sum(int(levels.get(cid, 0)) for cid in ids) / len(ids), 1)


def severity_summary(rows: Iterable[Mapping[str, Any]]) -> Dict[str, int]:
    summary = {name: 0 for name in SEVERITY_ORDER}
    for row in rows:
        summary[row["severity"]] += 1
    return summary
