import dotenv from "dotenv";

dotenv.config();

import app from "./app";

import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("");

      console.log("====================================");

      console.log("🚀 Ace Soft Solution Backend");

      console.log(`🌍 Port : ${PORT}`);

      console.log("====================================");

      console.log("");
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();