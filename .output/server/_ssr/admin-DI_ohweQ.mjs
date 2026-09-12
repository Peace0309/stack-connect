import { i as __toESM } from "../_runtime.mjs";
import { a as DEPARTMENTS, r as COMPETENCIES } from "./data-CduRO4Hf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent } from "./card-B3QIWrqf.mjs";
import { _ as ClipboardList, g as Clock, i as TriangleAlert, m as Gauge, t as Users } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { t as KpiCard } from "./KpiCard-D154hSrq.mjs";
import { t as Progress } from "./progress-BM5BSLRj.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CTgEUHy0.mjs";
import { a as XAxis, g as Legend, h as Tooltip, i as YAxis, l as Pie, m as ResponsiveContainer, n as PieChart, o as CartesianGrid, p as Cell, r as BarChart, s as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DI_ohweQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEPT_STATS = [
	{
		dept: "Official Statistics Division",
		officials: 320,
		avg: 3.4,
		critical: 41,
		hours: 18.6,
		attempts: 512
	},
	{
		dept: "National Accounts Division",
		officials: 180,
		avg: 3.1,
		critical: 33,
		hours: 15.2,
		attempts: 268
	},
	{
		dept: "Price Statistics Division",
		officials: 145,
		avg: 3.2,
		critical: 22,
		hours: 14.1,
		attempts: 210
	},
	{
		dept: "Field Operations Division",
		officials: 265,
		avg: 2.8,
		critical: 68,
		hours: 11.7,
		attempts: 341
	},
	{
		dept: "Data Informatics & Innovation",
		officials: 130,
		avg: 3.7,
		critical: 12,
		hours: 22.4,
		attempts: 224
	},
	{
		dept: "State Directorates of Economics & Statistics",
		officials: 210,
		avg: 2.6,
		critical: 79,
		hours: 9.8,
		attempts: 288
	}
];
var EMERGING_SKILLS = [
	{
		skill: "AI / Machine Learning",
		demand: 92,
		supply: 34
	},
	{
		skill: "Big Data & Alternative Sources",
		demand: 84,
		supply: 41
	},
	{
		skill: "Python for Data Analysis",
		demand: 88,
		supply: 52
	},
	{
		skill: "GIS & Geospatial",
		demand: 71,
		supply: 38
	},
	{
		skill: "Data Visualisation",
		demand: 76,
		supply: 58
	},
	{
		skill: "Cyber Security & Data Protection",
		demand: 80,
		supply: 47
	}
];
var LEVEL_DISTRIBUTION = [
	{
		name: "Beginner",
		value: 168,
		fill: "hsl(0 72% 50%)"
	},
	{
		name: "Basic",
		value: 291,
		fill: "hsl(20 90% 52%)"
	},
	{
		name: "Intermediate",
		value: 437,
		fill: "hsl(38 92% 50%)"
	},
	{
		name: "Advanced",
		value: 268,
		fill: "hsl(196 60% 45%)"
	},
	{
		name: "Expert",
		value: 86,
		fill: "hsl(152 55% 40%)"
	}
];
function AdminPage() {
	const [dept, setDept] = (0, import_react.useState)(DEPARTMENTS[0]);
	const scope = (0, import_react.useMemo)(() => dept === "All Departments" ? DEPT_STATS : DEPT_STATS.filter((d) => d.dept === dept), [dept]);
	const officials = scope.reduce((s, d) => s + d.officials, 0);
	const critical = scope.reduce((s, d) => s + d.critical, 0);
	const attempts = scope.reduce((s, d) => s + d.attempts, 0);
	const avg = Math.round(scope.reduce((s, d) => s + d.avg * d.officials, 0) / (officials || 1) * 10) / 10;
	const hours = Math.round(scope.reduce((s, d) => s + d.hours * d.officials, 0) / (officials || 1) * 10) / 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "admin",
		title: "Workforce Capacity Analytics",
		subtitle: "Ministry of Statistics & Programme Implementation",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: dept,
					onValueChange: setDept,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: d,
						children: d
					}, d)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Officials",
						value: officials.toLocaleString("en-IN"),
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Avg competency",
						value: `${avg} / 5`,
						icon: Gauge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Critical gaps",
						value: critical,
						icon: TriangleAlert
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Avg learning hours",
						value: hours,
						icon: Clock
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Assessment attempts",
						value: attempts,
						icon: ClipboardList
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Competency level distribution (officials)"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: LEVEL_DISTRIBUTION,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 55,
								outerRadius: 95,
								paddingAngle: 2,
								children: LEVEL_DISTRIBUTION.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})
						] })
					})
				}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Emerging skills: demand vs current capability"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: EMERGING_SKILLS,
							margin: {
								left: 0,
								right: 10
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									vertical: false,
									stroke: "hsl(220 15% 90%)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "skill",
									tick: { fontSize: 9 },
									interval: 0,
									angle: -15,
									textAnchor: "end",
									height: 60
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "demand",
									name: "Demand index",
									fill: "var(--color-chart-2)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "supply",
									name: "Capability index",
									fill: "var(--color-chart-1)"
								})
							]
						})
					})
				}) })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Department-wise capacity"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-4",
				children: scope.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: d.dept
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									d.officials,
									" officials · ",
									d.critical,
									" critical gaps · ",
									d.hours,
									" avg hours · ",
									d.attempts,
									" attempts"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: d.avg / 5 * 100,
							className: "mt-2 h-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"Average competency ",
								d.avg,
								" / 5"
							]
						})
					]
				}, d.dept))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Framework coverage: ",
					COMPETENCIES.length,
					" competencies monitored across the statistical workforce."
				]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
