import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  ClipboardCheck,
  GraduationCap,
  RefreshCw,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COMPETENCIES, IGOT_COURSES } from "@/lib/platform/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StatConnect AI-Enabled Learning Platform for Official Statistics" },
      {
        name: "description",
        content:
          "A closed-loop capacity building platform: assess competencies, detect skill gaps with AI, recommend iGOT courses, learn, and re-assess.",
      },
      {
        property: "og:title",
        content: "StatConnect AI-Enabled Learning Platform for Official Statistics",
      },
      {
        property: "og:description",
        content:
          "Assess, diagnose, recommend, learn and re-assess — capacity building for India's official statistical system.",
      },
    ],
  }),
  component: Landing,
});

const LOOP = [
  {
    icon: ClipboardCheck,
    title: "Assess",
    body: "A 15-question competency assessment mapped to 20 role competencies across statistical, technical, digital-governance and behavioural areas.",
  },
  {
    icon: Brain,
    title: "Diagnose",
    body: "The skill-gap engine compares assessed levels against role-required levels and classifies each gap from Low to Critical.",
  },
  {
    icon: Target,
    title: "Recommend",
    body: "A six-factor weighted model ranks iGOT Karmayogi courses by gap severity, role relevance, history, difficulty fit and priority.",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    body: "Enrol in recommended courses, track progress, and turn any PDF/DOCX/TXT training material into validated MCQs.",
  },
  {
    icon: RefreshCw,
    title: "Assess Again",
    body: "In-place tests and course completions update the competency profile, which instantly refreshes the recommendations.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-primary">
              StatConnect
            </p>
            <p className="text-sm font-semibold">
              AI-Enabled Learning Platform · Official Statistical System
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </header>

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Capacity building, closed loop
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Every official statistician gets a learning path built from their own
              competency data.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Profile, assessment, AI skill-gap detection, personalised iGOT
              Karmayogi recommendations, progress tracking and AI-generated
              assessments from your own training material — in one continuous loop.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/login">Enter the platform</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">View admin analytics</Link>
              </Button>
            </div>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-t pt-6">
              <div>
                <dt className="text-xs text-muted-foreground">Competencies mapped</dt>
                <dd className="text-2xl font-semibold">{COMPETENCIES.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">iGOT courses</dt>
                <dd className="text-2xl font-semibold">{IGOT_COURSES.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Officials tracked</dt>
                <dd className="text-2xl font-semibold">1,250</dd>
              </div>
            </dl>
          </div>

          <Card className="border-2">
            <CardContent className="space-y-4 p-6">
              <p className="text-sm font-semibold text-foreground">
                Demo credentials
              </p>
              <div className="rounded-md border bg-muted/50 p-4 text-sm">
                <p className="font-medium">Officer</p>
                <p className="text-muted-foreground">employee@demo.gov.in</p>
                <p className="text-muted-foreground">Demo@123</p>
              </div>
              <div className="rounded-md border bg-muted/50 p-4 text-sm">
                <p className="font-medium">Administrator</p>
                <p className="text-muted-foreground">admin@demo.gov.in</p>
                <p className="text-muted-foreground">Admin@123</p>
              </div>
              <p className="text-xs text-muted-foreground">
                iGOT course data is served from a mock catalogue API for the
                prototype.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">The core closed loop</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Assess → Diagnose → Recommend → Learn → Assess Again. Every step writes
          back into the competency profile, so the next recommendation is always
          based on the latest evidence.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {LOOP.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary p-2 text-primary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted-foreground">
          Prototype built for Smart India Hackathon Problem Statement 101 ·
          Ministry of Statistics &amp; Programme Implementation.
        </div>
      </footer>
    </div>
  );
}
