import mongoose from "mongoose";

const raffleSettingsSchema = new mongoose.Schema(
  {
    salesOpen: {
      type: Boolean,
      default: true,
    },

    drawCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const RaffleSettings = mongoose.model(
  "RaffleSettings",
  raffleSettingsSchema
);

export default RaffleSettings;