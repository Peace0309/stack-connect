import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Card, r as CardContent } from "./card-B3QIWrqf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/KpiCard-D154hSrq.js
var import_jsx_runtime = require_jsx_runtime();
function KpiCard({ label, value, hint, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex items-start justify-between gap-3 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-2xl font-semibold text-foreground",
					children: value
				}),
				hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: hint
				}) : null
			]
		}), Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-md bg-secondary p-2 text-secondary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}) : null]
	}) });
}
//#endregion
export { KpiCard as t };
