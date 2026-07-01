import express from "express";
import protect from "../middleware/authMiddleware.js";
import { purchaseTickets, verifyPaymentAndGenerateTickets,getMyTickets,} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/purchase", protect, purchaseTickets);
router.post("/verify-payment/:paymentId", protect, verifyPaymentAndGenerateTickets);
router.get("/my-tickets", protect, getMyTickets);

export default router;