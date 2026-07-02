import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/site/AuthLayout";
import { api } from "@/lib/api";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — EluxFortuna" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      // POST /api/auth/login
  const response = await api.post("/auth/login", {
  email: form.email,
  password: form.password,
});
console.log("LOGIN RESPONSE:", response.data);
const data = response.data;
console.log("TOKEN:", data.token);
console.log("USER:", data.user);

window.localStorage.setItem("elux_token", data.token);
window.localStorage.setItem("elux_user", JSON.stringify(data.user));
console.log("About to navigate...");
navigate({
  to: data.user.role === "admin" ? "/admin" : "/dashboard",
});

    } catch (err: any) {
  const message =
    err.response?.data?.message || "Login failed.";

  setError(message);
}  finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to view your tickets and raffle codes."
      footer={<>New to EluxFortuna? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Email</span>
          <input
            type="email"
            className="input-field"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Password</span>
          <input
            type="password"
            className="input-field"
            placeholder="Your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-[var(--color-primary)]"
            />
            Remember me
          </label>
          <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
        </div>
        {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
