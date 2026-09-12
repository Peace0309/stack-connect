from __future__ import annotations

import re
from typing import List

SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+")


def sentences(text: str) -> List[str]:
    return [s.strip() for s in SENTENCE_SPLIT.split(text) if len(s.strip()) > 30]


def chunk(text: str, max_chars: int = 1200, overlap: int = 150) -> List[str]:
    """Greedy sentence packing with a character overlap between chunks."""
    chunks: List[str] = []
    current = ""
    for sentence in sentences(text):
        if len(current) + len(sentence) + 1 <= max_chars:
            current = f"{current} {sentence}".strip()
        else:
            if current:
                chunks.append(current)
            tail = current[-overlap:] if overlap and current else ""
            current = f"{tail} {sentence}".strip()
    if current:
        chunks.append(current)
    return chunks
