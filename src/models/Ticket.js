import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    raffleCode: {
      type: String,
      required: true,
      unique: true,
    },

    paymentId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "used", "invalid"],
      default: "active",
    },

    isWinner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;