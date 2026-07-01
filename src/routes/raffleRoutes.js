import express from "express";
import { drawWinners, resetRaffle } from "../controllers/raffleController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/draw", protect, authorizeRoles("admin"), drawWinners);

router.post(
  "/reset",
  protect,
  authorizeRoles("admin"),
  resetRaffle
);

export default router;