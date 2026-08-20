import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Running is me rawrrrrr",
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`Charan here na me on port ${PORT}!`);
});