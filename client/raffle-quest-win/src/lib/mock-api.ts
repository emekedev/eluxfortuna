// Mock API service — replace with real backend later.
// Endpoints mirrored: POST /api/auth/register, POST /api/auth/login, POST /api/tickets/purchase
import type { User, Ticket } from "./api";

const LS_USERS = "elux_users";
const LS_TICKETS = "elux_tickets";
const LS_SESSION = "elux_session";
const LS_TOKEN = "elux_token";

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function genCode() {
  return "EF-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export const TICKET_PRICE = 500;

export const mockApi = {
  async register(input: { fullName: string; email: string; phone: string; password: string }) {
    await delay();
    const users = read<(User & { password: string })[]>(LS_USERS, []);
    if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const role: "user" | "admin" = input.email.toLowerCase().includes("admin") ? "admin" : "user";
    const user: User & { password: string } = {
      id: crypto.randomUUID(),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      password: input.password,
      role,
    };
    users.push(user);
    write(LS_USERS, users);
    const { password: _p, ...safe } = user;
    const token = "mock." + user.id;
    write(LS_SESSION, safe);
    window.localStorage.setItem(LS_TOKEN, token);
    return { user: safe, token };
  },

  async login(input: { email: string; password: string }) {
    await delay();
    const users = read<(User & { password: string })[]>(LS_USERS, []);
    const found = users.find(
      (u) => u.email.toLowerCase() === input.email.toLowerCase() && u.password === input.password,
    );
    if (!found) throw new Error("Invalid email or password.");
    const { password: _p, ...safe } = found;
    const token = "mock." + found.id;
    write(LS_SESSION, safe);
    window.localStorage.setItem(LS_TOKEN, token);
    return { user: safe, token };
  },

  logout() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(LS_SESSION);
    window.localStorage.removeItem(LS_TOKEN);
  },

  getSession(): User | null {
    return read<User | null>(LS_SESSION, null);
  },

  async getTickets(userId: string): Promise<Ticket[]> {
    await delay(200);
    const all = read<Record<string, Ticket[]>>(LS_TICKETS, {});
    return all[userId] ?? [];
  },

  async purchaseTickets(userId: string, quantity: number) {
    await delay();
    if (quantity < 1) throw new Error("Quantity must be at least 1.");
    const all = read<Record<string, Ticket[]>>(LS_TICKETS, {});
    const list = all[userId] ?? [];
    const newTickets: Ticket[] = Array.from({ length: quantity }).map(() => ({
      code: genCode(),
      purchasedAt: new Date().toISOString(),
      status: "active",
    }));
    all[userId] = [...list, ...newTickets];
    write(LS_TICKETS, all);
    return { tickets: newTickets, total: quantity * TICKET_PRICE };
  },
};
