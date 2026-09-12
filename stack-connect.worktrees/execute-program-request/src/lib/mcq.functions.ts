import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  text: z.string().min(1),
  count: z.number().int().min(3).max(20),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  language: z.string().min(1),
  sourceName: z.string().min(1),
  competencyIds: z.array(z.string()).min(1),
});

export interface AiMcq {
  competencyId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceExcerpt: string;
}

export const generateMcqsWithAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<{ ok: boolean; items: AiMcq[]; reason?: string }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false, items: [], reason: "AI service is not configured." };

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
${data.text.slice(0, 24000)}
"""`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "google/gemini-3.8-flash",
          messages: [
            {
              role: "system",
              content:
                "You are an assessment designer for government statistical training. Reply with json only.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        return {
          ok: false,
          items: [],
          reason:
            res.status === 429
              ? "AI service is busy (rate limited)."
              : res.status === 402
                ? "AI credits are exhausted for this workspace."
                : `AI service error ${res.status}: ${body.slice(0, 200)}`,
        };
      }

      const payload = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = payload.choices?.[0]?.message?.content ?? "";
      const parsed = JSON.parse(content) as { items?: AiMcq[] };
      const items = (parsed.items ?? []).filter(
        (i) =>
          Array.isArray(i.options) &&
          i.options.length === 4 &&
          typeof i.correctIndex === "number" &&
          i.correctIndex >= 0 &&
          i.correctIndex < 4 &&
          Boolean(i.question) &&
          Boolean(i.explanation),
      );
      if (!items.length) return { ok: false, items: [], reason: "AI returned no valid questions." };
      return { ok: true, items };
    } catch (error) {
      return {
        ok: false,
        items: [],
        reason: error instanceof Error ? error.message : "Unexpected AI failure.",
      };
    }
  });
