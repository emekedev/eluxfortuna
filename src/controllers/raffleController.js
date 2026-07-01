import Ticket from "../models/Ticket.js";
import Prize from "../models/Prize.js";
import Winner from "../models/Winner.js";
import RaffleSettings from "../models/RaffleSettings.js";

export const resetRaffle = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    await Winner.deleteMany({});
    await Prize.deleteMany({});

    let settings = await RaffleSettings.findOne();

    if (!settings) {
      settings = await RaffleSettings.create({});
    }

    settings.salesOpen = true;
    settings.drawCompleted = false;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Raffle reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const drawWinners = async (req, res) => {
  try {
    let settings = await RaffleSettings.findOneAndUpdate(
        {},
        {},
        {
        upsert: true,
        new: true,
        }
    )

    if (settings.drawCompleted) {
      return res.status(400).json({
        success: false,
        message: "Draw already completed",
      });
    }

    const tickets = await Ticket.find({
      status: "active",
      isWinner: false,
    });

    const prizes = await Prize.find().sort({ position: 1 });

    console.log("Tickets found:", tickets.length);
    console.log("Prizes found:", prizes.length);

    if (tickets.length === 0) {
        settings.drawCompleted = true;
        settings.salesOpen = false;

        console.log("Before save:", settings);

        await settings.save();
        console.log("After save:", settings);

      return res.status(400).json({
        success: false,
        message: "No tickets available",
      });
    }

    const winners = [];
    const availableTickets = [...tickets];

    for (const prize of prizes) {
      if (availableTickets.length === 0) break;

      const randomIndex = Math.floor(
        Math.random() * availableTickets.length
      );

      const winningTicket = availableTickets[randomIndex];

      winningTicket.isWinner = true;
      winningTicket.status = "used";
      await winningTicket.save();

      const winner = await Winner.create({
        ticketId: winningTicket._id,
        userId: winningTicket.userId,
        prizeId: prize._id,
        raffleCode: winningTicket.raffleCode,
        position: prize.position,
      });

      winners.push(winner);

      availableTickets.splice(randomIndex, 1);
    }

    

    res.json({
      success: true,
      winners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};