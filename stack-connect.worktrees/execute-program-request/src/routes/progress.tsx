import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/platform/AppShell";
import { KpiCard } from "@/components/platform/KpiCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { IGOT_COURSES } from "@/lib/platform/data";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Learning Progress · PS 101" },
      {
        name: "description",
        content:
          "Track enrolled iGOT courses, update completion and see how learning feeds back into your competency profile.",
      },
      { property: "og:title", content: "Learning Progress · PS 101" },
      {
        property: "og:description",
        content: "Course completion tracking and the full closed-loop activity trail.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { enrollments, setProgress, addLearningHours, profile, history } =
    usePlatform();

  const completed = enrollments.filter((e) => e.progress >= 100);
  const avg = enrollments.length
    ? Math.round(
        enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length,
      )
    : 0;

  return (
    <AppShell
      role="employee"
      title="Learning Progress"
      subtitle="Completing a course raises the competency levels it covers"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Enrolments" value={enrollments.length} />
        <KpiCard label="Completed" value={completed.length} />
        <KpiCard label="Average progress" value={`${avg}%`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">My courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {enrollments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No enrolments yet — enrol from the learning path or catalogue.
            </p>
          ) : null}
          {enrollments.map((e) => {
            const course = IGOT_COURSES.find((c) => c.id === e.courseId);
            if (!course) return null;
            return (
              <div key={e.courseId} className="rounded-md border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{course.code}</p>
                    <p className="text-sm font-semibold">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Enrolled {e.enrolledAt} · {course.durationHours} hours
                    </p>
                  </div>
                  {e.progress >= 100 ? (
                    <Badge variant="secondary">Completed</Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        setProgress(course.id, 100);
                        addLearningHours(course.durationHours);
                        toast.success("Course completed — competency profile updated.");
                      }}
                    >
                      Mark complete
                    </Button>
                  )}
                </div>
                <Progress value={e.progress} className="mt-3" />
                <div className="mt-3 flex items-center gap-3">
                  <Slider
                    value={[e.progress]}
                    max={100}
                    step={5}
                    onValueChange={(v) => setProgress(course.id, v[0] ?? 0)}
                    className="flex-1"
                  />
                  <span className="w-12 text-right text-xs text-muted-foreground">
                    {e.progress}%
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Closed-loop activity ({profile.learningHours} learning hours)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {history.map((h) => (
            <div key={h.id} className="border-l-2 border-accent pl-3">
              <p className="text-sm font-medium">{h.label}</p>
              <p className="text-xs text-muted-foreground">
                {h.at} · {h.detail}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
