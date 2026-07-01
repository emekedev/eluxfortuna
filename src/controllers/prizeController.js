import Prize from "../models/Prize.js";

export const createPrize = async (req, res) => {
  try {
    const { title, description, position, cashValue } = req.body;

    const existingPrize = await Prize.findOne({ position });

    if (existingPrize) {
      return res.status(400).json({
        success: false,
        message: "Prize position already exists",
      });
    }

    const prize = await Prize.create({
      title,
      description,
      position,
      cashValue,
    });

    res.status(201).json({
      success: true,
      prize,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
       message: "New prize added to draw successfully",
      message: error.message,
    });
  }
};

export const getPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find().sort({ position: 1 });

    res.json({
      success: true,
      prizes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};