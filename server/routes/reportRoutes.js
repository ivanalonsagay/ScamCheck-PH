import express from "express";
import {
  createReport,
  deleteReport,
  getAllReports,
  getMyReports,
  getPhishingIntelReports,
  getPublicReports,
  getReportById,
  getReportStats,
  updateReportStatus,
} from "../controllers/reportController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User submits a scam report
router.post("/", protect, createReport);

// User views own submitted reports
router.get("/my-reports", protect, getMyReports);

// Public views verified scam warnings
router.get("/public", getPublicReports);

// Public views free phishing intelligence feed
router.get("/phishing-live", getPhishingIntelReports);

// Admin dashboard statistics
router.get("/stats", protect, adminOnly, getReportStats);

// Admin views all reports
router.get("/", protect, adminOnly, getAllReports);

// User or admin views one report
router.get("/:id", protect, getReportById);

// Admin verifies or rejects a report
router.patch("/:id/status", protect, adminOnly, updateReportStatus);

// Admin deletes a report
router.delete("/:id", protect, adminOnly, deleteReport);

export default router;
