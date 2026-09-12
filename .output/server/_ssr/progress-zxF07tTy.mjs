import { i as __toESM } from "../_runtime.mjs";
import { o as IGOT_COURSES } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, o as cn, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as KpiCard } from "./KpiCard-D154hSrq.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-zxF07tTy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function ProgressPage() {
	const { enrollments, setProgress, addLearningHours, profile, history } = usePlatform();
	const completed = enrollments.filter((e) => e.progress >= 100);
	const avg = enrollments.length ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "Learning Progress",
		subtitle: "Completing a course raises the competency levels it covers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Enrolments",
						value: enrollments.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Completed",
						value: completed.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Average progress",
						value: `${avg}%`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "My courses"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [enrollments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No enrolments yet — enrol from the learning path or catalogue."
				}) : null, enrollments.map((e) => {
					const course = IGOT_COURSES.find((c) => c.id === e.courseId);
					if (!course) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: course.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: course.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Enrolled ",
												e.enrolledAt,
												" · ",
												course.durationHours,
												" hours"
											]
										})
									]
								}), e.progress >= 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: "Completed"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										setProgress(course.id, 100);
										addLearningHours(course.durationHours);
										toast.success("Course completed — competency profile updated.");
									},
									children: "Mark complete"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: e.progress,
								className: "mt-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [e.progress],
									max: 100,
									step: 5,
									onValueChange: (v) => setProgress(course.id, v[0] ?? 0),
									className: "flex-1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-12 text-right text-xs text-muted-foreground",
									children: [e.progress, "%"]
								})]
							})
						]
					}, e.courseId);
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-base",
				children: [
					"Closed-loop activity (",
					profile.learningHours,
					" learning hours)"
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: history.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-l-2 border-accent pl-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: h.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							h.at,
							" · ",
							h.detail
						]
					})]
				}, h.id))
			})] })
		]
	});
}
//#endregion
export { ProgressPage as component };
