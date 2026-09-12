import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { t as AppShell } from "./AppShell-RdLkI79C.mjs";
import { i as overallCompetency, r as buildGapRows } from "./engine-CK4n_0Vy.mjs";
import { t as Badge } from "./badge-Dq2bNBWu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Dy2JpVq4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { profile, levels, enrollments, history } = usePlatform();
	const strengths = [...(0, import_react.useMemo)(() => buildGapRows(levels), [levels])].sort((a, b) => b.current - a.current).slice(0, 4);
	const fields = [
		["Full name", profile.name],
		["Designation", profile.designation],
		["Division", profile.division],
		["Department", profile.department],
		["Grade", profile.grade],
		["Station", profile.location],
		["Official email", profile.email],
		["Joined service", profile.joinedOn]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		role: "employee",
		title: "My Profile",
		subtitle: "Service record and learning summary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Service details"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-4 sm:grid-cols-2",
					children: fields.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm font-medium",
						children: value
					})] }, label))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Learning summary"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Overall competency"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [overallCompetency(levels), " / 5"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Learning hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: profile.learningHours
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Enrolments"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: enrollments.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Completed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: enrollments.filter((e) => e.progress >= 100).length
						})]
					})
				]
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Strongest competencies"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-wrap gap-2",
				children: strengths.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					children: [
						r.competency.name,
						" · L",
						r.current
					]
				}, r.competency.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Recent activity"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: history.slice(0, 6).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] })]
		})]
	});
}
//#endregion
export { ProfilePage as component };
