from __future__ import annotations

import re
from typing import List

SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+")
DOT_LEADER = re.compile(r"\.{3,}")   # TOC leader dots jaise "Getting started.........."
WORD = re.compile(r"[A-Za-z]{2,}")


def _looks_like_real_sentence(text: str) -> bool:
    if DOT_LEADER.search(text):
        return False
    words = WORD.findall(text)
    if len(words) < 6:
        return False
    alpha_chars = [c for c in text if c.isalpha()]
    if alpha_chars:
        upper_ratio = sum(c.isupper() for c in alpha_chars) / len(alpha_chars)
        if upper_ratio > 0.6:
            return False
    return True


def sentences(text: str) -> List[str]:
    candidates = [s.strip() for s in SENTENCE_SPLIT.split(text) if len(s.strip()) > 30]
    return [s for s in candidates if _looks_like_real_sentence(s)]

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
