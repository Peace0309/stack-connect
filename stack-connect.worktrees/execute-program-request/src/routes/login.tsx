import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePlatform } from "@/lib/platform/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · PS 101 Learning Platform" },
      {
        name: "description",
        content:
          "Sign in as an officer or administrator to the PS 101 AI-enabled learning platform.",
      },
      { property: "og:title", content: "Sign in · PS 101 Learning Platform" },
      {
        property: "og:description",
        content: "Role-based access for officers and capacity-building administrators.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = usePlatform();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (!user) {
      toast.error("Incorrect email or password");
      return;
    }
    toast.success(`Welcome, ${user.name}`);
    navigate({ to: user.role === "admin" ? "/admin" : "/dashboard" });
  };

  const fill = (kind: "employee" | "admin") => {
    setEmail(kind === "admin" ? "admin@demo.gov.in" : "employee@demo.gov.in");
    setPassword(kind === "admin" ? "Admin@123" : "Demo@123");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-sidebar px-5 py-4 text-sidebar-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold">
            SIH PS 101 · AI-Enabled Learning Platform
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <p className="text-sm text-muted-foreground">
              Role-based access for officers and administrators.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="email">Official email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@demo.gov.in"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>

            <div className="mt-6 space-y-2 rounded-md border bg-muted/50 p-4 text-sm">
              <p className="font-medium">Demo accounts</p>
              <button
                type="button"
                onClick={() => fill("employee")}
                className="block w-full rounded border bg-card px-3 py-2 text-left hover:bg-accent/20"
              >
                Officer — employee@demo.gov.in / Demo@123
              </button>
              <button
                type="button"
                onClick={() => fill("admin")}
                className="block w-full rounded border bg-card px-3 py-2 text-left hover:bg-accent/20"
              >
                Admin — admin@demo.gov.in / Admin@123
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
