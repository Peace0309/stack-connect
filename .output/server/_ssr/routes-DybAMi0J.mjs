import { o as IGOT_COURSES, r as COMPETENCIES } from "./data-CduRO4Hf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Card, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Brain, a as Target, c as RefreshCw, o as Sparkles, p as GraduationCap, v as ClipboardCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DybAMi0J.js
var import_jsx_runtime = require_jsx_runtime();
var LOOP = [
	{
		icon: ClipboardCheck,
		title: "Assess",
		body: "A 15-question competency assessment mapped to 20 role competencies across statistical, technical, digital-governance and behavioural areas."
	},
	{
		icon: Brain,
		title: "Diagnose",
		body: "The skill-gap engine compares assessed levels against role-required levels and classifies each gap from Low to Critical."
	},
	{
		icon: Target,
		title: "Recommend",
		body: "A six-factor weighted model ranks iGOT Karmayogi courses by gap severity, role relevance, history, difficulty fit and priority."
	},
	{
		icon: GraduationCap,
		title: "Learn",
		body: "Enrol in recommended courses, track progress, and turn any PDF/DOCX/TXT training material into validated MCQs."
	},
	{
		icon: RefreshCw,
		title: "Assess Again",
		body: "In-place tests and course completions update the competency profile, which instantly refreshes the recommendations."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b bg-sidebar text-sidebar-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-sidebar-primary",
						children: "Smart India Hackathon · Problem Statement 101"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "AI-Enabled Learning Platform · Official Statistical System"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Capacity building, closed loop"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl",
							children: "Every official statistician gets a learning path built from their own competency data."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base text-muted-foreground",
							children: "Profile, assessment, AI skill-gap detection, personalised iGOT Karmayogi recommendations, progress tracking and AI-generated assessments from your own training material — in one continuous loop."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Enter the platform"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "View admin analytics"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-9 grid grid-cols-3 gap-4 border-t pt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Competencies mapped"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-2xl font-semibold",
									children: COMPETENCIES.length
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "iGOT courses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-2xl font-semibold",
									children: IGOT_COURSES.length
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Officials tracked"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-2xl font-semibold",
									children: "1,250"
								})] })
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: "Demo credentials"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border bg-muted/50 p-4 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: "Officer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: "employee@demo.gov.in"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: "Demo@123"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border bg-muted/50 p-4 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: "Administrator"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: "admin@demo.gov.in"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: "Admin@123"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "iGOT course data is served from a mock catalogue API for the prototype."
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold tracking-tight",
						children: "The core closed loop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "Assess → Diagnose → Recommend → Learn → Assess Again. Every step writes back into the competency profile, so the next recommendation is always based on the latest evidence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5",
						children: LOOP.map((step, i) => {
							const Icon = step.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-md bg-primary p-2 text-primary-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-semibold text-muted-foreground",
												children: ["Step ", i + 1]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 text-base font-semibold",
											children: step.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: step.body
										})
									]
								})
							}, step.title);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-5 py-8 text-xs text-muted-foreground",
					children: "Prototype built for Smart India Hackathon Problem Statement 101 · Ministry of Statistics & Programme Implementation."
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
