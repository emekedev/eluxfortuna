import axios from "axios";


export const api = axios.create({
  baseURL: "https://eluxfortuna-api.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("elux_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
};

export type Ticket = {
  code: string;
  purchasedAt: string;
  status: "active" | "drawn" | "won";
};

export async function createPrize(data: {
  title: string;
  description: string;
  position: number;
  cashValue: number;
}) {
  const res = await api.post("/prizes", data);
  return res.data;
}

export async function getPrizes() {
  const res = await api.get("/prizes");
  return res.data;
}

export async function drawWinners() {
  const res = await api.post("/raffle/draw");
  return res.data;
}

export async function resetRaffle() {
  const res = await api.post("/raffle/reset");
  return res.data;
}

export type Prize = {
  _id: string;
  title: string;
  description: string;
  position: number;
  cashValue: number;
  isClaimed?: boolean;
};
