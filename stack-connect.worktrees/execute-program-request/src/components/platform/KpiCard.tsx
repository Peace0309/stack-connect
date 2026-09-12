import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        {Icon ? (
          <span className="rounded-md bg-secondary p-2 text-secondary-foreground">
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
