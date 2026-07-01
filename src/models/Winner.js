import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prize",
      required: true,
    },

    raffleCode: {
      type: String,
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    drawDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;