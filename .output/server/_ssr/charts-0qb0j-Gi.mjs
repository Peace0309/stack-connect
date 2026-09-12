import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as XAxis, c as Radar, d as PolarRadiusAxis, f as PolarGrid, g as Legend, h as Tooltip, i as YAxis, m as ResponsiveContainer, o as CartesianGrid, p as Cell, r as BarChart, s as Bar, t as RadarChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
import { n as SEVERITY_COLORS } from "./engine-CK4n_0Vy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-0qb0j-Gi.js
var import_jsx_runtime = require_jsx_runtime();
function CompetencyRadar({ rows }) {
	const data = rows.map((r) => ({
		subject: r.competency.name.length > 22 ? `${r.competency.name.slice(0, 20)}…` : r.competency.name,
		current: r.current,
		required: r.required
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[420px] w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
				data,
				outerRadius: "72%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "hsl(220 15% 85%)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
						dataKey: "subject",
						tick: { fontSize: 10 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
						domain: [0, 5],
						tickCount: 6,
						tick: { fontSize: 10 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
						name: "Required",
						dataKey: "required",
						stroke: "var(--color-chart-2)",
						fill: "var(--color-chart-2)",
						fillOpacity: .18
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
						name: "Current",
						dataKey: "current",
						stroke: "var(--color-chart-1)",
						fill: "var(--color-chart-1)",
						fillOpacity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})
				]
			})
		})
	});
}
function GapBars({ rows, limit = 10 }) {
	const data = [...rows].filter((r) => r.gap > 0).sort((a, b) => b.gap - a.gap).slice(0, limit).map((r) => ({
		name: r.competency.name,
		gap: r.gap,
		fill: SEVERITY_COLORS[r.severity]
	}));
	if (!data.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-sm text-muted-foreground",
		children: "No gaps remaining — every competency meets its required level."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height: Math.max(220, data.length * 38) },
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					left: 10,
					right: 24
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						horizontal: false,
						stroke: "hsl(220 15% 90%)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						domain: [0, 5],
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						width: 190,
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => [`${v} level(s)`, "Gap"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "gap",
						radius: [
							0,
							4,
							4,
							0
						],
						barSize: 18,
						children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
					})
				]
			})
		})
	});
}
//#endregion
export { GapBars as n, CompetencyRadar as t };
