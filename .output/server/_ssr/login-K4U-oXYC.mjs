import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as CardTitle, i as CardHeader, n as Card, r as CardContent, t as Button } from "./card-B3QIWrqf.mjs";
import { n as usePlatform } from "./store-CJU7xTKe.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-qlB7OtzP.mjs";
import { t as Label } from "./label-D8Jh45Tz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-K4U-oXYC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login } = usePlatform();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		const user = login(email, password);
		if (!user) {
			toast.error("Incorrect email or password");
			return;
		}
		toast.success(`Welcome, ${user.name}`);
		navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
	};
	const fill = (kind) => {
		setEmail(kind === "admin" ? "admin@demo.gov.in" : "employee@demo.gov.in");
		setPassword(kind === "admin" ? "Admin@123" : "Demo@123");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b bg-sidebar px-5 py-4 text-sidebar-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm font-semibold",
					children: "SIH PS 101 · AI-Enabled Learning Platform"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center justify-center px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sign in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Role-based access for officers and administrators."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Official email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								autoComplete: "username",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "employee@demo.gov.in",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							children: "Sign in"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-2 rounded-md border bg-muted/50 p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Demo accounts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fill("employee"),
							className: "block w-full rounded border bg-card px-3 py-2 text-left hover:bg-accent/20",
							children: "Officer — employee@demo.gov.in / Demo@123"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fill("admin"),
							className: "block w-full rounded border bg-card px-3 py-2 text-left hover:bg-accent/20",
							children: "Admin — admin@demo.gov.in / Admin@123"
						})
					]
				})] })]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
