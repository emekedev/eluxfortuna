import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/site/AuthLayout";
import { api } from "@/lib/api";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create your account — EluxFortuna" }] }),
  component: RegisterPage,
});

type Errors = Partial<Record<"fullName" | "email" | "phone" | "password" | "form", string>>;

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,16}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setLoading(true);
    try {
      // POST /api/auth/register
      const response = await api.post("/auth/register", {
  name: form.fullName,
  email: form.email,
  phone: form.phone,
  password: form.password,
});

const data = response.data;

window.localStorage.setItem("elux_token", data.token);
window.localStorage.setItem("elux_user", JSON.stringify(data.user));

navigate({
  to: data.user.role === "admin" ? "/admin" : "/dashboard",
});
    } catch (err: any) {
  const message =
    err.response?.data?.message || "Something went wrong.";

  setErrors({ form: message });
} finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your shot at premium prizes in under a minute."
      footer={<>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field label="Full name" error={errors.fullName}>
          <input
            className="input-field"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            className="input-field"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input
            className="input-field"
            placeholder="+234 800 000 0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <input
            type="password"
            className="input-field"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Field>
        {errors.form && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.form}</p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our terms and confirm you are 18+.
        </p>
      </form>
    </AuthLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
