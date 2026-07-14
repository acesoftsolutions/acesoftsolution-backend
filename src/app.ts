import express from "express";
import cors from "cors";
import path from "path"; // ← Add this

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
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// === ADD THIS FOR STATIC FILES (Logo) ===
app.use("/images", express.static(path.join(__dirname, "../public/images")));
// Or serve entire public folder:
app.use(express.static(path.join(__dirname, "../public")));

// Test Route for Logo
app.get("/test-logo", (req, res) => {
  res.send(`<img src="/images/logo.png" alt="logo" style="width:300px">`);
});

// Existing Routes
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ace Soft Solution Backend Running",
  });
});

app.use("/api", contactRoutes);

app.use("*", (_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
