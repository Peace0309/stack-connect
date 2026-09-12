import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as recommendCourses, t as RECOMMENDATION_WEIGHTS } from "./engine-CK4n_0Vy.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learning-path-Dru9d4tr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LearningPathPage() {
	const { levels, enrollments, enroll } = usePlatform();
	const enrolledIds = enrollments.map((e) => e.courseId);
	const completedIds = enrollments.filter((e) => e.progress >= 100).map((e) => e.courseId);
	const recs = (0, import_react.useMemo)(() => recommendCourses(levels, completedIds, enrolledIds).slice(0, 8), [
		levels,
		completedIds,
		enrolledIds
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "Personalised Learning Path",
		subtitle: "Six-factor weighted recommendation engine, recomputed after every assessment",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Scoring model"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex flex-wrap gap-2",
			children: RECOMMENDATION_WEIGHTS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "secondary",
				children: [
					w.label,
					" · ",
					Math.round(w.weight * 100),
					"%"
				]
			}, w.key))
		})] }), recs.map((r, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"#",
									index + 1,
									" · ",
									r.course.code,
									" · ",
									r.course.provider
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-base font-semibold",
								children: r.course.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: r.course.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.course.format }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"· ",
										r.course.durationHours,
										" hours"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· Level ", r.course.level] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ★ ", r.course.rating] })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-semibold",
								children: [r.score, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "match score"
							}),
							enrolledIds.includes(r.course.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "mt-2",
								variant: "secondary",
								children: "Enrolled"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-2",
								size: "sm",
								onClick: () => {
									enroll(r.course.id);
									toast.success("Enrolled via mock iGOT API");
								},
								children: "Enrol"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: RECOMMENDATION_WEIGHTS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: w.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round((r.components[w.key] ?? 0) * 100), "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: (r.components[w.key] ?? 0) * 100,
						className: "mt-1 h-1.5"
					})] }, w.key))
				}),
				r.targetedGaps.filter((g) => g.gap > 0).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: r.targetedGaps.filter((g) => g.gap > 0).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: [
							"Closes ",
							g.competency.name,
							" gap of ",
							g.gap
						]
					}, g.competency.id))
				}) : null
			]
		}) }, r.course.id))]
	});
}
//#endregion
export { LearningPathPage as component };
