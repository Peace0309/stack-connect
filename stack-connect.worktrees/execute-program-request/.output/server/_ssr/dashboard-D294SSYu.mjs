import { i as __toESM } from "../_runtime.mjs";
import { o as IGOT_COURSES } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as BookOpen, a as Target, g as Clock, m as Gauge } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as KpiCard } from "./KpiCard-D154hSrq.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { a as recommendCourses, i as overallCompetency, r as buildGapRows } from "./engine-CK4n_0Vy.mjs";
import { n as GapBars, t as CompetencyRadar } from "./charts-0qb0j-Gi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D294SSYu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { levels, profile, enrollments, assessmentTaken, lastAssessment } = usePlatform();
	const rows = (0, import_react.useMemo)(() => buildGapRows(levels), [levels]);
	const critical = rows.filter((r) => r.gap >= 3).length;
	const overall = overallCompetency(levels);
	const completed = enrollments.filter((e) => e.progress >= 100);
	const recs = (0, import_react.useMemo)(() => recommendCourses(levels, completed.map((e) => e.courseId), enrollments.map((e) => e.courseId)).slice(0, 3), [
		levels,
		enrollments,
		completed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: `Namaste, ${profile.name.split(" ")[0]}`,
		subtitle: `${profile.designation} · ${profile.division}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Overall competency",
						value: `${overall} / 5`,
						hint: assessmentTaken ? "Based on latest assessment" : "Baseline profile",
						icon: Gauge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Critical / high gaps",
						value: critical,
						hint: `${rows.filter((r) => r.gap > 0).length} competencies below target`,
						icon: Target
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Active enrolments",
						value: enrollments.length,
						hint: `${completed.length} completed`,
						icon: BookOpen
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Learning hours",
						value: profile.learningHours,
						hint: "Financial year to date",
						icon: Clock
					})
				]
			}),
			!assessmentTaken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-wrap items-center justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Start the closed loop"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Take the 15-question competency assessment so the skill-gap engine can work from measured evidence instead of the baseline profile."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/assessment",
							children: "Take assessment"
						})
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-center justify-between gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Last assessment scored",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground",
							children: [
								lastAssessment?.correct,
								"/",
								lastAssessment?.total
							]
						}),
						" ",
						"on ",
						lastAssessment?.at,
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assessment",
						children: "Re-take assessment"
					})
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Competency radar"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetencyRadar, { rows }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Top skill gaps"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GapBars, {
					rows,
					limit: 8
				}) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Recommended next courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learning-path",
						children: "View full path"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-3 md:grid-cols-3",
				children: recs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: r.course.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold leading-snug",
							children: r.course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Match score ",
								r.score,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: r.score,
							className: "mt-2"
						})
					]
				}, r.course.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Course data served from the mock iGOT Karmayogi catalogue API (",
					IGOT_COURSES.length,
					" courses)."
				]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
