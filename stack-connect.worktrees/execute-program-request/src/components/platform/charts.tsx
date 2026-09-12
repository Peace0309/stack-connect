import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SEVERITY_COLORS } from "@/lib/platform/engine";
import type { GapRow } from "@/lib/platform/types";

export function CompetencyRadar({ rows }: { rows: GapRow[] }) {
  const data = rows.map((r) => ({
    subject: r.competency.name.length > 22
      ? `${r.competency.name.slice(0, 20)}…`
      : r.competency.name,
    current: r.current,
    required: r.required,
  }));

  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="hsl(220 15% 85%)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={{ fontSize: 10 }} />
          <Radar
            name="Required"
            dataKey="required"
            stroke="var(--color-chart-2)"
            fill="var(--color-chart-2)"
            fillOpacity={0.18}
          />
          <Radar
            name="Current"
            dataKey="current"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.35}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GapBars({ rows, limit = 10 }: { rows: GapRow[]; limit?: number }) {
  const data = [...rows]
    .filter((r) => r.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, limit)
    .map((r) => ({
      name: r.competency.name,
      gap: r.gap,
      fill: SEVERITY_COLORS[r.severity],
    }));

  if (!data.length) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        No gaps remaining — every competency meets its required level.
      </p>
    );
  }

  return (
    <div style={{ height: Math.max(220, data.length * 38) }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 24 }}>
          <CartesianGrid horizontal={false} stroke="hsl(220 15% 90%)" />
          <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={190}
            tick={{ fontSize: 11 }}
          />
          <Tooltip formatter={(v: number) => [`${v} level(s)`, "Gap"]} />
          <Bar dataKey="gap" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
