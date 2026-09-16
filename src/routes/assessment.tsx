import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/platform/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ASSESSMENT_QUESTIONS, competencyById } from "@/lib/platform/data";
import { usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Competency Assessment · StatConnect" },
      {
        name: "description",
        content:
          "A 15-question competency assessment covering sampling, survey design, data quality, Python, SQL, GIS, AI/ML and cyber security.",
      },
      { property: "og:title", content: "Competency Assessment · StatConnect" },
      {
        property: "og:description",
        content: "Programmatically scored assessment that updates your competency profile.",
      },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const { applyAssessment } = usePlatform();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ correct: number; total: number } | null>(null);

  const answered = Object.keys(answers).length;
  const total = ASSESSMENT_QUESTIONS.length;

  const submit = () => {
    if (answered < total) {
      toast.error(`Answer all ${total} questions before submitting.`);
      return;
    }
    const perCompetency: Record<string, { correct: number; total: number }> = {};
    let correct = 0;
    for (const q of ASSESSMENT_QUESTIONS) {
      const bucket = (perCompetency[q.competencyId] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      if (answers[q.id] === q.correctIndex) {
        bucket.correct += 1;
        correct += 1;
      }
    }
    applyAssessment(perCompetency, correct, total);
    setResult({ correct, total });
    setSubmitted(true);
    toast.success("Assessment scored — competency profile updated.");
  };

  return (
    <AppShell
      role="employee"
      title="Competency Assessment"
      subtitle={`${total} questions · scored programmatically against the competency framework`}
    >
      {submitted && result ? (
        <Card className="border-accent">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-lg font-semibold">
                Score: {result.correct} / {result.total} (
                {Math.round((result.correct / result.total) * 100)}%)
              </p>
              <p className="text-sm text-muted-foreground">
                Your competency levels and recommendations have been recalculated.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/gaps">See skill gaps</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/learning-path">Learning path</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-[240px] flex-1">
              <p className="text-sm font-medium">
                {answered} of {total} answered
              </p>
              <Progress value={(answered / total) * 100} className="mt-2" />
            </div>
            <Button onClick={submit}>Submit assessment</Button>
          </CardContent>
        </Card>
      )}

      {ASSESSMENT_QUESTIONS.map((q, index) => {
        const chosen = answers[q.id];
        const competency = competencyById(q.competencyId);
        return (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold leading-snug">
                {index + 1}. {q.prompt}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Competency: {competency?.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((option, i) => {
                const isChosen = chosen === i;
                const isCorrect = i === q.correctIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      !submitted && isChosen && "border-primary bg-secondary",
                      !submitted && !isChosen && "hover:bg-muted",
                      submitted && isCorrect && "border-green-600 bg-green-50",
                      submitted && isChosen && !isCorrect && "border-destructive bg-red-50",
                    )}
                  >
                    {submitted && isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-green-700" />
                    ) : submitted && isChosen ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border" />
                    )}
                    {option}
                  </button>
                );
              })}
              {submitted ? (
                <p className="pt-1 text-xs text-muted-foreground">{q.explanation}</p>
              ) : null}
            </CardContent>
          </Card>
        );
      })}

      {!submitted ? (
        <div className="flex justify-end">
          <Button onClick={submit}>Submit assessment</Button>
        </div>
      ) : null}
    </AppShell>
  );
}
