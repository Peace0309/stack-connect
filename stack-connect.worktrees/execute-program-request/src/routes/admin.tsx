import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, ClipboardList, Gauge, Users } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/platform/AppShell";
import { KpiCard } from "@/components/platform/KpiCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPETENCIES, DEPARTMENTS } from "@/lib/platform/data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Workforce Analytics · PS 101" },
      {
        name: "description",
        content:
          "Capacity-building analytics across 1,250 officials: competency distribution, critical gaps and emerging skills demand.",
      },
      { property: "og:title", content: "Workforce Analytics · PS 101" },
      {
        property: "og:description",
        content: "Department-wise competency distribution and emerging skills analytics.",
      },
    ],
  }),
  component: AdminPage,
});

const DEPT_STATS = [
  { dept: "Official Statistics Division", officials: 320, avg: 3.4, critical: 41, hours: 18.6, attempts: 512 },
  { dept: "National Accounts Division", officials: 180, avg: 3.1, critical: 33, hours: 15.2, attempts: 268 },
  { dept: "Price Statistics Division", officials: 145, avg: 3.2, critical: 22, hours: 14.1, attempts: 210 },
  { dept: "Field Operations Division", officials: 265, avg: 2.8, critical: 68, hours: 11.7, attempts: 341 },
  { dept: "Data Informatics & Innovation", officials: 130, avg: 3.7, critical: 12, hours: 22.4, attempts: 224 },
  { dept: "State Directorates of Economics & Statistics", officials: 210, avg: 2.6, critical: 79, hours: 9.8, attempts: 288 },
];

const EMERGING_SKILLS = [
  { skill: "AI / Machine Learning", demand: 92, supply: 34 },
  { skill: "Big Data & Alternative Sources", demand: 84, supply: 41 },
  { skill: "Python for Data Analysis", demand: 88, supply: 52 },
  { skill: "GIS & Geospatial", demand: 71, supply: 38 },
  { skill: "Data Visualisation", demand: 76, supply: 58 },
  { skill: "Cyber Security & Data Protection", demand: 80, supply: 47 },
];

const LEVEL_DISTRIBUTION = [
  { name: "Beginner", value: 168, fill: "hsl(0 72% 50%)" },
  { name: "Basic", value: 291, fill: "hsl(20 90% 52%)" },
  { name: "Intermediate", value: 437, fill: "hsl(38 92% 50%)" },
  { name: "Advanced", value: 268, fill: "hsl(196 60% 45%)" },
  { name: "Expert", value: 86, fill: "hsl(152 55% 40%)" },
];

function AdminPage() {
  const [dept, setDept] = useState(DEPARTMENTS[0]!);

  const scope = useMemo(
    () =>
      dept === "All Departments"
        ? DEPT_STATS
        : DEPT_STATS.filter((d) => d.dept === dept),
    [dept],
  );

  const officials = scope.reduce((s, d) => s + d.officials, 0);
  const critical = scope.reduce((s, d) => s + d.critical, 0);
  const attempts = scope.reduce((s, d) => s + d.attempts, 0);
  const avg =
    Math.round(
      (scope.reduce((s, d) => s + d.avg * d.officials, 0) / (officials || 1)) * 10,
    ) / 10;
  const hours =
    Math.round(
      (scope.reduce((s, d) => s + d.hours * d.officials, 0) / (officials || 1)) * 10,
    ) / 10;

  return (
    <AppShell
      role="admin"
      title="Workforce Capacity Analytics"
      subtitle="Ministry of Statistics & Programme Implementation"
    >
      <div className="max-w-sm">
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Officials" value={officials.toLocaleString("en-IN")} icon={Users} />
        <KpiCard label="Avg competency" value={`${avg} / 5`} icon={Gauge} />
        <KpiCard label="Critical gaps" value={critical} icon={AlertTriangle} />
        <KpiCard label="Avg learning hours" value={hours} icon={Clock} />
        <KpiCard label="Assessment attempts" value={attempts} icon={ClipboardList} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Competency level distribution (officials)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEVEL_DISTRIBUTION}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                  >
                    {LEVEL_DISTRIBUTION.map((d) => (
                      <Cell key={d.name} fill={d.fill} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Emerging skills: demand vs current capability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EMERGING_SKILLS} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid vertical={false} stroke="hsl(220 15% 90%)" />
                  <XAxis
                    dataKey="skill"
                    tick={{ fontSize: 9 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="demand" name="Demand index" fill="var(--color-chart-2)" />
                  <Bar dataKey="supply" name="Capability index" fill="var(--color-chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Department-wise capacity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scope.map((d) => (
            <div key={d.dept} className="rounded-md border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{d.dept}</p>
                <p className="text-xs text-muted-foreground">
                  {d.officials} officials · {d.critical} critical gaps · {d.hours} avg
                  hours · {d.attempts} attempts
                </p>
              </div>
              <Progress value={(d.avg / 5) * 100} className="mt-2 h-2" />
              <p className="mt-1 text-xs text-muted-foreground">
                Average competency {d.avg} / 5
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Framework coverage: {COMPETENCIES.length} competencies monitored across the
        statistical workforce.
      </p>
    </AppShell>
  );
}
