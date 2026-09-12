import { i as __toESM } from "../_runtime.mjs";
import { i as DEMO_PROFILE, n as BASELINE_LEVELS, o as IGOT_COURSES } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CJU7xTKe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCOUNTS = {
	"employee@demo.gov.in": {
		password: "Demo@123",
		user: {
			role: "employee",
			name: DEMO_PROFILE.name,
			email: "employee@demo.gov.in",
			designation: DEMO_PROFILE.designation
		}
	},
	"admin@demo.gov.in": {
		password: "Admin@123",
		user: {
			role: "admin",
			name: "R. Venkatesan",
			email: "admin@demo.gov.in",
			designation: "Deputy Director General (Capacity Building)"
		}
	}
};
var initialState = {
	user: null,
	profile: DEMO_PROFILE,
	levels: { ...BASELINE_LEVELS },
	assessmentTaken: false,
	lastAssessment: null,
	enrollments: [{
		courseId: "igot-107",
		progress: 60,
		enrolledAt: "2026-08-02"
	}],
	questions: [],
	materialName: null,
	history: [{
		id: "h0",
		at: "2026-08-02",
		kind: "enrollment",
		label: "Enrolled in Cyber Security and Data Protection in Government",
		detail: "iGOT Karmayogi · CERT-In"
	}]
};
var STORAGE_KEY = "sih-ps101-state-v1";
var PlatformContext = (0, import_react.createContext)(null);
function bump(current) {
	return Math.min(5, current + 1);
}
function PlatformProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(initialState);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setState({
				...initialState,
				...JSON.parse(raw)
			});
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {}
	}, [state, hydrated]);
	const pushHistory = (0, import_react.useCallback)((event) => setState((s) => ({
		...s,
		history: [{
			...event,
			id: `h${s.history.length + 1}-${event.kind}`,
			at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}, ...s.history].slice(0, 25)
	})), []);
	const value = (0, import_react.useMemo)(() => ({
		...state,
		login: (email, password) => {
			const account = ACCOUNTS[email.trim().toLowerCase()];
			if (!account || account.password !== password) return null;
			setState((s) => ({
				...s,
				user: account.user
			}));
			return account.user;
		},
		logout: () => setState((s) => ({
			...s,
			user: null
		})),
		applyAssessment: (perCompetency, correct, total) => {
			setState((s) => {
				const levels = { ...s.levels };
				for (const [id, r] of Object.entries(perCompetency)) {
					const pct = r.total ? r.correct / r.total : 0;
					const assessed = pct >= .99 ? 4 : pct >= .5 ? 3 : pct > 0 ? 2 : 1;
					const prior = levels[id] ?? 1;
					levels[id] = Math.max(1, Math.round((prior + assessed) / 2));
				}
				return {
					...s,
					levels,
					assessmentTaken: true,
					lastAssessment: {
						correct,
						total,
						at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
					}
				};
			});
			pushHistory({
				kind: "assessment",
				label: `Competency assessment completed — ${correct}/${total}`,
				detail: "Skill-gap engine re-ran and recommendations were refreshed."
			});
		},
		enroll: (courseId) => {
			setState((s) => s.enrollments.some((e) => e.courseId === courseId) ? s : {
				...s,
				enrollments: [...s.enrollments, {
					courseId,
					progress: 0,
					enrolledAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
				}]
			});
			const course = IGOT_COURSES.find((c) => c.id === courseId);
			pushHistory({
				kind: "enrollment",
				label: `Enrolled in ${course?.title ?? courseId}`,
				detail: `${course?.provider ?? "iGOT Karmayogi"} · Mock API`
			});
		},
		setProgress: (courseId, progress) => {
			setState((s) => {
				const course = IGOT_COURSES.find((c) => c.id === courseId);
				const levels = { ...s.levels };
				if (progress >= 100 && course) for (const id of course.competencyIds) levels[id] = bump(levels[id] ?? 1);
				return {
					...s,
					levels,
					enrollments: s.enrollments.map((e) => e.courseId === courseId ? {
						...e,
						progress
					} : e)
				};
			});
			if (progress >= 100) {
				const course = IGOT_COURSES.find((c) => c.id === courseId);
				pushHistory({
					kind: "progress",
					label: `Completed ${course?.title ?? courseId}`,
					detail: "Competency profile updated from course completion."
				});
			}
		},
		setQuestions: (questions, materialName) => {
			setState((s) => ({
				...s,
				questions,
				materialName
			}));
			pushHistory({
				kind: "material",
				label: `Generated ${questions.length} MCQs from ${materialName}`,
				detail: "All items passed the 5-point validation gate."
			});
		},
		updateQuestion: (question) => setState((s) => ({
			...s,
			questions: s.questions.map((q) => q.id === question.id ? question : q)
		})),
		applyMcqResults: (perCompetency) => {
			setState((s) => {
				const levels = { ...s.levels };
				for (const [id, r] of Object.entries(perCompetency)) {
					const pct = r.total ? r.correct / r.total : 0;
					const prior = levels[id] ?? 1;
					levels[id] = Math.max(1, Math.min(5, pct >= .7 ? prior + 1 : pct >= .4 ? prior : Math.max(1, prior - 1)));
				}
				return {
					...s,
					levels
				};
			});
			pushHistory({
				kind: "mcq-test",
				label: "In-place assessment submitted",
				detail: "Competency profile and recommendations recalculated."
			});
		},
		addLearningHours: (hours) => setState((s) => ({
			...s,
			profile: {
				...s.profile,
				learningHours: s.profile.learningHours + hours
			}
		})),
		reset: () => setState({
			...initialState,
			user: state.user
		})
	}), [state, pushHistory]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformContext.Provider, {
		value,
		children
	});
}
function usePlatform() {
	const ctx = (0, import_react.useContext)(PlatformContext);
	if (!ctx) throw new Error("usePlatform must be used inside PlatformProvider");
	return ctx;
}
//#endregion
export { usePlatform as n, PlatformProvider as t };
