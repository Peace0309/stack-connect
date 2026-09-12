import { i as __toESM } from "../_runtime.mjs";
import { o as IGOT_COURSES, r as COMPETENCIES, s as competencyById } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Card, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { s as Server } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CTgEUHy0.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
import { t as Input } from "./input-qlB7OtzP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-BYsC9hyI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursesPage() {
	const { enrollments, enroll } = usePlatform();
	const [query, setQuery] = (0, import_react.useState)("");
	const [competency, setCompetency] = (0, import_react.useState)("all");
	const [format, setFormat] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => IGOT_COURSES.filter((c) => {
		const q = query.trim().toLowerCase();
		const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q);
		const matchesCompetency = competency === "all" || c.competencyIds.includes(competency);
		const matchesFormat = format === "all" || c.format === format;
		return matchesQuery && matchesCompetency && matchesFormat;
	}), [
		query,
		competency,
		format
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "iGOT Karmayogi Catalogue",
		subtitle: `${IGOT_COURSES.length} competency-mapped courses`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-md border border-accent bg-accent/10 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "Mock iGOT API."
				}), " Catalogue and enrolment calls are served by the prototype's mock iGOT Karmayogi service. In production these map to the live iGOT course and enrolment endpoints."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search title, code or provider",
						value: query,
						onChange: (e) => setQuery(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: competency,
						onValueChange: setCompetency,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Competency" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All competencies"
						}), COMPETENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: c.id,
							children: c.name
						}, c.id))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: format,
						onValueChange: setFormat,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Format" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All formats"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Self-paced",
								children: "Self-paced"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Blended",
								children: "Blended"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Instructor-led",
								children: "Instructor-led"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: filtered.map((course) => {
					const enrolled = enrollments.some((e) => e.courseId === course.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex h-full flex-col gap-3 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										course.code,
										" · ",
										course.provider
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-base font-semibold leading-snug",
									children: course.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: course.description
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: course.competencyIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: competencyById(id)?.name ?? id
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: course.format }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [course.durationHours, " h"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Level ", course.level] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["★ ", course.rating] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [course.learners.toLocaleString("en-IN"), " learners"] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto pt-1",
								children: enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: "Enrolled"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										enroll(course.id);
										toast.success(`Enrolled in ${course.title}`);
									},
									children: "Enrol via iGOT"
								})
							})
						]
					}) }, course.id);
				})
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
