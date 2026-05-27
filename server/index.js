import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Allow React frontend to connect to backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Allow backend to read JSON data
app.use(express.json());

// Show request logs in terminal
app.use(morgan("dev"));

// Default API route
app.get("/", (req, res) => {
  res.json({
    message: "ScamCheck PH API is running",
  });
});

// Backend health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Report routes
app.use("/api/reports", reportRoutes);

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Get port from .env or use 5000
const PORT = process.env.PORT || 5000;

// Start backend server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});