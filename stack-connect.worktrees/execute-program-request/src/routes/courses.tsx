import { createFileRoute } from "@tanstack/react-router";
import { Server } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/platform/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPETENCIES, IGOT_COURSES, competencyById } from "@/lib/platform/data";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "iGOT Karmayogi Catalogue · PS 101" },
      {
        name: "description",
        content:
          "Browse and enrol in mock iGOT Karmayogi courses mapped to the official statistics competency framework.",
      },
      { property: "og:title", content: "iGOT Karmayogi Catalogue · PS 101" },
      {
        property: "og:description",
        content: "Sixteen competency-mapped courses with enrolment via a mock API.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { enrollments, enroll } = usePlatform();
  const [query, setQuery] = useState("");
  const [competency, setCompetency] = useState("all");
  const [format, setFormat] = useState("all");

  const filtered = useMemo(
    () =>
      IGOT_COURSES.filter((c) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.provider.toLowerCase().includes(q);
        const matchesCompetency =
          competency === "all" || c.competencyIds.includes(competency);
        const matchesFormat = format === "all" || c.format === format;
        return matchesQuery && matchesCompetency && matchesFormat;
      }),
    [query, competency, format],
  );

  return (
    <AppShell
      role="employee"
      title="iGOT Karmayogi Catalogue"
      subtitle={`${IGOT_COURSES.length} competency-mapped courses`}
    >
      <div className="flex items-start gap-3 rounded-md border border-accent bg-accent/10 p-4 text-sm">
        <Server className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <span className="font-semibold">Mock iGOT API.</span> Catalogue and
          enrolment calls are served by the prototype&apos;s mock iGOT Karmayogi
          service. In production these map to the live iGOT course and enrolment
          endpoints.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Input
          placeholder="Search title, code or provider"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={competency} onValueChange={setCompetency}>
          <SelectTrigger>
            <SelectValue placeholder="Competency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All competencies</SelectItem>
            {COMPETENCIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger>
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All formats</SelectItem>
            <SelectItem value="Self-paced">Self-paced</SelectItem>
            <SelectItem value="Blended">Blended</SelectItem>
            <SelectItem value="Instructor-led">Instructor-led</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((course) => {
          const enrolled = enrollments.some((e) => e.courseId === course.id);
          return (
            <Card key={course.id}>
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {course.code} · {course.provider}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.competencyIds.map((id) => (
                    <Badge key={id} variant="outline">
                      {competencyById(id)?.name ?? id}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>{course.format}</span>
                  <span>{course.durationHours} h</span>
                  <span>Level {course.level}</span>
                  <span>★ {course.rating}</span>
                  <span>{course.learners.toLocaleString("en-IN")} learners</span>
                </div>
                <div className="mt-auto pt-1">
                  {enrolled ? (
                    <Badge variant="secondary">Enrolled</Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        enroll(course.id);
                        toast.success(`Enrolled in ${course.title}`);
                      }}
                    >
                      Enrol via iGOT
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
