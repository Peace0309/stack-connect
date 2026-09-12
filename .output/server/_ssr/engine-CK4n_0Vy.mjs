import { o as IGOT_COURSES, r as COMPETENCIES } from "./data-CduRO4Hf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine-CK4n_0Vy.js
function classifyGap(gap) {
	if (gap <= 0) return "No Gap";
	if (gap === 1) return "Low";
	if (gap === 2) return "Medium";
	if (gap === 3) return "High";
	return "Critical";
}
var SEVERITY_COLORS = {
	"No Gap": "hsl(152 55% 40%)",
	Low: "hsl(196 60% 45%)",
	Medium: "hsl(38 92% 50%)",
	High: "hsl(20 90% 52%)",
	Critical: "hsl(0 72% 50%)"
};
function buildGapRows(levels) {
	return COMPETENCIES.map((competency) => {
		const current = levels[competency.id] ?? 0;
		const gap = Math.max(0, competency.required - current);
		return {
			competency,
			current,
			required: competency.required,
			gap,
			severity: classifyGap(gap)
		};
	});
}
var RECOMMENDATION_WEIGHTS = [
	{
		key: "skillGap",
		label: "Skill Gap",
		weight: .35
	},
	{
		key: "roleRelevance",
		label: "Role Relevance",
		weight: .25
	},
	{
		key: "learningHistory",
		label: "Learning History",
		weight: .15
	},
	{
		key: "difficultyMatch",
		label: "Difficulty Match",
		weight: .1
	},
	{
		key: "departmentPriority",
		label: "Department Priority",
		weight: .1
	},
	{
		key: "careerRelevance",
		label: "Career Relevance",
		weight: .05
	}
];
function recommendCourses(levels, completedCourseIds, enrolledCourseIds) {
	const rows = buildGapRows(levels);
	const rowById = new Map(rows.map((r) => [r.competency.id, r]));
	return IGOT_COURSES.map((course) => {
		const targetedGaps = course.competencyIds.map((id) => rowById.get(id)).filter((r) => Boolean(r));
		const maxGap = targetedGaps.reduce((m, r) => Math.max(m, r.gap), 0);
		const skillGap = Math.min(1, maxGap / 4);
		const touchedAreas = targetedGaps.filter((r) => r.current > 0).length;
		let learningHistory = targetedGaps.length ? touchedAreas / targetedGaps.length : .5;
		if (completedCourseIds.includes(course.id)) learningHistory = 0;
		if (enrolledCourseIds.includes(course.id)) learningHistory *= .6;
		const avgCurrent = targetedGaps.length ? targetedGaps.reduce((s, r) => s + r.current, 0) / targetedGaps.length : 0;
		const difficultyMatch = Math.max(0, 1 - Math.abs(course.level - (avgCurrent + 1)) / 4);
		const components = {
			skillGap,
			roleRelevance: course.roleRelevance,
			learningHistory,
			difficultyMatch,
			departmentPriority: course.departmentPriority,
			careerRelevance: course.careerRelevance
		};
		const score = RECOMMENDATION_WEIGHTS.reduce((sum, w) => sum + (components[w.key] ?? 0) * w.weight, 0);
		return {
			course,
			score: Math.round(score * 1e3) / 10,
			components,
			targetedGaps
		};
	}).sort((a, b) => b.score - a.score);
}
function overallCompetency(levels) {
	const values = COMPETENCIES.map((c) => levels[c.id] ?? 0);
	const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
	return Math.round(avg * 10) / 10;
}
//#endregion
export { recommendCourses as a, overallCompetency as i, SEVERITY_COLORS as n, buildGapRows as r, RECOMMENDATION_WEIGHTS as t };
