import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const {
      title,
      scamType,
      platform,
      scamContent,
      suspiciousLink,
      description,
    } = req.body;

    // Check required fields
    if (!title || !scamType || !platform || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, scam type, platform, and description",
      });
    }

    // Create report owned by logged-in user
    const report = await Report.create({
      title,
      scamType,
      platform,
      scamContent,
      suspiciousLink,
      description,
      submittedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Scam report submitted successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating report",
      error: error.message,
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    // Get reports submitted by current user only
    const reports = await Report.find({
      submittedBy: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting your reports",
      error: error.message,
    });
  }
};

export const getPublicReports = async (req, res) => {
  try {
    // Public page only shows verified reports
    const reports = await Report.find({
      status: "Verified",
    })
      .populate("submittedBy", "name")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting public warnings",
      error: error.message,
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    // Admin can see all submitted reports
    const reports = await Report.find()
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting all reports",
      error: error.message,
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate(
      "submittedBy",
      "name email"
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // User can only view own report, admin can view all
    const isOwner = report.submittedBy._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting report details",
      error: error.message,
    });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { status, safetyTip, adminRemarks, riskLevel } = req.body;

    const allowedStatuses = ["Pending", "Verified", "Rejected"];
    const allowedRiskLevels = ["Low Risk", "Medium Risk", "High Risk"];

    // Validate status value
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report status",
      });
    }

    // Validate risk level if provided
    if (riskLevel && !allowedRiskLevels.includes(riskLevel)) {
      return res.status(400).json({
        success: false,
        message: "Invalid risk level",
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Verified reports should have a safety tip for public display
    if (status === "Verified" && !safetyTip && !report.safetyTip) {
      return res.status(400).json({
        success: false,
        message: "Safety tip is required when verifying a report",
      });
    }

    // Update report fields
    report.status = status;

    if (safetyTip !== undefined) {
      report.safetyTip = safetyTip;
    }

    if (adminRemarks !== undefined) {
      report.adminRemarks = adminRemarks;
    }

    if (riskLevel !== undefined) {
      report.riskLevel = riskLevel;
    }

    const updatedReport = await report.save();

    return res.status(200).json({
      success: true,
      message: `Report marked as ${status}`,
      report: updatedReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating report status",
      error: error.message,
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Delete report from database
    await report.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting report",
      error: error.message,
    });
  }
};

export const getReportStats = async (req, res) => {
  try {
    // Count reports by status
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: "Pending" });
    const verifiedReports = await Report.countDocuments({ status: "Verified" });
    const rejectedReports = await Report.countDocuments({ status: "Rejected" });

    // Group reports by scam type
    const reportsByType = await Report.aggregate([
      {
        $group: {
          _id: "$scamType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // Group reports by platform
    const reportsByPlatform = await Report.aggregate([
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // Get latest reports for admin dashboard
    const recentReports = await Report.find()
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalReports,
        pendingReports,
        verifiedReports,
        rejectedReports,
        reportsByType,
        reportsByPlatform,
        recentReports,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting report statistics",
      error: error.message,
    });
  }
};