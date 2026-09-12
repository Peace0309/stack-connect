import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as PlatformProvider } from "./store-CJU7xTKe.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DexGFFcw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-CiQZOqtn.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PS 101 · AI-Enabled Learning Platform" },
			{
				name: "description",
				content: "Competency assessment, AI skill-gap detection and personalised iGOT learning for India's official statistical system."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlatformProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$11 = () => import("./routes-DybAMi0J.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "PS 101 · AI-Enabled Learning Platform for Official Statistics" },
		{
			name: "description",
			content: "A closed-loop capacity building platform: assess competencies, detect skill gaps with AI, recommend iGOT courses, learn, and re-assess."
		},
		{
			property: "og:title",
			content: "PS 101 · AI-Enabled Learning Platform for Official Statistics"
		},
		{
			property: "og:description",
			content: "Assess, diagnose, recommend, learn and re-assess — capacity building for India's official statistical system."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin-DI_ohweQ.mjs");
var Route$10 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Workforce Analytics · PS 101" },
		{
			name: "description",
			content: "Capacity-building analytics across 1,250 officials: competency distribution, critical gaps and emerging skills demand."
		},
		{
			property: "og:title",
			content: "Workforce Analytics · PS 101"
		},
		{
			property: "og:description",
			content: "Department-wise competency distribution and emerging skills analytics."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./assessment-BU06U2y7.mjs");
var Route$9 = createFileRoute("/assessment")({
	head: () => ({ meta: [
		{ title: "Competency Assessment · PS 101" },
		{
			name: "description",
			content: "A 15-question competency assessment covering sampling, survey design, data quality, Python, SQL, GIS, AI/ML and cyber security."
		},
		{
			property: "og:title",
			content: "Competency Assessment · PS 101"
		},
		{
			property: "og:description",
			content: "Programmatically scored assessment that updates your competency profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./competencies-BBx6klTA.mjs");
var Route$8 = createFileRoute("/competencies")({
	head: () => ({ meta: [
		{ title: "Competency Framework · PS 101" },
		{
			name: "description",
			content: "Twenty role competencies across statistical, technical, digital governance and behavioural categories with current and required levels."
		},
		{
			property: "og:title",
			content: "Competency Framework · PS 101"
		},
		{
			property: "og:description",
			content: "Current versus required levels across the full competency framework."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./courses-BYsC9hyI.mjs");
var Route$7 = createFileRoute("/courses")({
	head: () => ({ meta: [
		{ title: "iGOT Karmayogi Catalogue · PS 101" },
		{
			name: "description",
			content: "Browse and enrol in mock iGOT Karmayogi courses mapped to the official statistics competency framework."
		},
		{
			property: "og:title",
			content: "iGOT Karmayogi Catalogue · PS 101"
		},
		{
			property: "og:description",
			content: "Sixteen competency-mapped courses with enrolment via a mock API."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-D294SSYu.mjs");
var Route$6 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Officer Dashboard · PS 101" },
		{
			name: "description",
			content: "Competency KPIs, radar profile and prioritised skill gaps for the signed-in statistical officer."
		},
		{
			property: "og:title",
			content: "Officer Dashboard · PS 101"
		},
		{
			property: "og:description",
			content: "Your competency snapshot, gaps and next recommended learning."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./gaps-DxrlAF2f.mjs");
var Route$5 = createFileRoute("/gaps")({
	head: () => ({ meta: [
		{ title: "AI Skill-Gap Detection · PS 101" },
		{
			name: "description",
			content: "Detected competency gaps ranked from Critical to Low, comparing assessed levels with role-required levels."
		},
		{
			property: "og:title",
			content: "AI Skill-Gap Detection · PS 101"
		},
		{
			property: "og:description",
			content: "Gap severity across all twenty competencies with recommended action."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./learning-path-Dru9d4tr.mjs");
var Route$4 = createFileRoute("/learning-path")({
	head: () => ({ meta: [
		{ title: "Personalised Learning Path · PS 101" },
		{
			name: "description",
			content: "Weighted course recommendations ranked by skill gap, role relevance, learning history, difficulty match and department priority."
		},
		{
			property: "og:title",
			content: "Personalised Learning Path · PS 101"
		},
		{
			property: "og:description",
			content: "Your ranked iGOT Karmayogi learning path with transparent scoring."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-K4U-oXYC.mjs");
var Route$3 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign in · PS 101 Learning Platform" },
		{
			name: "description",
			content: "Sign in as an officer or administrator to the PS 101 AI-enabled learning platform."
		},
		{
			property: "og:title",
			content: "Sign in · PS 101 Learning Platform"
		},
		{
			property: "og:description",
			content: "Role-based access for officers and capacity-building administrators."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./mcq-BO8Yd7BF.mjs");
var Route$2 = createFileRoute("/mcq")({
	head: () => ({ meta: [
		{ title: "AI MCQ Generator · PS 101" },
		{
			name: "description",
			content: "Upload PDF, DOCX or TXT training material, generate MCQs with AI, validate them on five checks and take the assessment in place."
		},
		{
			property: "og:title",
			content: "AI MCQ Generator · PS 101"
		},
		{
			property: "og:description",
			content: "From training material to validated assessment in one screen."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile-Dy2JpVq4.mjs");
var Route$1 = createFileRoute("/profile")({
	head: () => ({ meta: [
		{ title: "My Profile · PS 101" },
		{
			name: "description",
			content: "Officer profile, posting details, learning hours and competency summary."
		},
		{
			property: "og:title",
			content: "My Profile · PS 101"
		},
		{
			property: "og:description",
			content: "Posting details, learning hours and competency summary."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./progress-zxF07tTy.mjs");
var Route = createFileRoute("/progress")({
	head: () => ({ meta: [
		{ title: "Learning Progress · PS 101" },
		{
			name: "description",
			content: "Track enrolled iGOT courses, update completion and see how learning feeds back into your competency profile."
		},
		{
			property: "og:title",
			content: "Learning Progress · PS 101"
		},
		{
			property: "og:description",
			content: "Course completion tracking and the full closed-loop activity trail."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$11.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$12
	}),
	AdminRoute: Route$10.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$12
	}),
	AssessmentRoute: Route$9.update({
		id: "/assessment",
		path: "/assessment",
		getParentRoute: () => Route$12
	}),
	CompetenciesRoute: Route$8.update({
		id: "/competencies",
		path: "/competencies",
		getParentRoute: () => Route$12
	}),
	CoursesRoute: Route$7.update({
		id: "/courses",
		path: "/courses",
		getParentRoute: () => Route$12
	}),
	DashboardRoute: Route$6.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$12
	}),
	GapsRoute: Route$5.update({
		id: "/gaps",
		path: "/gaps",
		getParentRoute: () => Route$12
	}),
	LearningPathRoute: Route$4.update({
		id: "/learning-path",
		path: "/learning-path",
		getParentRoute: () => Route$12
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$12
	}),
	McqRoute: Route$2.update({
		id: "/mcq",
		path: "/mcq",
		getParentRoute: () => Route$12
	}),
	ProfileRoute: Route$1.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$12
	}),
	ProgressRoute: Route.update({
		id: "/progress",
		path: "/progress",
		getParentRoute: () => Route$12
	})
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
