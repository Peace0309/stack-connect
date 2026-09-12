import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, o as cn, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { n as SEVERITY_COLORS, r as buildGapRows } from "./engine-CK4n_0Vy.mjs";
import { n as GapBars } from "./charts-0qb0j-Gi.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gaps-DxrlAF2f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var ORDER = [
	"Critical",
	"High",
	"Medium",
	"Low",
	"No Gap"
];
function GapsPage() {
	const { levels, assessmentTaken } = usePlatform();
	const rows = (0, import_react.useMemo)(() => buildGapRows(levels).sort((a, b) => b.gap - a.gap || a.competency.name.localeCompare(b.competency.name)), [levels]);
	const counts = ORDER.map((severity) => ({
		severity,
		count: rows.filter((r) => r.severity === severity).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "Skill Gaps",
		subtitle: assessmentTaken ? "Computed from your latest assessment and completed learning" : "Computed from your baseline profile — take the assessment for measured levels",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: counts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2 w-10 rounded-full",
							style: { backgroundColor: SEVERITY_COLORS[c.severity] }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-semibold",
							children: c.count
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: c.severity
						})
					]
				}) }, c.severity))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Gap magnitude"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GapBars, {
				rows,
				limit: 20
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between space-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Detailed gap analysis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learning-path",
						children: "Get recommendations"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Competency" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-center",
						children: "Current"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-center",
						children: "Required"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-center",
						children: "Gap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Severity" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: r.competency.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-muted-foreground",
						children: r.competency.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-center",
						children: ["L", r.current]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "text-center",
						children: ["L", r.required]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-center",
						children: r.gap
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						style: {
							backgroundColor: SEVERITY_COLORS[r.severity],
							color: "white"
						},
						children: r.severity
					}) })
				] }, r.competency.id)) })] })
			})] })
		]
	});
}
//#endregion
export { GapsPage as component };
