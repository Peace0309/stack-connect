import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ExternalLink, Loader2, Upload, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/platform/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateMcqsWithAI } from "@/lib/mcq.functions";
import { COMPETENCIES, competencyById } from "@/lib/platform/data";
import { extractText } from "@/lib/platform/extract";
import { generateMockMCQs } from "@/lib/platform/mcq-mock";
import { usePlatform } from "@/lib/platform/store";
import type { GeneratedMCQ, ValidationResult } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mcq")({
  head: () => ({
    meta: [
      { title: "AI MCQ Generator · PS 101" },
      {
        name: "description",
        content:
          "Upload PDF, DOCX or TXT training material, generate MCQs with AI, validate them on five checks and take the assessment in place.",
      },
      { property: "og:title", content: "AI MCQ Generator · PS 101" },
      {
        property: "og:description",
        content: "From training material to validated assessment in one screen.",
      },
    ],
  }),
  component: McqPage,
});

function validate(q: GeneratedMCQ): ValidationResult {
  return {
    fourOptions: q.options.length === 4,
    singleCorrect:
      q.correctIndex >= 0 &&
      q.correctIndex < q.options.length &&
      new Set(q.options.map((o) => o.trim())).size === q.options.length,
    hasExplanation: q.explanation.trim().length > 10,
    sourceLinked: q.sourceExcerpt.trim().length > 20,
    competencyDetected: Boolean(competencyById(q.competencyId)),
  };
}

const CHECK_LABELS: [keyof ValidationResult, string][] = [
  ["fourOptions", "Exactly 4 options"],
  ["singleCorrect", "Single unambiguous answer"],
  ["hasExplanation", "Explanation present"],
  ["sourceLinked", "Linked to source excerpt"],
  ["competencyDetected", "Competency detected"],
];

