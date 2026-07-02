import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import prizeRoutes from "./routes/prizeRoutes.js";
import raffleRoutes from "./routes/raffleRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://eluxfortuna-dev.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/prizes", prizeRoutes);
app.use("/api/raffle", raffleRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Raffle API running"
  });
});

export default app;