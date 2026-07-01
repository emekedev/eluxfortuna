import express from "express";
import { createPrize, getPrizes } from "../controllers/prizeController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createPrize);
router.get("/", protect, authorizeRoles("admin"), getPrizes);

export default router;