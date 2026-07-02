import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-gold-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              Elux<span className="text-gold">Fortuna</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Nigeria's premium raffle experience. Win premium prizes for just ₦500 per ticket.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><a href="/#how" className="hover:text-gold">How it works</a></li>
            <li><a href="/#prizes" className="hover:text-gold">Prizes</a></li>
            <li><a href="/#faq" className="hover:text-gold">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Account</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/login" className="hover:text-gold">Login</Link></li>
            <li><Link to="/register" className="hover:text-gold">Register</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} EluxFortuna. All rights reserved.</p>
          <p>Play responsibly. 18+ only.</p>
        </div>
      </div>
    </footer>
  );
}
