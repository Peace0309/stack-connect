import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { AppShell } from "@/components/platform/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildGapRows, overallCompetency } from "@/lib/platform/engine";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile · PS 101" },
      {
        name: "description",
        content:
          "Officer profile, posting details, learning hours and competency summary.",
      },
      { property: "og:title", content: "My Profile · PS 101" },
      {
        property: "og:description",
        content: "Posting details, learning hours and competency summary.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, levels, enrollments, history } = usePlatform();
  const rows = useMemo(() => buildGapRows(levels), [levels]);
  const strengths = [...rows].sort((a, b) => b.current - a.current).slice(0, 4);

  const fields: [string, string][] = [
    ["Full name", profile.name],
    ["Designation", profile.designation],
    ["Division", profile.division],
    ["Department", profile.department],
    ["Grade", profile.grade],
    ["Station", profile.location],
    ["Official email", profile.email],
    ["Joined service", profile.joinedOn],
  ];

  return (
    <AppShell
      role="employee"
      title="My Profile"
      subtitle="Service record and learning summary"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Service details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-0.5 text-sm font-medium">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Learning summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overall competency</span>
              <span className="font-semibold">{overallCompetency(levels)} / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Learning hours</span>
              <span className="font-semibold">{profile.learningHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Enrolments</span>
              <span className="font-semibold">{enrollments.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-semibold">
                {enrollments.filter((e) => e.progress >= 100).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Strongest competencies</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {strengths.map((r) => (
              <Badge key={r.competency.id} variant="secondary">
                {r.competency.name} · L{r.current}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.slice(0, 6).map((h) => (
              <div key={h.id} className="border-l-2 border-accent pl-3">
                <p className="text-sm font-medium">{h.label}</p>
                <p className="text-xs text-muted-foreground">
                  {h.at} · {h.detail}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
