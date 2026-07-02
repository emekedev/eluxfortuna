import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-elegant">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Elux<span className="text-gold">Fortuna</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#how" className="text-sm font-medium text-muted-foreground hover:text-foreground">How it works</a>
          <a href="/#prizes" className="text-sm font-medium text-muted-foreground hover:text-foreground">Prizes</a>
          <a href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">FAQ</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/dashboard" className="btn-outline text-sm">Dashboard</Link>
              <button
                onClick={() => { logout(); navigate({ to: "/" }); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-foreground hover:text-primary">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Register</Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-3 py-4">
            <a href="/#how" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">How it works</a>
            <a href="/#prizes" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Prizes</a>
            <a href="/#faq" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">FAQ</a>
            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn-outline">Dashboard</Link>
                  <button onClick={() => { logout(); setOpen(false); navigate({ to: "/" }); }} className="btn-outline">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline">Login</Link>
                  <Link to="/register" className="btn-primary">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
