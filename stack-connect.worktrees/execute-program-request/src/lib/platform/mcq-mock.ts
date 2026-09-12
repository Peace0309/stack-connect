import type { GeneratedMCQ } from "./types";

const COMPETENCY_KEYWORDS: Record<string, string[]> = {
  sampling: ["sampling", "stratif", "cluster", "weight", "frame", "psu"],
  "survey-design": ["survey", "questionnaire", "pilot", "schedule", "respondent"],
  "data-quality": ["quality", "editing", "imputation", "non-response", "error"],
  "national-accounts": ["gdp", "national account", "sna", "supply-use", "gva"],
  "price-statistics": ["price", "cpi", "wpi", "inflation", "index"],
  econometrics: ["regression", "time series", "arima", "forecast", "seasonal"],
  python: ["python", "pandas", "numpy", "dataframe", "script"],
  "r-stats": [" r ", "rstudio", "tidyverse", "ggplot"],
  sql: ["sql", "join", "query", "database", "table"],
  "ai-ml": ["machine learning", "model", "neural", "ai", "training data", "algorithm"],
  gis: ["gis", "spatial", "geo", "map", "coordinate"],
  "big-data": ["big data", "administrative data", "scraping", "register"],
  "data-viz": ["visual", "dashboard", "chart", "graph"],
  cybersecurity: ["security", "confidential", "privacy", "encryption", "dpdp"],
  "e-governance": ["governance", "digital public", "api", "interoperab"],
  "open-data": ["open data", "metadata", "dissemination", "ndsap"],
  communication: ["communicat", "brief", "report writing", "stakeholder"],
  "project-management": ["project", "field operation", "schedule", "resource"],
  leadership: ["leadership", "team", "mentor", "collaborat"],
  "official-stats-standards": ["fundamental principles", "standard", "classification", "nqaf"],
};

export function detectCompetency(text: string): string {
  const lower = ` ${text.toLowerCase()} `;
  let best = "data-quality";
  let bestScore = 0;
  for (const [id, words] of Object.entries(COMPETENCY_KEYWORDS)) {
    const score = words.reduce(
      (s, w) => s + (lower.split(w).length - 1) * (w.length > 6 ? 2 : 1),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 320);
}

function keyTerm(sentence: string): string {
  const words = sentence
    .replace(/[^A-Za-z0-9 -]/g, " ")
    .split(" ")
    .filter((w) => w.length > 5);
  return words.sort((a, b) => b.length - a.length)[0] ?? "the concept";
}

/**
 * Deterministic offline MCQ generator. Used as an automatic fallback whenever
 * the AI generation call is unavailable, so the demo loop never breaks.
 */
export function generateMockMCQs(
  text: string,
  count: number,
  difficulty: "Easy" | "Medium" | "Hard",
  language: string,
  sourceName: string,
): GeneratedMCQ[] {
  const pool = sentences(text);
  const fallbackPool = pool.length
    ? pool
    : [
        `${sourceName} describes the standard operating procedure followed by the official statistical system for this topic, including its scope, method and quality checks.`,
        "Statistical outputs must follow documented methodology, be validated against known benchmarks, and be released with metadata describing coverage and limitations.",
        "Confidentiality of unit-level records is protected at every stage of the statistical production process, from collection through to dissemination.",
        "Quality assurance combines pre-collection design controls, in-field supervision and post-collection editing and imputation.",
      ];

  const out: GeneratedMCQ[] = [];
  for (let i = 0; i < count; i++) {
    const source = fallbackPool[i % fallbackPool.length]!;
    const term = keyTerm(source);
    const competencyId = detectCompetency(source + " " + sourceName);
    const correct = source.length > 150 ? source.slice(0, 140).trim() + "…" : source;
    out.push({
      id: `mcq-${i + 1}`,
      competencyId,
      question:
        difficulty === "Hard"
          ? `Based on the uploaded material, which statement best explains the role of "${term}"?`
          : difficulty === "Medium"
            ? `According to the uploaded material, which of the following is correct about "${term}"?`
            : `What does the uploaded material state about "${term}"?`,
      options: [
        correct,
        `${term} is only relevant after results have been published and has no bearing on the production process.`,
        `${term} is an optional administrative formality that field staff may skip during peak survey rounds.`,
        `${term} applies exclusively to private-sector datasets and not to official statistics.`,
      ],
      correctIndex: 0,
      explanation: `The uploaded material states this directly; the other options contradict standard official-statistics practice.`,
      sourceExcerpt: source,
      difficulty,
      language,
    });
  }
  return out;
}
