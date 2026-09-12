import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { AppShell } from "@/components/platform/AppShell";
import { GapBars } from "@/components/platform/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SEVERITY_COLORS, buildGapRows } from "@/lib/platform/engine";
import { usePlatform } from "@/lib/platform/store";
import type { GapSeverity } from "@/lib/platform/types";

export const Route = createFileRoute("/gaps")({
  head: () => ({
    meta: [
      { title: "AI Skill-Gap Detection · PS 101" },
      {
        name: "description",
        content:
          "Detected competency gaps ranked from Critical to Low, comparing assessed levels with role-required levels.",
      },
      { property: "og:title", content: "AI Skill-Gap Detection · PS 101" },
      {
        property: "og:description",
        content: "Gap severity across all twenty competencies with recommended action.",
      },
    ],
  }),
  component: GapsPage,
});

const ORDER: GapSeverity[] = ["Critical", "High", "Medium", "Low", "No Gap"];

function GapsPage() {
  const { levels, assessmentTaken } = usePlatform();
  const rows = useMemo(
    () =>
      buildGapRows(levels).sort(
        (a, b) => b.gap - a.gap || a.competency.name.localeCompare(b.competency.name),
      ),
    [levels],
  );

  const counts = ORDER.map((severity) => ({
    severity,
    count: rows.filter((r) => r.severity === severity).length,
  }));

  return (
    <AppShell
      role="employee"
      title="Skill Gaps"
      subtitle={
        assessmentTaken
          ? "Computed from your latest assessment and completed learning"
          : "Computed from your baseline profile — take the assessment for measured levels"
      }
    >
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {counts.map((c) => (
          <Card key={c.severity}>
            <CardContent className="p-4">
              <span
                className="inline-block h-2 w-10 rounded-full"
                style={{ backgroundColor: SEVERITY_COLORS[c.severity] }}
              />
              <p className="mt-2 text-2xl font-semibold">{c.count}</p>
              <p className="text-xs text-muted-foreground">{c.severity}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gap magnitude</CardTitle>
        </CardHeader>
        <CardContent>
          <GapBars rows={rows} limit={20} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Detailed gap analysis</CardTitle>
          <Button asChild size="sm">
            <Link to="/learning-path">Get recommendations</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competency</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Current</TableHead>
                <TableHead className="text-center">Required</TableHead>
                <TableHead className="text-center">Gap</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.competency.id}>
                  <TableCell className="font-medium">{r.competency.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.competency.category}
                  </TableCell>
                  <TableCell className="text-center">L{r.current}</TableCell>
                  <TableCell className="text-center">L{r.required}</TableCell>
                  <TableCell className="text-center">{r.gap}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: SEVERITY_COLORS[r.severity],
                        color: "white",
                      }}
                    >
                      {r.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
