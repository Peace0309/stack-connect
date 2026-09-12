import { i as __toESM } from "../_runtime.mjs";
import { r as COMPETENCIES, s as competencyById } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, o as cn, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { b as CircleCheck, d as LoaderCircle, r as Upload, y as CircleX } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CTgEUHy0.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
import { t as Input$1 } from "./input-qlB7OtzP.mjs";
import { t as Label } from "./label-D8Jh45Tz.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-B2qMuesm.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mcq-BO8Yd7BF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = objectType({
	text: stringType().min(1),
	count: numberType().int().min(3).max(20),
	difficulty: enumType([
		"Easy",
		"Medium",
		"Hard"
	]),
	language: stringType().min(1),
	sourceName: stringType().min(1),
	competencyIds: arrayType(stringType()).min(1)
});
var generateMcqsWithAI = createServerFn({ method: "POST" }).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("35879ad628fead78799044f6b0616f7644fbf8eb353e770f1df08ca0662b4560"));
/**
* Browser-side text extraction for uploaded learning material.
* TXT/MD/CSV are read directly. PDF and DOCX are binary containers, so a
* best-effort readable-text pass is used; if that yields too little text the
* caller falls back to the deterministic generator seeded by the file name.
*/
async function extractText(file) {
	const name = file.name.toLowerCase();
	if (/\.(txt|md|csv|json)$/.test(name)) return await file.text();
	const buffer = new Uint8Array(await file.arrayBuffer());
	const decoded = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
	if (name.endsWith(".pdf")) {
		const text = [...decoded.matchAll(/\(([^()\\]{3,})\)/g)].map((m) => m[1] ?? "").join(" ").replace(/\s+/g, " ").trim();
		return text.length > 200 ? text : "";
	}
	const readable = decoded.replace(/[^\x20-\x7E\n]+/g, " ").replace(/\s+/g, " ").trim();
	return readable.length > 400 ? readable : "";
}
var COMPETENCY_KEYWORDS = {
	sampling: [
		"sampling",
		"stratif",
		"cluster",
		"weight",
		"frame",
		"psu"
	],
	"survey-design": [
		"survey",
		"questionnaire",
		"pilot",
		"schedule",
		"respondent"
	],
	"data-quality": [
		"quality",
		"editing",
		"imputation",
		"non-response",
		"error"
	],
	"national-accounts": [
		"gdp",
		"national account",
		"sna",
		"supply-use",
		"gva"
	],
	"price-statistics": [
		"price",
		"cpi",
		"wpi",
		"inflation",
		"index"
	],
	econometrics: [
		"regression",
		"time series",
		"arima",
		"forecast",
		"seasonal"
	],
	python: [
		"python",
		"pandas",
		"numpy",
		"dataframe",
		"script"
	],
	"r-stats": [
		" r ",
		"rstudio",
		"tidyverse",
		"ggplot"
	],
	sql: [
		"sql",
		"join",
		"query",
		"database",
		"table"
	],
	"ai-ml": [
		"machine learning",
		"model",
		"neural",
		"ai",
		"training data",
		"algorithm"
	],
	gis: [
		"gis",
		"spatial",
		"geo",
		"map",
		"coordinate"
	],
	"big-data": [
		"big data",
		"administrative data",
		"scraping",
		"register"
	],
	"data-viz": [
		"visual",
		"dashboard",
		"chart",
		"graph"
	],
	cybersecurity: [
		"security",
		"confidential",
		"privacy",
		"encryption",
		"dpdp"
	],
	"e-governance": [
		"governance",
		"digital public",
		"api",
		"interoperab"
	],
	"open-data": [
		"open data",
		"metadata",
		"dissemination",
		"ndsap"
	],
	communication: [
		"communicat",
		"brief",
		"report writing",
		"stakeholder"
	],
	"project-management": [
		"project",
		"field operation",
		"schedule",
		"resource"
	],
	leadership: [
		"leadership",
		"team",
		"mentor",
		"collaborat"
	],
	"official-stats-standards": [
		"fundamental principles",
		"standard",
		"classification",
		"nqaf"
	]
};
function detectCompetency(text) {
	const lower = ` ${text.toLowerCase()} `;
	let best = "data-quality";
	let bestScore = 0;
	for (const [id, words] of Object.entries(COMPETENCY_KEYWORDS)) {
		const score = words.reduce((s, w) => s + (lower.split(w).length - 1) * (w.length > 6 ? 2 : 1), 0);
		if (score > bestScore) {
			bestScore = score;
			best = id;
		}
	}
	return best;
}
function sentences(text) {
	return text.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 40 && s.length < 320);
}
function keyTerm(sentence) {
	return sentence.replace(/[^A-Za-z0-9 -]/g, " ").split(" ").filter((w) => w.length > 5).sort((a, b) => b.length - a.length)[0] ?? "the concept";
}
/**
* Deterministic offline MCQ generator. Used as an automatic fallback whenever
* the AI generation call is unavailable, so the demo loop never breaks.
*/
function generateMockMCQs(text, count, difficulty, language, sourceName) {
	const pool = sentences(text);
	const fallbackPool = pool.length ? pool : [
		`${sourceName} describes the standard operating procedure followed by the official statistical system for this topic, including its scope, method and quality checks.`,
		"Statistical outputs must follow documented methodology, be validated against known benchmarks, and be released with metadata describing coverage and limitations.",
		"Confidentiality of unit-level records is protected at every stage of the statistical production process, from collection through to dissemination.",
		"Quality assurance combines pre-collection design controls, in-field supervision and post-collection editing and imputation."
	];
	const out = [];
	for (let i = 0; i < count; i++) {
		const source = fallbackPool[i % fallbackPool.length];
		const term = keyTerm(source);
		const competencyId = detectCompetency(source + " " + sourceName);
		const correct = source.length > 150 ? source.slice(0, 140).trim() + "…" : source;
		out.push({
			id: `mcq-${i + 1}`,
			competencyId,
			question: difficulty === "Hard" ? `Based on the uploaded material, which statement best explains the role of "${term}"?` : difficulty === "Medium" ? `According to the uploaded material, which of the following is correct about "${term}"?` : `What does the uploaded material state about "${term}"?`,
			options: [
				correct,
				`${term} is only relevant after results have been published and has no bearing on the production process.`,
				`${term} is an optional administrative formality that field staff may skip during peak survey rounds.`,
				`${term} applies exclusively to private-sector datasets and not to official statistics.`
			],
			correctIndex: 0,
			explanation: `The uploaded material states this directly; the other options contradict standard official-statistics practice.`,
			sourceExcerpt: source,
			difficulty,
			language
		});
	}
	return out;
}
function validate(q) {
	return {
		fourOptions: q.options.length === 4,
		singleCorrect: q.correctIndex >= 0 && q.correctIndex < q.options.length && new Set(q.options.map((o) => o.trim())).size === q.options.length,
		hasExplanation: q.explanation.trim().length > 10,
		sourceLinked: q.sourceExcerpt.trim().length > 20,
		competencyDetected: Boolean(competencyById(q.competencyId))
	};
}
var CHECK_LABELS = [
	["fourOptions", "Exactly 4 options"],
	["singleCorrect", "Single unambiguous answer"],
	["hasExplanation", "Explanation present"],
	["sourceLinked", "Linked to source excerpt"],
	["competencyDetected", "Competency detected"]
];
function McqPage() {
	const { questions, materialName, setQuestions, updateQuestion, applyMcqResults } = usePlatform();
	const [file, setFile] = (0, import_react.useState)(null);
	const [count, setCount] = (0, import_react.useState)("6");
	const [difficulty, setDifficulty] = (0, import_react.useState)("Medium");
	const [language, setLanguage] = (0, import_react.useState)("English");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [engine, setEngine] = (0, import_react.useState)(null);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [scored, setScored] = (0, import_react.useState)(null);
	const generate = async () => {
		if (!file) {
			toast.error("Choose a PDF, DOCX or TXT file first.");
			return;
		}
		setBusy(true);
		setScored(null);
		setAnswers({});
		try {
			const text = await extractText(file);
			const n = Number(count);
			let produced = null;
			if (text.length > 200) {
				const res = await generateMcqsWithAI({ data: {
					text,
					count: n,
					difficulty,
					language,
					sourceName: file.name,
					competencyIds: COMPETENCIES.map((c) => c.id)
				} });
				if (res.ok && res.items.length) {
					produced = res.items.map((item, i) => ({
						id: `mcq-${i + 1}`,
						competencyId: competencyById(item.competencyId) ? item.competencyId : "data-quality",
						question: item.question,
						options: item.options,
						correctIndex: item.correctIndex,
						explanation: item.explanation,
						sourceExcerpt: item.sourceExcerpt,
						difficulty,
						language
					}));
					setEngine("AI generation (Lovable AI Gateway)");
				} else if (res.reason) toast.message("Using deterministic generator", { description: res.reason });
			}
			if (!produced) {
				produced = generateMockMCQs(text, n, difficulty, language, file.name);
				setEngine("Deterministic offline generator");
			}
			setQuestions(produced, file.name);
			toast.success(`${produced.length} questions generated and validated.`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Generation failed.");
		} finally {
			setBusy(false);
		}
	};
	const submitTest = () => {
		if (Object.keys(answers).length < questions.length) {
			toast.error("Answer every question before submitting.");
			return;
		}
		const per = {};
		let correct = 0;
		for (const q of questions) {
			const bucket = per[q.competencyId] ??= {
				correct: 0,
				total: 0
			};
			bucket.total += 1;
			if (answers[q.id] === q.correctIndex) {
				bucket.correct += 1;
				correct += 1;
			}
		}
		applyMcqResults(per);
		setScored({
			correct,
			total: questions.length
		});
		toast.success("Competency profile and recommendations updated.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "AI MCQ Generator",
		subtitle: "Upload material → generate → validate → review → test → update competencies",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "1. Upload learning material"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid gap-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "file",
							children: "File (PDF, DOCX, TXT)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							id: "file",
							type: "file",
							accept: ".pdf,.docx,.txt,.md,.csv",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						}),
						file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								file.name,
								" · ",
								(file.size / 1024).toFixed(0),
								" KB"
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Questions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: count,
								onValueChange: setCount,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									"4",
									"6",
									"8",
									"10"
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: n,
									children: n
								}, n)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Difficulty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: difficulty,
								onValueChange: (v) => setDifficulty(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Easy",
										children: "Easy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Medium",
										children: "Medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Hard",
										children: "Hard"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Language" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: language,
								onValueChange: setLanguage,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "English",
									children: "English"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Hindi",
									children: "Hindi"
								})] })]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: generate,
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), "Generate questions"]
					}), engine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-3 text-xs text-muted-foreground",
						children: ["Engine: ", engine]
					}) : null]
				})
			]
		})] }), questions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
			className: "text-base",
			children: [
				"2. Review, edit and validate — ",
				questions.length,
				" questions from",
				" ",
				materialName
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "space-y-5",
			children: questions.map((q, index) => {
				const checks = validate(q);
				const passed = Object.values(checks).filter(Boolean).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Q",
									index + 1,
									" · ",
									competencyById(q.competencyId)?.name,
									" ·",
									" ",
									q.difficulty,
									" · ",
									q.language
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: passed === 5 ? "secondary" : "destructive",
								children: [
									"Validation ",
									passed,
									"/5"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-3",
							value: q.question,
							onChange: (e) => updateQuestion({
								...q,
								question: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: q.options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => updateQuestion({
										...q,
										correctIndex: i
									}),
									className: cn("h-5 w-5 shrink-0 rounded-full border", q.correctIndex === i && "bg-primary"),
									"aria-label": `Mark option ${i + 1} correct`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: opt,
									onChange: (e) => {
										const options = [...q.options];
										options[i] = e.target.value;
										updateQuestion({
											...q,
											options
										});
									}
								})]
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-3",
							value: q.explanation,
							onChange: (e) => updateQuestion({
								...q,
								explanation: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 rounded bg-muted p-2 text-xs text-muted-foreground",
							children: ["Source excerpt: ", q.sourceExcerpt]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-xs",
							children: CHECK_LABELS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [checks[key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-green-700" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5 text-destructive" }), label]
							}, key))
						})
					]
				}, q.id);
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "3. Take the assessment"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4",
			children: [questions.map((q, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							index + 1,
							". ",
							q.question
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: q.options.map((opt, i) => {
							const chosen = answers[q.id] === i;
							const reveal = Boolean(scored);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: Boolean(scored),
								onClick: () => setAnswers((a) => ({
									...a,
									[q.id]: i
								})),
								className: cn("block w-full rounded-md border px-3 py-2 text-left text-sm", !reveal && chosen && "border-primary bg-secondary", reveal && i === q.correctIndex && "border-green-600 bg-green-50", reveal && chosen && i !== q.correctIndex && "border-destructive bg-red-50"),
								children: opt
							}, i);
						})
					}),
					scored ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: q.explanation
					}) : null
				]
			}, q.id)), scored ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-semibold",
				children: [
					"Score ",
					scored.correct,
					"/",
					scored.total,
					" — competency profile and recommendations recalculated."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: submitTest,
				children: "Submit and update competencies"
			})]
		})] })] }) : null]
	});
}
//#endregion
export { McqPage as component };
