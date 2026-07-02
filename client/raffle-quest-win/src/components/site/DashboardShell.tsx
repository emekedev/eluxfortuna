import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, LayoutDashboard, Ticket, LogOut } from "lucide-react";
import { useAuth } from "@/lib/use-auth";

export function DashboardShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              Elux<span className="text-gold">Fortuna</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link to="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/purchase" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
              <Ticket className="h-4 w-4" /> Buy tickets
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold leading-tight">{user.fullName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
            <button
              onClick={() => { logout(); navigate({ to: "/login" }); }}
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
