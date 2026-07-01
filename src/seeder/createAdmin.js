import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@raffle.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@raffle.com",
      phone: "08000000000",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();