import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes";

const app = express();

// Allowed Origins
const allowedOrigins = [
  "https://www.acesoftsolution.com",
  "https://acesoftsolution.com",
  "https://acesoftsolution.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ace Soft Solution Backend Running",
  });
});

/**
 * API Routes
 */
app.use("/api", contactRoutes);

// Handle unknown routes
app.use("*", (_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;