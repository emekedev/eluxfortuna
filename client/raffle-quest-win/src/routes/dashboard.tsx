import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/site/DashboardShell";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/use-auth";
import type { Ticket as TTicket } from "@/lib/api";
import { Ticket, CheckCircle2, Trophy, Plus, Copy } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EluxFortuna" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, ready } = useAuth();
  console.log("AUTH USER:", user);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    api.get("/tickets/my-tickets")
  .then((response) => {
    const backendTickets = response.data.tickets;

    const formattedTickets = backendTickets.map((ticket: any) => ({
      code: ticket.raffleCode,
      purchasedAt: ticket.createdAt,
      status:
        ticket.isWinner ? "won"
        : ticket.status === "used" ? "drawn"
        : "active",
    }));

    setTickets(formattedTickets);
    setLoading(false);
  })
  .catch((error) => {
    console.error(error);
    setLoading(false);
  });
  }, [ready, user, navigate]);

  if (!ready || !user) return null;

  const total = tickets.length;
  const active = tickets.filter((t) => t.status === "active").length;
  const wins = tickets.filter((t) => t.status === "won").length;
  const winningStatus = wins > 0 ? `${wins} winning code${wins > 1 ? "s" : ""}` : "No wins yet";

  return (
    <DashboardShell>
      <section className="card-elevated overflow-hidden">
        <div
          className="flex flex-col gap-4 p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8"
          style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">Welcome back</p>
            <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{user.name}</h1>
            <p className="mt-1 text-sm text-primary-foreground/75">Here's a snapshot of your raffle activity.</p>
          </div>
          <Link to="/purchase" className="btn-gold whitespace-nowrap">
            <Plus className="h-4 w-4" /> Purchase tickets
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-5 sm:grid-cols-3">
        <StatCard icon={Ticket} label="Total tickets" value={total} accent="primary" />
        <StatCard icon={CheckCircle2} label="Active tickets" value={active} accent="primary" />
        <StatCard icon={Trophy} label="Winning status" value={winningStatus} accent="gold" />
      </section>

      <section className="mt-8 card-elevated">
        <div className="flex items-center justify-between border-b border-border p-5 sm:p-6">
          <div>
            <h2 className="font-display text-lg font-bold">Your raffle codes</h2>
            <p className="text-sm text-muted-foreground">Every ticket gets a unique code entered into the next draw.</p>
          </div>
          <Link to="/purchase" className="btn-outline hidden sm:inline-flex">Buy more</Link>
        </div>
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading tickets…</p>
        ) : tickets.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y divide-border">
            {tickets.map((t) => (
              <li key={t.code} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm font-semibold">{t.code}</p>
                  <p className="text-xs text-muted-foreground">
                    Purchased {new Date(t.purchasedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status={t.status} />
                  <button
                    onClick={() => navigator.clipboard?.writeText(t.code)}
                    className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                    aria-label="Copy code"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </DashboardShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  accent: "primary" | "gold";
}) {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between">
        <span
          className={`grid h-11 w-11 place-items-center rounded-lg ${
            accent === "gold" ? "bg-gold/15 text-gold-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: TTicket["status"] }) {
  const map = {
    active: "bg-primary/10 text-primary",
    drawn: "bg-muted text-muted-foreground",
    won: "bg-gold/20 text-gold-foreground",
  } as const;
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
        <Ticket className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold">No tickets yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">Buy your first ticket to receive a raffle code.</p>
      <Link to="/purchase" className="btn-primary mt-5 inline-flex">
        <Plus className="h-4 w-4" /> Purchase tickets
      </Link>
    </div>
  );
}
