import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock, Gauge, Target } from "lucide-react";
import { useMemo } from "react";

import { AppShell } from "@/components/platform/AppShell";
import { KpiCard } from "@/components/platform/KpiCard";
import { CompetencyRadar, GapBars } from "@/components/platform/charts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IGOT_COURSES } from "@/lib/platform/data";
import {
  buildGapRows,
  overallCompetency,
  recommendCourses,
} from "@/lib/platform/engine";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Officer Dashboard · StatConnect" },
      {
        name: "description",
        content:
          "Competency KPIs, radar profile and prioritised skill gaps for the signed-in statistical officer.",
      },
      { property: "og:title", content: "Officer Dashboard · StatConnect" },
      {
        property: "og:description",
        content: "Your competency snapshot, gaps and next recommended learning.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { levels, profile, enrollments, assessmentTaken, lastAssessment } =
    usePlatform();

  const rows = useMemo(() => buildGapRows(levels), [levels]);
  const critical = rows.filter((r) => r.gap >= 3).length;
  const overall = overallCompetency(levels);
  const completed = enrollments.filter((e) => e.progress >= 100);
  const recs = useMemo(
    () =>
      recommendCourses(
        levels,
        completed.map((e) => e.courseId),
        enrollments.map((e) => e.courseId),
      ).slice(0, 3),
    [levels, enrollments, completed],
  );

  return (
    <AppShell
      role="employee"
      title={`Namaste, ${profile.name.split(" ")[0]}`}
      subtitle={`${profile.designation} · ${profile.division}`}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Overall competency"
          value={`${overall} / 5`}
          hint={assessmentTaken ? "Based on latest assessment" : "Baseline profile"}
          icon={Gauge}
        />
        <KpiCard
          label="Critical / high gaps"
          value={critical}
          hint={`${rows.filter((r) => r.gap > 0).length} competencies below target`}
          icon={Target}
        />
        <KpiCard
          label="Active enrolments"
          value={enrollments.length}
          hint={`${completed.length} completed`}
          icon={BookOpen}
        />
        <KpiCard
          label="Learning hours"
          value={profile.learningHours}
          hint="Financial year to date"
          icon={Clock}
        />
      </div>

      {!assessmentTaken ? (
        <Card className="border-accent">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-semibold">Start the closed loop</p>
              <p className="text-sm text-muted-foreground">
                Take the 15-question competency assessment so the skill-gap engine
                can work from measured evidence instead of the baseline profile.
              </p>
            </div>
            <Button asChild>
              <Link to="/assessment">Take assessment</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-muted-foreground">
              Last assessment scored{" "}
              <span className="font-semibold text-foreground">
                {lastAssessment?.correct}/{lastAssessment?.total}
              </span>{" "}
              on {lastAssessment?.at}.
            </p>
            <Button asChild variant="outline">
              <Link to="/assessment">Re-take assessment</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Competency radar</CardTitle>
          </CardHeader>
          <CardContent>
            <CompetencyRadar rows={rows} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top skill gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <GapBars rows={rows} limit={8} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recommended next courses</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/learning-path">View full path</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {recs.map((r) => (
            <div key={r.course.id} className="rounded-md border p-4">
              <p className="text-xs text-muted-foreground">{r.course.code}</p>
              <p className="mt-1 text-sm font-semibold leading-snug">
                {r.course.title}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Match score {r.score}%
              </p>
              <Progress value={r.score} className="mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Course data served from the mock iGOT Karmayogi catalogue API (
        {IGOT_COURSES.length} courses).
      </p>
    </AppShell>
  );
}
