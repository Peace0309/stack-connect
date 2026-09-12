import os
import random
import re

# Force fully offline / LAN-safe operation — no calls out to Hugging Face
# Hub or any other external service, ever.
os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["TRANSFORMERS_OFFLINE"] = "1"

import spacy
from transformers import T5Tokenizer, T5ForConditionalGeneration
from sentence_transformers import SentenceTransformer, util


MODEL_PATH = os.path.join(os.path.dirname(__file__), "qg_model_final")


# ---------------------------------------------------------------------
# LOAD MODELS (loaded once at import time, reused across requests)
# ---------------------------------------------------------------------
nlp = spacy.load("en_core_web_sm")
sim_model = SentenceTransformer("all-MiniLM-L6-v2")
qg_tokenizer = T5Tokenizer.from_pretrained(MODEL_PATH)
qg_model = T5ForConditionalGeneration.from_pretrained(MODEL_PATH)


# ---------------------------------------------------------------------
# Competency tagging — replace this keyword map with your real
# competency list from database/seed.sql when you have it in front of you.
# ---------------------------------------------------------------------
COMPETENCY_KEYWORDS = {
    "Survey Methodology": ["survey", "sample", "sampling", "stratification", "frame"],
    "National Accounts / Economic Statistics": ["gdp", "national accounts", "economic output", "inflation", "cpi", "index"],
    "Labour & Price Statistics": ["labour", "price statistics", "wage", "employment"],
    "Digital Governance & Tools": ["python", "r", "gis", "spatial", "igot", "platform", "ai"],
}


def detect_competency(text):
    text_lower = text.lower()
    for competency, keywords in COMPETENCY_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            return competency
    return None


def clean_candidate(text):
    text = text.strip()
    text = " ".join(text.split())
    if text.count("(") > text.count(")"):
        text = text.split("(")[0].strip()
    return text


def is_junk_candidate(text):
    if re.fullmatch(r"\d+\.?", text.strip()):
        return True
    if text.strip().lower() in {"it", "which", "that", "this", "who", "what", "the purpose", "purchase", "index", "time"}:
        return True
    if len(text.strip()) <= 2:
        return True
    return False


def extract_candidate_answers(text, max_answers=10):
    doc = nlp(text)
    candidates = []

    for ent in doc.ents:
        candidate = clean_candidate(ent.text)
        if len(candidate) > 1:
            candidates.append(candidate)

    for chunk in doc.noun_chunks:
        candidate = clean_candidate(chunk.text)
        if len(candidate) > 1 and len(candidate.split()) <= 5:
            candidates.append(candidate)

    unique_candidates = []
    seen = set()
    for candidate in candidates:
        key = candidate.lower()
        if key not in seen:
            seen.add(key)
            unique_candidates.append(candidate)

    unique_candidates = [c for c in unique_candidates if not is_junk_candidate(c)]

    stop_candidates = {
        "tools", "tool", "data", "information", "things", "people",
        "officials", "methods", "method", "platform", "training",
        "statistics", "accuracy", "ans", "faqs",
    }
    unique_candidates = [c for c in unique_candidates if c.lower() not in stop_candidates]

    filtered_candidates = []
    for candidate in unique_candidates:
        is_subpart = False
        for other in unique_candidates:
            if candidate.lower() == other.lower():
                continue
            if candidate.lower() in other.lower() and len(other.split()) > len(candidate.split()):
                is_subpart = True
                break
        if not is_subpart:
            filtered_candidates.append(candidate)

    random.shuffle(filtered_candidates)
    return filtered_candidates[:max_answers]


def generate_question(context, answer):
    input_text = f"generate question: context: {context} answer: {answer}"
    input_ids = qg_tokenizer(
        input_text, return_tensors="pt", truncation=True, max_length=384
    ).input_ids
    output_ids = qg_model.generate(input_ids, max_length=32, num_beams=4)
    return qg_tokenizer.decode(output_ids[0], skip_special_tokens=True)


def generate_distractors(correct_answer, all_candidates, question_text, n=3):
    pool = [
        c for c in all_candidates
        if c.lower() != correct_answer.lower() and c.lower() not in question_text.lower()
    ]

    if len(pool) < n:
        return pool

    correct_emb = sim_model.encode(correct_answer, convert_to_tensor=True)
    pool_embs = sim_model.encode(pool, convert_to_tensor=True)
    scores = util.cos_sim(correct_emb, pool_embs)[0]
    top_indices = scores.argsort(descending=True)[:n]
    return [pool[i] for i in top_indices]


def get_explanation(text, answer):
    sentences = text.replace("\n", " ").split(". ")
    for sentence in sentences:
        if answer.lower() in sentence.lower():
            return sentence.strip() + "."
    return text.strip()[:150] + "..."


def generate_mcqs(text, num_questions=3):
    """
    Fully offline MCQ generation — runs entirely on the local trained model
    and local NLP libraries. No network calls, safe on a LAN with no
    internet access.
    """
    candidates = extract_candidate_answers(text, max_answers=num_questions + 8)
    mcqs = []

    for answer in candidates[:num_questions]:
        print("ANSWER CANDIDATE:", answer)
        question = generate_question(text, answer)
        print("GENERATED QUESTION:", question)
        distractors = generate_distractors(answer, candidates, question, n=3)
        options = distractors + [answer]
        random.shuffle(options)
        explanation = get_explanation(text, answer)

        mcqs.append({
            "question": question,
            "options": options,
            "correct_answer": answer,
            "explanation": explanation,
            "source_excerpt": explanation,
            "competency": detect_competency(text),
            "source": "offline_model",
        })

    return mcqs
