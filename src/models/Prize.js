import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    position: {
      type: Number, // 1 to 10
      required: true,
      unique: true,
    },

    cashValue: {
      type: Number,
    },

    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Prize = mongoose.model("Prize", prizeSchema);

export default Prize;