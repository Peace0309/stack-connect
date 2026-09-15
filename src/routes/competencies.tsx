import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { AppShell } from "@/components/platform/AppShell";
import { CompetencyRadar } from "@/components/platform/charts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SEVERITY_COLORS, buildGapRows } from "@/lib/platform/engine";
import { usePlatform } from "@/lib/platform/store";
import { LEVEL_LABELS, type CompetencyCategory } from "@/lib/platform/types";

export const Route = createFileRoute("/competencies")({
  head: () => ({
    meta: [
      { title: "Competency Framework · StatConnect" },
      {
        name: "description",
        content:
          "Twenty role competencies across statistical, technical, digital governance and behavioural categories with current and required levels.",
      },
      { property: "og:title", content: "Competency Framework · StatConnect" },
      {
        property: "og:description",
        content: "Current versus required levels across the full competency framework.",
      },
    ],
  }),
  component: CompetenciesPage,
});

const CATEGORIES: CompetencyCategory[] = [
  "Statistical",
  "Technical",
  "Digital Governance",
  "Behavioural & Managerial",
];

function CompetenciesPage() {
  const { levels } = usePlatform();
  const rows = useMemo(() => buildGapRows(levels), [levels]);

  return (
    <AppShell
      role="employee"
      title="Competency Framework"
      subtitle="Current level against the level required for your role"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile overview</CardTitle>
        </CardHeader>
        <CardContent>
          <CompetencyRadar rows={rows} />
        </CardContent>
      </Card>

      {CATEGORIES.map((category) => {
        const items = rows.filter((r) => r.competency.category === category);
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-base">{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((r) => (
                <div key={r.competency.id} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{r.competency.name}</p>
                    <Badge
                      style={{
                        backgroundColor: SEVERITY_COLORS[r.severity],
                        color: "white",
                      }}
                    >
                      {r.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.competency.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={(r.current / 5) * 100} className="h-2 flex-1" />
                    <span className="w-44 text-right text-xs text-muted-foreground">
                      {LEVEL_LABELS[r.current]} (L{r.current}) · required L{r.required}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </AppShell>
  );
}
