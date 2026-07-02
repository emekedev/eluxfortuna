import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Smartphone, Headphones, Tv, Wallet, ShieldCheck, Trophy, Ticket, UserPlus, Sparkles, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const steps = [
  { icon: UserPlus, title: "Create account", desc: "Sign up in under a minute with your name, email and phone." },
  { icon: Ticket, title: "Buy tickets", desc: "Each ticket is just ₦500. Buy as many as you like." },
  { icon: Sparkles, title: "Get raffle codes", desc: "Receive a unique raffle code for every ticket purchased." },
  { icon: ShieldCheck, title: "Wait for the draw", desc: "Live draws happen on schedule, fair and transparent." },
  { icon: Trophy, title: "Win prizes", desc: "Winners are notified by email and listed on the dashboard." },
];

const prizes = [
  { icon: Smartphone, name: "Redmi Android Phone", tag: "Grand Prize", desc: "Brand new Redmi smartphone — the headline prize for this draw." },
  { icon: Headphones, name: "Wireless Earbuds", tag: "Premium", desc: "Studio-grade noise-cancelling earbuds for the runners-up." },
  { icon: Tv, name: "32\" Smart TV", tag: "Featured", desc: "A sleek smart TV upgrade for your living room." },
  { icon: Wallet, name: "Cash Prize ₦100,000", tag: "Cash", desc: "Cold cash, transferred directly to your bank account." },
];

const faqs = [
  { q: "How much is one ticket?", a: "Every ticket costs ₦500. You can buy as many tickets as you like from your dashboard." },
  { q: "How are winners selected?", a: "Winners are drawn from the pool of active raffle codes using a verifiable random process on the announced draw date." },
  { q: "How will I be notified if I win?", a: "Winners are notified via email and phone, and your status is updated instantly on your dashboard." },
  { q: "Can I get a refund?", a: "Tickets are non-refundable once purchased, as each ticket is immediately entered into the active draw." },
  { q: "Is EluxFortuna safe to use?", a: "Yes. Your account is secured and payments are processed through verified providers." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <GrandPrize />
      <HowItWorks />
      <Prizes />
      <Faq />
      <CtaBanner />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(900px 500px at 70% -10%, color-mix(in oklab, var(--gold) 22%, transparent), transparent), radial-gradient(800px 500px at 10% 10%, color-mix(in oklab, var(--primary-glow) 15%, transparent), transparent)" }}
      />
      <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Premium raffle, transparent draws
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Win Premium Prizes for Just <span className="text-gold">₦500</span> Per Ticket
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Join the EluxFortuna raffle draw for a chance to win smartphones, gadgets, appliances, and cash prizes — all from a single, low-cost ticket.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register" className="btn-primary">Register now</Link>
            <Link to="/login" className="btn-outline">Login</Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            <Stat label="Tickets sold" value="120K+" />
            <Stat label="Winners" value="2,400+" />
            <Stat label="Cash paid" value="₦80M" />
          </dl>
        </div>
        <div className="relative">
          <div className="card-elevated relative mx-auto max-w-md overflow-hidden p-1">
            <div
              className="rounded-[calc(var(--radius)+2px)] p-8"
              style={{ background: "linear-gradient(160deg, var(--primary) 0%, var(--primary-glow) 100%)" }}
            >
              <div className="flex items-center justify-between text-primary-foreground/80">
                <span className="text-xs font-semibold uppercase tracking-wider">Grand Prize</span>
                <Trophy className="h-5 w-5 text-gold" />
              </div>
              <div className="mt-8 grid h-44 place-items-center rounded-xl bg-primary-foreground/5">
                <Smartphone className="h-24 w-24 text-gold" strokeWidth={1.2} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-primary-foreground">
                Brand New Redmi Android Phone
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Latest model, sealed in box. Yours when your raffle code is drawn.
              </p>
              <div className="mt-6 flex items-center justify-between rounded-lg bg-primary-foreground/10 px-4 py-3">
                <span className="text-xs text-primary-foreground/70">Ticket price</span>
                <span className="font-display text-lg font-bold text-gold">₦500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold text-foreground">{value}</dd>
    </div>
  );
}

function GrandPrize() {
  return (
    <section className="container-page py-10">
      <div className="card-elevated grid gap-6 overflow-hidden p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">This week's headline</p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">A brand-new Redmi smartphone is waiting for one lucky winner.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Every ₦500 ticket is a real chance. Buy one, buy ten — the more codes you hold, the higher your odds.</p>
        </div>
        <Link to="/register" className="btn-gold whitespace-nowrap">Claim your shot</Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">How it works</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Five simple steps to your win</h2>
        <p className="mt-3 text-muted-foreground">Designed to be effortless. Register, buy your tickets, and let the draw do the rest.</p>
      </div>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="card-elevated relative p-6 transition-transform hover:-translate-y-1">
            <span className="absolute right-4 top-4 font-display text-xs font-bold text-muted-foreground">0{i + 1}</span>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="bg-secondary py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Prizes</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Premium prizes, real winners</h2>
          <p className="mt-3 text-muted-foreground">From flagship phones to direct cash — here's what's on the table.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {prizes.map((p) => (
            <article key={p.name} className="card-elevated group overflow-hidden transition-shadow hover:shadow-elegant">
              <div
                className="grid h-40 place-items-center"
                style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 96%, transparent) 0%, var(--primary-glow) 100%)" }}
              >
                <p.icon className="h-16 w-16 text-gold transition-transform group-hover:scale-110" strokeWidth={1.2} />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold-foreground">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Questions, answered</h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
        {faqs.map((f, i) => (
          <button
            key={f.q}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full px-6 py-5 text-left"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-base font-semibold">{f.q}</h3>
              <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </div>
            {open === i && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="container-page pb-4">
      <div
        className="overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16"
        style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 100%)" }}
      >
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
          Your raffle code could be the next winner.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">
          Sign up now, grab a few tickets, and you're in. It's that simple.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="btn-gold">Create your account</Link>
          <Link to="/login" className="btn-outline border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">Login</Link>
        </div>
      </div>
    </section>
  );
}
