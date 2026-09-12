import { COMPETENCIES, IGOT_COURSES } from "./data";
import type { Course, GapRow, GapSeverity } from "./types";

export function classifyGap(gap: number): GapSeverity {
  if (gap <= 0) return "No Gap";
  if (gap === 1) return "Low";
  if (gap === 2) return "Medium";
  if (gap === 3) return "High";
  return "Critical";
}

export const SEVERITY_COLORS: Record<GapSeverity, string> = {
  "No Gap": "hsl(152 55% 40%)",
  Low: "hsl(196 60% 45%)",
  Medium: "hsl(38 92% 50%)",
  High: "hsl(20 90% 52%)",
  Critical: "hsl(0 72% 50%)",
};

export function buildGapRows(levels: Record<string, number>): GapRow[] {
  return COMPETENCIES.map((competency) => {
    const current = levels[competency.id] ?? 0;
    const gap = Math.max(0, competency.required - current);
    return {
      competency,
      current,
      required: competency.required,
      gap,
      severity: classifyGap(gap),
    };
  });
}

export const RECOMMENDATION_WEIGHTS = [
  { key: "skillGap", label: "Skill Gap", weight: 0.35 },
  { key: "roleRelevance", label: "Role Relevance", weight: 0.25 },
  { key: "learningHistory", label: "Learning History", weight: 0.15 },
  { key: "difficultyMatch", label: "Difficulty Match", weight: 0.1 },
  { key: "departmentPriority", label: "Department Priority", weight: 0.1 },
  { key: "careerRelevance", label: "Career Relevance", weight: 0.05 },
] as const;

export interface ScoredCourse {
  course: Course;
  score: number;
  components: Record<string, number>;
  targetedGaps: GapRow[];
}

export function recommendCourses(
  levels: Record<string, number>,
  completedCourseIds: string[],
  enrolledCourseIds: string[],
): ScoredCourse[] {
  const rows = buildGapRows(levels);
  const rowById = new Map(rows.map((r) => [r.competency.id, r]));

  const scored = IGOT_COURSES.map<ScoredCourse>((course) => {
    const targetedGaps = course.competencyIds
      .map((id) => rowById.get(id))
      .filter((r): r is GapRow => Boolean(r));

    const maxGap = targetedGaps.reduce((m, r) => Math.max(m, r.gap), 0);
    const skillGap = Math.min(1, maxGap / 4);

    // Learning history: courses that build on already-started areas score higher,
    // and already-completed courses are pushed down.
    const touchedAreas = targetedGaps.filter((r) => r.current > 0).length;
    let learningHistory = targetedGaps.length
      ? touchedAreas / targetedGaps.length
      : 0.5;
    if (completedCourseIds.includes(course.id)) learningHistory = 0;
    if (enrolledCourseIds.includes(course.id)) learningHistory *= 0.6;

    const avgCurrent = targetedGaps.length
      ? targetedGaps.reduce((s, r) => s + r.current, 0) / targetedGaps.length
      : 0;
    const difficultyMatch = Math.max(
      0,
      1 - Math.abs(course.level - (avgCurrent + 1)) / 4,
    );

    const components: Record<string, number> = {
      skillGap,
      roleRelevance: course.roleRelevance,
      learningHistory,
      difficultyMatch,
      departmentPriority: course.departmentPriority,
      careerRelevance: course.careerRelevance,
    };

    const score = RECOMMENDATION_WEIGHTS.reduce(
      (sum, w) => sum + (components[w.key] ?? 0) * w.weight,
      0,
    );

    return { course, score: Math.round(score * 1000) / 10, components, targetedGaps };
  });

  return scored.sort((a, b) => b.score - a.score);
}

/** Score an assessment and translate percentage-correct into a 1-5 level. */
export function scoreToLevel(correct: number, total: number): number {
  if (total === 0) return 1;
  const pct = correct / total;
  if (pct >= 0.9) return 5;
  if (pct >= 0.75) return 4;
  if (pct >= 0.55) return 3;
  if (pct >= 0.35) return 2;
  return 1;
}

export function overallCompetency(levels: Record<string, number>): number {
  const values = COMPETENCIES.map((c) => levels[c.id] ?? 0);
  const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
  return Math.round(avg * 10) / 10;
}
