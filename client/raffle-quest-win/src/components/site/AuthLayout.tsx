import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function AuthLayout({ title, subtitle, children, footer }: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container-page flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center justify-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-elegant">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">
              Elux<span className="text-gold">Fortuna</span>
            </span>
          </Link>
          <div className="card-elevated p-7 sm:p-8">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