function McqPage() {
  const { questions, materialName, setQuestions, updateQuestion, applyMcqResults } =
    usePlatform();

  const [file, setFile] = useState<File | null>(null);
  const [count, setCount] = useState("6");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [language, setLanguage] = useState("English");
  const [busy, setBusy] = useState(false);
  const [engine, setEngine] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scored, setScored] = useState<{ correct: number; total: number } | null>(null);
  const [sourceFileUrl, setSourceFileUrl] = useState<string | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string | null>(null);
  const sourceUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    };
  }, []);

  const sourceHref = (excerpt: string) => {
    if (!sourceFileUrl) return null;
    const snippet = excerpt.trim().split(/\s+/).slice(0, 8).join(" ");
    return `${sourceFileUrl}#page=1&search=${encodeURIComponent(snippet)}`;
  };

  const generate = async () => {
    if (!file) {
      toast.error("Choose a PDF, DOCX or TXT file first.");
      return;
    }
    setBusy(true);
    setScored(null);
    setAnswers({});
    try {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      const objectUrl = URL.createObjectURL(file);
      sourceUrlRef.current = objectUrl;
      setSourceFileUrl(objectUrl);
      setSourceFileName(file.name);

      const text = await extractText(file);
      const n = Number(count);
      let produced: GeneratedMCQ[] | null = null;

      if (text.length > 200) {
        const res = await generateMcqsWithAI({
          data: {
            text,
            count: n,
            difficulty,
            language,
            sourceName: file.name,
            competencyIds: COMPETENCIES.map((c) => c.id),
          },
        });
        if (res.ok && res.items.length) {
          produced = res.items.map((item, i) => ({
            id: `mcq-${i + 1}`,
            competencyId: competencyById(item.competencyId)
              ? item.competencyId
              : "data-quality",
            question: item.question,
            options: item.options,
            correctIndex: item.correctIndex,
            explanation: item.explanation,
            sourceExcerpt: item.sourceExcerpt,
            difficulty,
            language,
          }));
          setEngine("AI generation (Lovable AI Gateway)");
        } else if (res.reason) {
          toast.message("Using deterministic generator", { description: res.reason });
        }
      }

      if (!produced) {
        produced = generateMockMCQs(text, n, difficulty, language, file.name);
        setEngine("Deterministic offline generator");
      }

      setQuestions(produced, file.name);
      toast.success(`${produced.length} questions generated and validated.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  };

  const submitTest = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Answer every question before submitting.");
      return;
    }
    const per: Record<string, { correct: number; total: number }> = {};
    let correct = 0;
    for (const q of questions) {
      const bucket = (per[q.competencyId] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      if (answers[q.id] === q.correctIndex) {
        bucket.correct += 1;
        correct += 1;
      }
    }
    applyMcqResults(per);
    setScored({ correct, total: questions.length });
    toast.success("Competency profile and recommendations updated.");
  };

  return (
    <AppShell
      role="employee"
      title="AI MCQ Generator"
      subtitle="Upload material → generate → test → review answers → update competencies"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">1. Upload learning material</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="file">File (PDF, DOCX, TXT)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.docx,.txt,.md,.csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <p className="text-xs text-muted-foreground">
                {file.name} · {(file.size / 1024).toFixed(0)} KB
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Questions</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["4", "6", "8", "10"].map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(v) => setDifficulty(v as typeof difficulty)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="md:col-span-2">
            <Button onClick={generate} disabled={busy}>
              {busy ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Generate questions
            </Button>
            {engine ? (
              <span className="ml-3 text-xs text-muted-foreground">
                Engine: {engine}
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {questions.length ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                2. Take the assessment — {questions.length} questions from{" "}
                {materialName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="rounded-md border p-4">
                  <p className="text-sm font-medium">
                    {index + 1}. {q.question}
                  </p>
                  <div className="mt-2 space-y-2">
                    {q.options.map((opt, i) => {
                      const chosen = answers[q.id] === i;
                      const reveal = Boolean(scored);
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={Boolean(scored)}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                          className={cn(
                            "block w-full rounded-md border px-3 py-2 text-left text-sm",
                            !reveal && chosen && "border-primary bg-secondary",
                            reveal && i === q.correctIndex && "border-green-600 bg-green-50",
                            reveal &&
                              chosen &&
                              i !== q.correctIndex &&
                              "border-destructive bg-red-50",
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {scored ? (
                <p className="text-sm font-semibold">
                  Score {scored.correct}/{scored.total} — competency profile and
                  recommendations recalculated. See the review below for explanations.
                </p>
              ) : (
                <Button onClick={submitTest}>Submit and update competencies</Button>
              )}
            </CardContent>
          </Card>

          {scored ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  3. Review, edit and validate — answers and explanations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {questions.map((q, index) => {
                  const checks = validate(q);
                  const passed = Object.values(checks).filter(Boolean).length;
                  return (
                    <div key={q.id} className="rounded-md border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">
                          Q{index + 1} · {competencyById(q.competencyId)?.name} ·{" "}
                          {q.difficulty} · {q.language}
                        </p>
                        <Badge variant={passed === 5 ? "secondary" : "destructive"}>
                          Validation {passed}/5
                        </Badge>
                      </div>

                      <Textarea
                        className="mt-3"
                        value={q.question}
                        onChange={(e) =>
                          updateQuestion({ ...q, question: e.target.value })
                        }
                      />

                      <div className="mt-3 space-y-2">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuestion({ ...q, correctIndex: i })}
                              className={cn(
                                "h-5 w-5 shrink-0 rounded-full border",
                                q.correctIndex === i && "bg-primary",
                              )}
                              aria-label={`Mark option ${i + 1} correct`}
                            />
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const options = [...q.options];
                                options[i] = e.target.value;
                                updateQuestion({ ...q, options });
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      <Textarea
                        className="mt-3"
                        value={q.explanation}
                        onChange={(e) =>
                          updateQuestion({ ...q, explanation: e.target.value })
                        }
                      />
                      <p className="mt-2 rounded bg-muted p-2 text-xs text-muted-foreground">
                        Source excerpt:{" "}
                        <mark className="rounded bg-yellow-200 px-0.5 underline decoration-yellow-600">
                          {q.sourceExcerpt}
                        </mark>
                      </p>
                      {sourceFileUrl ? (
                        <a
                          href={sourceHref(q.sourceExcerpt) ?? sourceFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary underline underline-offset-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Open {sourceFileName} and find this text
                        </a>
                      ) : null}

                      <div className="mt-3 flex flex-wrap gap-3 text-xs">
                        {CHECK_LABELS.map(([key, label]) => (
                          <span key={key} className="flex items-center gap-1">
                            {checks[key] ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-700" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-destructive" />
                            )}
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : null}
        </>
      ) : null}
    </AppShell>
  );
}