import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Ace Soft Solution Backend Running 🚀",
  });
});

/**
 * API Routes
 */

app.use("/api", contactRoutes);

export default app;