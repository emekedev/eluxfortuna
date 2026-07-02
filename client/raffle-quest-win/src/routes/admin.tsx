import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/site/DashboardShell";
import { useAuth } from "@/lib/use-auth";
import { ShieldCheck } from "lucide-react";
import { createPrize, getPrizes, drawWinners, resetRaffle } from "@/lib/api";
import type { Prize } from "@/lib/api";
import axios from 'axios'

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — EluxFortuna" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    if (!ready) return;
    if (!user) navigate({ to: "/login" });
    else if (user.role !== "admin") navigate({ to: "/dashboard" });
  }, [ready, user, navigate]);

  if (!ready || !user || user.role !== "admin") return null;

  async function handleCreatePrize() {
  setLoading(true);
  setMessage("");

  try {
    const response = await createPrize({
      title: "Samsung s20 ultra",
      description: "6th grand prize",
      position: 6,
      cashValue: 1000000,
    });

    setMessage(response.message || "Prize created successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
    setMessage(
      error.response?.data?.message || "Request failed"
    );
  } else {
    setMessage("Failed to create prize");
  }
  } finally {
    setLoading(false);
  }
}

async function handleViewPrizes() {
  setLoading(true);
  setMessage("");

  try {
    const response = await getPrizes();

    setPrizes(response.prizes);
    setMessage("Prizes loaded successfully");
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Failed to fetch prizes"
    );
  } finally {
    setLoading(false);
  }
}

async function handleRunDraw() {
  setLoading(true);
  setMessage("");

  try {
    const response = await drawWinners();

    setWinners(response.winners);
    setMessage("Draw completed successfully");
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : "Draw failed"
    );
  } finally {
    setLoading(false);
  }
}

async function handleResetRaffle() {
  setLoading(true);
  setMessage("");

  try {
    const response = await resetRaffle();

    setPrizes([]);
    setWinners([]);
    setMessage(response.message || "Raffle reset successfully");
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : "Reset failed"
    );
  } finally {
    setLoading(false);
  }
}



  return (
    <DashboardShell>
       <section className="card-elevated p-8">
    <div className="flex items-center gap-4">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-foreground">
        <ShieldCheck className="h-6 w-6" />
      </span>

      <div>
        <h1 className="font-display text-2xl font-bold">Admin Console</h1>
        <p className="text-sm text-muted-foreground">
          Welcome, {user.name}
        </p>
      </div>
    </div>
  </section>

  <section className="mt-6 grid gap-4 sm:grid-cols-2">
    <button
  className="btn-primary p-5"
  onClick={handleCreatePrize}
  disabled={loading}
>
  {loading ? "Creating..." : "Create Prize"}
</button>
{message && (
  <p className="mt-4 rounded-md bg-green-100 px-4 py-3 text-sm text-green-700">
    {message}
  </p>
)}
   <button
  className="btn-primary p-5"
  onClick={handleViewPrizes}
>
  View Prizes
</button>

{prizes.length > 0 && (
  <div className="mt-6 space-y-3">
    {prizes.map((prize) => (
      <div key={prize._id} className="rounded border p-4">
        <p><strong>Position:</strong> {prize.position}</p>
        <p><strong>Title:</strong> {prize.title}</p>
        <p><strong>Value:</strong> ₦{prize.cashValue}</p>
      </div>
    ))}
  </div>
)}
<button
  className="btn-primary p-5"
  onClick={handleRunDraw}
  disabled={loading}
>
  {loading ? "Drawing..." : "Run Draw"}
</button>

{winners.length > 0 && (
  <div className="mt-6 space-y-3">
    <h2 className="text-xl font-bold">Winners</h2>

    {winners.map((winner) => (
      <div
        key={winner._id}
        className="rounded-lg border p-4"
      >
        <p><strong>Raffle Code:</strong> {winner.raffleCode}</p>
        <p><strong>Position:</strong> {winner.position}</p>
        <p><strong>User ID:</strong> {winner.userId}</p>
      </div>
    ))}
  </div>
)}

    <button
  className="btn-outline p-5"
  onClick={handleResetRaffle}
  disabled={loading}
>
  {loading ? "Resetting..." : "Reset Raffle"}
</button>
  </section>
    </DashboardShell>
  );
}
