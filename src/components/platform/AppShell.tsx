import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  Radar as RadarIcon,
  Target,
  UserRound,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { usePlatform } from "@/lib/platform/store";
import { cn } from "@/lib/utils";

const EMPLOYEE_NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My Profile", icon: UserRound },
  { to: "/competencies", label: "Competencies", icon: RadarIcon },
  { to: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { to: "/gaps", label: "Skill Gaps", icon: Target },
  { to: "/learning-path", label: "Learning Path", icon: GraduationCap },
  { to: "/courses", label: "iGOT Catalogue", icon: BookOpen },
  { to: "/mcq", label: "MCQ Generator", icon: FileQuestion },
  { to: "/mcq-offline", label: "Offline MCQ", icon: FileQuestion },
  { to: "/progress", label: "Progress", icon: LineChart },
] as const;

const ADMIN_NAV = [
  { to: "/admin", label: "Workforce Dashboard", icon: BarChart3 },
] as const;

export function AppShell({
  role,
  title,
  subtitle,
  children,
}: {
  role: "employee" | "admin";
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { user, logout } = usePlatform();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (user === null) navigate({ to: "/login", replace: true });
    else if (user.role !== role)
      navigate({ to: user.role === "admin" ? "/admin" : "/dashboard", replace: true });
  }, [user, role, navigate]);

  if (!user || user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking your sign-in…
      </div>
    );
  }

  const nav = role === "admin" ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-primary">
            SIH PS 101
          </p>
          <p className="mt-1 text-sm font-semibold leading-tight">
            AI-Enabled Learning Platform
          </p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">
            Official Statistical System
          </p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4 text-xs text-sidebar-foreground/70">
          <p className="font-semibold text-sidebar-foreground">{user.name}</p>
          <p>{user.designation}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-card px-5 py-4">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-foreground">{title}</h1>
            {subtitle ? (
              <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {role === "admin" ? "Administrator" : "Officer"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate({ to: "/login", replace: true });
              }}
            >
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b bg-card px-3 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium",
                pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 p-5">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
