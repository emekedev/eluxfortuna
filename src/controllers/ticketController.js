import Ticket from "../models/Ticket.js";
import Payment from "../models/Payment.js";
import generateRaffleCode from "../utils/generateRaffleCode.js";
import RaffleSettings from "../models/RaffleSettings.js";

const createUniqueTicketCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = generateRaffleCode();
    exists = await Ticket.findOne({ raffleCode: code });
  }

  return code;
};

export const purchaseTickets = async (req, res) => {
  try {

    let settings = await RaffleSettings.findOne();

    if (!settings) {
  settings = await RaffleSettings.create({});
    }

    if (!settings.salesOpen) {
        return res.status(400).json({
        success: false,
        message: "Ticket sales closed",
    });
}

    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket quantity",
      });
    }

    const ticketPrice = 500;
    const totalAmount = quantity * ticketPrice;

    const payment = await Payment.create({
      userId: req.user._id,
      amount: totalAmount,
      ticketCount: quantity,
      reference: `PAY-${Date.now()}`,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Payment initialized",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPaymentAndGenerateTickets = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    if (payment.status === "success") {
      return res.status(400).json({
        success: false,
        message: "Payment already processed",
      });
    }

    // Simulate successful payment
    payment.status = "success";
    await payment.save();

    const createdTickets = [];

    for (let i = 0; i < payment.ticketCount; i++) {
      const code = await createUniqueTicketCode();

      const ticket = await Ticket.create({
        userId: payment.userId,
        raffleCode: code,
        paymentId: payment._id,
      });

      createdTickets.push(ticket);
    }

    res.status(200).json({
      success: true,
      message: "Payment verified and tickets generated",
      tickets: createdTickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};