import { i as __toESM } from "../_runtime.mjs";
import { s as competencyById, t as ASSESSMENT_QUESTIONS } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, o as cn, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as CircleCheck, y as CircleX } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assessment-BU06U2y7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssessmentPage() {
	const { applyAssessment } = usePlatform();
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const answered = Object.keys(answers).length;
	const total = ASSESSMENT_QUESTIONS.length;
	const submit = () => {
		if (answered < total) {
			toast.error(`Answer all ${total} questions before submitting.`);
			return;
		}
		const perCompetency = {};
		let correct = 0;
		for (const q of ASSESSMENT_QUESTIONS) {
			const bucket = perCompetency[q.competencyId] ??= {
				correct: 0,
				total: 0
			};
			bucket.total += 1;
			if (answers[q.id] === q.correctIndex) {
				bucket.correct += 1;
				correct += 1;
			}
		}
		applyAssessment(perCompetency, correct, total);
		setResult({
			correct,
			total
		});
		setSubmitted(true);
		toast.success("Assessment scored — competency profile updated.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "Competency Assessment",
		subtitle: `${total} questions · scored programmatically against the competency framework`,
		children: [
			submitted && result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-wrap items-center justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-lg font-semibold",
						children: [
							"Score: ",
							result.correct,
							" / ",
							result.total,
							" (",
							Math.round(result.correct / result.total * 100),
							"%)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your competency levels and recommendations have been recalculated."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/gaps",
								children: "See skill gaps"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/learning-path",
								children: "Learning path"
							})
						})]
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-center justify-between gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[240px] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							answered,
							" of ",
							total,
							" answered"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: answered / total * 100,
						className: "mt-2"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					children: "Submit assessment"
				})]
			}) }),
			ASSESSMENT_QUESTIONS.map((q, index) => {
				const chosen = answers[q.id];
				const competency = competencyById(q.competencyId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-sm font-semibold leading-snug",
					children: [
						index + 1,
						". ",
						q.prompt
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Competency: ", competency?.name]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2",
					children: [q.options.map((option, i) => {
						const isChosen = chosen === i;
						const isCorrect = i === q.correctIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: submitted,
							onClick: () => setAnswers((a) => ({
								...a,
								[q.id]: i
							})),
							className: cn("flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors", !submitted && isChosen && "border-primary bg-secondary", !submitted && !isChosen && "hover:bg-muted", submitted && isCorrect && "border-green-600 bg-green-50", submitted && isChosen && !isCorrect && "border-destructive bg-red-50"),
							children: [submitted && isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-700" }) : submitted && isChosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 rounded-full border" }), option]
						}, option);
					}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-1 text-xs text-muted-foreground",
						children: q.explanation
					}) : null]
				})] }, q.id);
			}),
			!submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					children: "Submit assessment"
				})
			}) : null
		]
	});
}
//#endregion
export { AssessmentPage as component };
