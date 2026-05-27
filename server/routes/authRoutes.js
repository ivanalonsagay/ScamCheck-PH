import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user
router.get("/me", protect, getCurrentUser);

// Test admin-only access
router.get("/admin-check", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Admin access confirmed",
  });
});

export default router;