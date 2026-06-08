import Report from "../models/Report.js";

const isValidLinkOrPhone = (value = "") => {
  if (!value.trim()) {
    return true;
  }

  const cleanPhone = value.replace(/\s|-/g, "");
  const isPhone = /^\d{11}$/.test(cleanPhone);

  try {
    const url = new URL(value);
    return isPhone || ["http:", "https:"].includes(url.protocol);
  } catch {
    return isPhone;
  }
};

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

    if (!isValidLinkOrPhone(suspiciousLink)) {
      return res.status(400).json({
        success: false,
        message:
          "Suspicious Link or Contact must be a valid http/https link or an 11-digit number",
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

export const getPhishingIntelReports = async (req, res) => {
  try {
    const searchParams = new URLSearchParams({
      _sort: "-date",
      _size: "12",
    });

    const response = await fetch(
      `https://api.phishstats.info/api/phishing?${searchParams.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.message || "Unable to fetch phishing intelligence reports",
      });
    }

    const reports = (Array.isArray(data) ? data : []).map((item) => ({
      id: String(item.id || item.url || item.host || item.ip),
      title: item.host ? `Phishing Site: ${item.host}` : "Phishing URL Alert",
      platform: "PhishStats",
      scamType: "Phishing",
      riskLevel: Number(item.score || 0) >= 6 ? "High Risk" : "Medium Risk",
      description: item.url
        ? `PhishStats detected this suspicious phishing URL: ${item.url}`
        : "PhishStats detected a suspicious phishing entry.",
      sourceUrl: item.url || "https://phishstats.info/",
      createdAt: item.date || item.discover_time || new Date().toISOString(),
      score: item.score,
      host: item.host,
      ip: item.ip,
      country: item.countryname || item.country,
    }));

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching phishing intelligence reports",
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

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const reportsOverTimeRaw = await Report.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const reportCountsByDay = reportsOverTimeRaw.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const reportsOverTime = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + index);

      const key = day.toISOString().slice(0, 10);

      return {
        date: key,
        label: day.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count: reportCountsByDay[key] || 0,
      };
    });

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
        reportsOverTime,
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
