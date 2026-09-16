import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/platform/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RECOMMENDATION_WEIGHTS, recommendCourses } from "@/lib/platform/engine";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/learning-path")({
  head: () => ({
    meta: [
      { title: "Personalised Learning Path · StatConnect" },
      {
        name: "description",
        content:
          "Weighted course recommendations ranked by skill gap, role relevance, learning history, difficulty match and department priority.",
      },
      { property: "og:title", content: "Personalised Learning Path · StatConnect" },
      {
        property: "og:description",
        content: "Your ranked iGOT Karmayogi learning path with transparent scoring.",
      },
    ],
  }),
  component: LearningPathPage,
});

function LearningPathPage() {
  const { levels, enrollments, enroll } = usePlatform();
  const enrolledIds = enrollments.map((e) => e.courseId);
  const completedIds = enrollments
    .filter((e) => e.progress >= 100)
    .map((e) => e.courseId);

  const recs = useMemo(
    () => recommendCourses(levels, completedIds, enrolledIds).slice(0, 8),
    [levels, completedIds, enrolledIds],
  );

  return (
    <AppShell
      role="employee"
      title="Personalised Learning Path"
      subtitle="Six-factor weighted recommendation engine, recomputed after every assessment"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Scoring model</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {RECOMMENDATION_WEIGHTS.map((w) => (
            <Badge key={w.key} variant="secondary">
              {w.label} · {Math.round(w.weight * 100)}%
            </Badge>
          ))}
        </CardContent>
      </Card>

      {recs.map((r, index) => (
        <Card key={r.course.id}>
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  #{index + 1} · {r.course.code} · {r.course.provider}
                </p>
                <h3 className="mt-1 text-base font-semibold">{r.course.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {r.course.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{r.course.format}</span>
                  <span>· {r.course.durationHours} hours</span>
                  <span>· Level {r.course.level}</span>
                  <span>· ★ {r.course.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold">{r.score}%</p>
                <p className="text-xs text-muted-foreground">match score</p>
                {enrolledIds.includes(r.course.id) ? (
                  <Badge className="mt-2" variant="secondary">
                    Enrolled
                  </Badge>
                ) : (
                  <Button
                    className="mt-2"
                    size="sm"
                    onClick={() => {
                      enroll(r.course.id);
                      toast.success("Enrolled via mock iGOT API");
                    }}
                  >
                    Enrol
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {RECOMMENDATION_WEIGHTS.map((w) => (
                <div key={w.key}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{w.label}</span>
                    <span>{Math.round((r.components[w.key] ?? 0) * 100)}%</span>
                  </div>
                  <Progress
                    value={(r.components[w.key] ?? 0) * 100}
                    className="mt-1 h-1.5"
                  />
                </div>
              ))}
            </div>

            {r.targetedGaps.filter((g) => g.gap > 0).length ? (
              <div className="flex flex-wrap gap-2">
                {r.targetedGaps
                  .filter((g) => g.gap > 0)
                  .map((g) => (
                    <Badge key={g.competency.id} variant="outline">
                      Closes {g.competency.name} gap of {g.gap}
                    </Badge>
                  ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </AppShell>
  );
}
