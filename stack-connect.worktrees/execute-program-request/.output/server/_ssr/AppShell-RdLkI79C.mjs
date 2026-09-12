import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as BookOpen, T as ChartColumn, a as Target, f as LayoutDashboard, h as FileQuestionMark, l as Radar, n as UserRound, p as GraduationCap, u as LogOut, v as ClipboardCheck, w as ChartLine } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-RdLkI79C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPLOYEE_NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/profile",
		label: "My Profile",
		icon: UserRound
	},
	{
		to: "/competencies",
		label: "Competencies",
		icon: Radar
	},
	{
		to: "/assessment",
		label: "Assessment",
		icon: ClipboardCheck
	},
	{
		to: "/gaps",
		label: "Skill Gaps",
		icon: Target
	},
	{
		to: "/learning-path",
		label: "Learning Path",
		icon: GraduationCap
	},
	{
		to: "/courses",
		label: "iGOT Catalogue",
		icon: BookOpen
	},
	{
		to: "/mcq",
		label: "MCQ Generator",
		icon: FileQuestionMark
	},
	{
		to: "/progress",
		label: "Progress",
		icon: ChartLine
	}
];
var ADMIN_NAV = [{
	to: "/admin",
	label: "Workforce Dashboard",
	icon: ChartColumn
}];
function AppShell({ role, title, subtitle, children }) {
	const { user, logout } = usePlatform();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (user === null) navigate({
			to: "/login",
			replace: true
		});
		else if (user.role !== role) navigate({
			to: user.role === "admin" ? "/admin" : "/dashboard",
			replace: true
		});
	}, [
		user,
		role,
		navigate
	]);
	if (!user || user.role !== role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground",
		children: "Checking your sign-in…"
	});
	const nav = role === "admin" ? ADMIN_NAV : EMPLOYEE_NAV;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-sidebar-border px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-sidebar-primary",
							children: "SIH PS 101"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold leading-tight",
							children: "AI-Enabled Learning Platform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-sidebar-foreground/70",
							children: "Official Statistical System"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 p-3",
					children: nav.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", active ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground" : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-sidebar-border p-4 text-xs text-sidebar-foreground/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-sidebar-foreground",
						children: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: user.designation })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b bg-card px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-xl font-semibold text-foreground",
							children: title
						}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: subtitle
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
							children: role === "admin" ? "Administrator" : "Officer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								logout();
								navigate({
									to: "/login",
									replace: true
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1 h-4 w-4" }), " Sign out"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-1 overflow-x-auto border-b bg-card px-3 py-2 lg:hidden",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium", pathname === item.to ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-6xl space-y-6",
						children
					})
				})
			]
		})]
	});
}
//#endregion
export { AppShell as t };
