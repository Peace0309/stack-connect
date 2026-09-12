import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/mcq.functions-Dxg1qPKO.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = objectType({
	text: stringType().min(1),
	count: numberType().int().min(3).max(20),
	difficulty: enumType([
		"Easy",
		"Medium",
		"Hard"
	]),
	language: stringType().min(1),
	sourceName: stringType().min(1),
	competencyIds: arrayType(stringType()).min(1)
});
var generateMcqsWithAI_createServerFn_handler = createServerRpc({
	id: "35879ad628fead78799044f6b0616f7644fbf8eb353e770f1df08ca0662b4560",
	name: "generateMcqsWithAI",
	filename: "src/lib/mcq.functions.ts"
}, (opts) => generateMcqsWithAI.__executeServer(opts));
var generateMcqsWithAI = createServerFn({ method: "POST" }).inputValidator((input) => Input.parse(input)).handler(generateMcqsWithAI_createServerFn_handler, async ({ data }) => {
	const apiKey = processModule.env["LOVABLE_API_KEY"];
	if (!apiKey) return {
		ok: false,
		items: [],
		reason: "AI service is not configured."
	};
	const prompt = `You create multiple-choice questions for training officials of India's official statistical system.

Source material name: ${data.sourceName}
Difficulty: ${data.difficulty}
Language for the questions: ${data.language}
Allowed competency ids (choose the single best fit for each question): ${data.competencyIds.join(", ")}

Write exactly ${data.count} questions grounded ONLY in the material below.
Rules for every question: exactly 4 options, exactly one correct option, a one-sentence explanation, and a short verbatim excerpt from the material that supports the answer.

Return strict JSON of the form:
{"items":[{"competencyId":"...","question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"...","sourceExcerpt":"..."}]}

MATERIAL:
"""
${data.text.slice(0, 24e3)}
"""`;
	try {
		const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Lovable-API-Key": apiKey,
				"X-Lovable-AIG-SDK": "fetch"
			},
			body: JSON.stringify({
				model: "google/gemini-3.8-flash",
				messages: [{
					role: "system",
					content: "You are an assessment designer for government statistical training. Reply with json only."
				}, {
					role: "user",
					content: prompt
				}],
				response_format: { type: "json_object" }
			})
		});
		if (!res.ok) {
			const body = await res.text();
			return {
				ok: false,
				items: [],
				reason: res.status === 429 ? "AI service is busy (rate limited)." : res.status === 402 ? "AI credits are exhausted for this workspace." : `AI service error ${res.status}: ${body.slice(0, 200)}`
			};
		}
		const content = (await res.json()).choices?.[0]?.message?.content ?? "";
		const items = (JSON.parse(content).items ?? []).filter((i) => Array.isArray(i.options) && i.options.length === 4 && typeof i.correctIndex === "number" && i.correctIndex >= 0 && i.correctIndex < 4 && Boolean(i.question) && Boolean(i.explanation));
		if (!items.length) return {
			ok: false,
			items: [],
			reason: "AI returned no valid questions."
		};
		return {
			ok: true,
			items
		};
	} catch (error) {
		return {
			ok: false,
			items: [],
			reason: error instanceof Error ? error.message : "Unexpected AI failure."
		};
	}
});
//#endregion
export { generateMcqsWithAI_createServerFn_handler };
