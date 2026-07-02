import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/site/DashboardShell";
import { api } from "@/lib/api";;
import { useAuth } from "@/lib/use-auth";
import { Minus, Plus, Ticket, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/purchase")({
  head: () => ({ meta: [{ title: "Buy tickets — EluxFortuna" }] }),
  component: Purchase,
});

const formatNgn = (n: number) => "₦" + n.toLocaleString("en-NG");

function Purchase() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ codes: string[]; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  const TICKET_PRICE = 500;
  const total = useMemo(() => qty * TICKET_PRICE, [qty]);
  if (!ready || !user) return null;

  function setSafeQty(n: number) {
    if (Number.isNaN(n)) n = 1;
    setQty(Math.max(1, Math.min(500, Math.floor(n))));
  }

  async function buy() {
  setError(null);
  setLoading(true);

  try {
    // Step 1: initialize payment
    const purchaseResponse = await api.post("/tickets/purchase", {
      quantity: qty,
    });

    const payment = purchaseResponse.data.payment;

    console.log("PAYMENT:", payment);

    // Step 2: verify payment (mock payment success)
    const verifyResponse = await api.post(
      `/tickets/verify-payment/${payment._id}`
    );

    console.log("VERIFY RESPONSE:", verifyResponse.data);

    const tickets = verifyResponse.data.tickets;

    setSuccess({
      codes: tickets.map((ticket: any) => ticket.raffleCode),
      total: payment.amount,
    });
  } catch (e: any) {
    console.error(e);

    setError(
      e?.response?.data?.message ||
        "Purchase failed."
    );
  } finally {
    setLoading(false);
  }
}
  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Buy tickets</p>
          <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Add raffle codes to your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Every ticket is {formatNgn(TICKET_PRICE)} and gives you one unique raffle code in the next draw.
          </p>
        </header>

        {success ? (
          <section className="card-elevated mt-8 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border bg-gold/10 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/30 text-gold-foreground">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">Purchase confirmed</h2>
                <p className="text-sm text-muted-foreground">
                  {success.codes.length} ticket{success.codes.length > 1 ? "s" : ""} • {formatNgn(success.total)}
                </p>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {success.codes.map((c) => (
                <li key={c} className="flex items-center gap-3 px-5 py-3 font-mono text-sm">
                  <Ticket className="h-4 w-4 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 border-t border-border p-5">
              <Link to="/dashboard" className="btn-primary">Go to dashboard</Link>
              <button
                onClick={() => { setSuccess(null); setQty(1); }}
                className="btn-outline"
              >
                Buy more tickets
              </button>
            </div>
          </section>
        ) : (
          <section className="card-elevated mt-8 p-6 sm:p-8">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Number of tickets</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSafeQty(qty - 1)}
                  className="grid h-11 w-11 place-items-center rounded-md border border-border hover:bg-secondary"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={qty}
                  onChange={(e) => setSafeQty(parseInt(e.target.value, 10))}
                  className="input-field text-center font-display text-xl font-bold"
                />
                <button
                  type="button"
                  onClick={() => setSafeQty(qty + 1)}
                  className="grid h-11 w-11 place-items-center rounded-md border border-border hover:bg-secondary"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[1, 3, 5, 10, 20].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSafeQty(n)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      qty === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {n} tickets
                  </button>
                ))}
              </div>
            </label>

            <div className="mt-6 space-y-2 rounded-xl bg-secondary p-5">
              <Row label="Ticket price" value={formatNgn(TICKET_PRICE)} />
              <Row label="Quantity" value={`× ${qty}`} />
              <div className="my-2 h-px bg-border" />
              <Row label="Total" value={formatNgn(total)} emphasis />
            </div>

            {error && <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

            <button onClick={buy} disabled={loading} className="btn-primary mt-6 w-full">
              {loading ? "Processing…" : `Buy ${qty} ticket${qty > 1 ? "s" : ""} • ${formatNgn(total)}`}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Payments are simulated for MVP testing. Real payment gateway integration comes next.
            </p>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={emphasis ? "text-sm font-semibold" : "text-sm text-muted-foreground"}>{label}</span>
      <span className={emphasis ? "font-display text-xl font-bold text-primary" : "text-sm font-semibold"}>{value}</span>
    </div>
  );
}
