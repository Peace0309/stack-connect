globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AppShell-BA3qNCKs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c1-BWjP9Uxm48JiDFNxy+iONbNxhj0\"",
		"mtime": "2026-09-11T05:58:43.231Z",
		"size": 5569,
		"path": "../public/assets/AppShell-BA3qNCKs.js"
	},
	"/assets/admin-BDf2Dipn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4373-MWgsIyqLrZIgLh5Fqfuf3ZjnmLE\"",
		"mtime": "2026-09-11T05:58:43.242Z",
		"size": 17267,
		"path": "../public/assets/admin-BDf2Dipn.js"
	},
	"/assets/badge-H-Tqe0UP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"302-urIclfdaFYh85p0ixJ2Q3Ygp0FU\"",
		"mtime": "2026-09-11T05:58:43.246Z",
		"size": 770,
		"path": "../public/assets/badge-H-Tqe0UP.js"
	},
	"/assets/assessment-CLtJcNhl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c73-8250WY8NoAZOTZnejd2gf5/PP3E\"",
		"mtime": "2026-09-11T05:58:43.244Z",
		"size": 3187,
		"path": "../public/assets/assessment-CLtJcNhl.js"
	},
	"/assets/charts-COyR2h3t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3525-6pvIg4gI2PQ6QFNly+LXDR3xUqU\"",
		"mtime": "2026-09-11T05:58:43.248Z",
		"size": 13605,
		"path": "../public/assets/charts-COyR2h3t.js"
	},
	"/assets/circle-x-CcHWY99s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-W8wlgqaAWRem4bZmkSozGPF++I4\"",
		"mtime": "2026-09-11T05:58:43.250Z",
		"size": 322,
		"path": "../public/assets/circle-x-CcHWY99s.js"
	},
	"/assets/card-APn1n5g-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8093-JQEvifwiqu+ikFcIPjgiQrbquww\"",
		"mtime": "2026-09-11T05:58:43.248Z",
		"size": 32915,
		"path": "../public/assets/card-APn1n5g-.js"
	},
	"/assets/competencies-DSyZCZxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"735-6Ff8ErYGcRuWmc0262LioDITOaE\"",
		"mtime": "2026-09-11T05:58:43.252Z",
		"size": 1845,
		"path": "../public/assets/competencies-DSyZCZxY.js"
	},
	"/assets/courses-D_cEIaS9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e58-aN1R+OOvgHd+bXNowN1iNekBQK4\"",
		"mtime": "2026-09-11T05:58:43.254Z",
		"size": 3672,
		"path": "../public/assets/courses-D_cEIaS9.js"
	},
	"/assets/dashboard-CmjHKfLW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ebb-V2xfQCxKLpdp0NkEdjSLWugDIcA\"",
		"mtime": "2026-09-11T05:58:43.300Z",
		"size": 3771,
		"path": "../public/assets/dashboard-CmjHKfLW.js"
	},
	"/assets/dist-BSGcW4OF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6d-rwJFWk7j9ZtkxwV/lLqLCx2MmBc\"",
		"mtime": "2026-09-11T05:58:43.302Z",
		"size": 10861,
		"path": "../public/assets/dist-BSGcW4OF.js"
	},
	"/assets/dist-BUdsr2Cn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6db-A0BdgfDh/ullw2iX4XRG+u6xrMM\"",
		"mtime": "2026-09-11T05:58:43.304Z",
		"size": 1755,
		"path": "../public/assets/dist-BUdsr2Cn.js"
	},
	"/assets/dist-gAwsg__C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"298-8Byv+g4YP7Pu/3pqI47OfTUkOBo\"",
		"mtime": "2026-09-11T05:58:43.305Z",
		"size": 664,
		"path": "../public/assets/dist-gAwsg__C.js"
	},
	"/assets/engine-C0bMcAa4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65c-6TWa3XHrqD/VzT1xurRd+OP5pDg\"",
		"mtime": "2026-09-11T05:58:43.305Z",
		"size": 1628,
		"path": "../public/assets/engine-C0bMcAa4.js"
	},
	"/assets/BarChart-CdO2uovi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5db6c-8GrWusQajsFrVzGAHrMcUMqpLMQ\"",
		"mtime": "2026-09-11T05:58:43.238Z",
		"size": 383852,
		"path": "../public/assets/BarChart-CdO2uovi.js"
	},
	"/assets/gaps-Da38iO6w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1031-0lhKMW637lBAZeU4ELYG9k+xEkM\"",
		"mtime": "2026-09-11T05:58:43.307Z",
		"size": 4145,
		"path": "../public/assets/gaps-Da38iO6w.js"
	},
	"/assets/gauge-lKYk9lJe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a-iNq0TKwsv7a+RbecE0Y7At/kkBI\"",
		"mtime": "2026-09-11T05:58:43.309Z",
		"size": 282,
		"path": "../public/assets/gauge-lKYk9lJe.js"
	},
	"/assets/input-4J9JumUg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"266-iGZGdwGiC9h6YfWcol6Mt8+Dumk\"",
		"mtime": "2026-09-11T05:58:43.311Z",
		"size": 614,
		"path": "../public/assets/input-4J9JumUg.js"
	},
	"/assets/KpiCard-DfmYit3s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d7-XwOfU5PVBxrJYpYOe2YrIfX+8UY\"",
		"mtime": "2026-09-11T05:58:43.240Z",
		"size": 727,
		"path": "../public/assets/KpiCard-DfmYit3s.js"
	},
	"/assets/label-BgnlPFzM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6-7xty3nvgoRntmb010giMbo8c0wQ\"",
		"mtime": "2026-09-11T05:58:43.314Z",
		"size": 678,
		"path": "../public/assets/label-BgnlPFzM.js"
	},
	"/assets/login-CBs4mGo4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a06-HsvlPLrRcRMFR3N4DsOyjgwgUqo\"",
		"mtime": "2026-09-11T05:58:43.321Z",
		"size": 2566,
		"path": "../public/assets/login-CBs4mGo4.js"
	},
	"/assets/learning-path-D5NtZ1_6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8b-1Pw8Er3Zw9Yg7uzRuAUzm2E8NhA\"",
		"mtime": "2026-09-11T05:58:43.316Z",
		"size": 2955,
		"path": "../public/assets/learning-path-D5NtZ1_6.js"
	},
	"/assets/mcq-kRpA3K8e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8c-2jfv/Vgn8SGv/mlQgX/bV7TpHhM\"",
		"mtime": "2026-09-11T05:58:43.325Z",
		"size": 16268,
		"path": "../public/assets/mcq-kRpA3K8e.js"
	},
	"/assets/profile-CSFrvc6I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bef-p+kmG+RsB+rQGNao/jYAdyGeDrE\"",
		"mtime": "2026-09-11T05:58:43.329Z",
		"size": 3055,
		"path": "../public/assets/profile-CSFrvc6I.js"
	},
	"/assets/index-DYEFJ9k9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b09b-beZpUKrbyyUbn0r2Is7IJKqHoN0\"",
		"mtime": "2026-09-11T05:58:43.231Z",
		"size": 438427,
		"path": "../public/assets/index-DYEFJ9k9.js"
	},
	"/assets/progress-BHmqjeJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3239-7RmgW0in7TmnITuBbxXyiGQE+ZM\"",
		"mtime": "2026-09-11T05:58:43.329Z",
		"size": 12857,
		"path": "../public/assets/progress-BHmqjeJM.js"
	},
	"/assets/routes-DI7LAnPx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bad-71xTEKj+JDsZIqA8eRaC5Aq0xLA\"",
		"mtime": "2026-09-11T05:58:43.337Z",
		"size": 7085,
		"path": "../public/assets/routes-DI7LAnPx.js"
	},
	"/assets/progress-C0VLmbT1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e9-Hvjm6n05au/+BgGhuEC7c2rRjwY\"",
		"mtime": "2026-09-11T05:58:43.331Z",
		"size": 2281,
		"path": "../public/assets/progress-C0VLmbT1.js"
	},
	"/assets/select-B2Zq2OJ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11cf9-qXZXIcvNdQLN4IWOfl4WfuVi4y0\"",
		"mtime": "2026-09-11T05:58:43.339Z",
		"size": 72953,
		"path": "../public/assets/select-B2Zq2OJ7.js"
	},
	"/assets/styles-CiQZOqtn.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"12bae-JLVsKUGjosfuZy2tgVwBbYRyLZ0\"",
		"mtime": "2026-09-11T05:58:43.357Z",
		"size": 76718,
		"path": "../public/assets/styles-CiQZOqtn.css"
	},
	"/assets/target-eeeIdgo1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"755-du6dD7KLeNG9Ahbs8mABjxAasQ4\"",
		"mtime": "2026-09-11T05:58:43.357Z",
		"size": 1877,
		"path": "../public/assets/target-eeeIdgo1.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ZMi5qD = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ZMi5qD
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
