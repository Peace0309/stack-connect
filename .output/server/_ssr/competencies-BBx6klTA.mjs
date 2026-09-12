import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { n as SEVERITY_COLORS, r as buildGapRows } from "./engine-CK4n_0Vy.mjs";
import { t as CompetencyRadar } from "./charts-0qb0j-Gi.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/competencies-BBx6klTA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVEL_LABELS = {
	0: "Not Assessed",
	1: "Beginner",
	2: "Basic",
	3: "Intermediate",
	4: "Advanced",
	5: "Expert"
};
var CATEGORIES = [
	"Statistical",
	"Technical",
	"Digital Governance",
	"Behavioural & Managerial"
];
function CompetenciesPage() {
	const { levels } = usePlatform();
	const rows = (0, import_react.useMemo)(() => buildGapRows(levels), [levels]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "Competency Framework",
		subtitle: "Current level against the level required for your role",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-base",
			children: "Profile overview"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompetencyRadar, { rows }) })] }), CATEGORIES.map((category) => {
			const items = rows.filter((r) => r.competency.category === category);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: category
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-4",
				children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: r.competency.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								style: {
									backgroundColor: SEVERITY_COLORS[r.severity],
									color: "white"
								},
								children: r.severity
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: r.competency.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: r.current / 5 * 100,
								className: "h-2 flex-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-44 text-right text-xs text-muted-foreground",
								children: [
									LEVEL_LABELS[r.current],
									" (L",
									r.current,
									") · required L",
									r.required
								]
							})]
						})
					]
				}, r.competency.id))
			})] }, category);
		})]
	});
}
//#endregion
export { CompetenciesPage as component };
