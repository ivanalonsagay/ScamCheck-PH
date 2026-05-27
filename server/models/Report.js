import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Report title is required"],
      trim: true,
    },

    scamType: {
      type: String,
      required: [true, "Scam type is required"],
      trim: true,
    },

    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },

    scamContent: {
      type: String,
      trim: true,
      default: "",
    },

    suspiciousLink: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending", // New reports need admin review
    },

    riskLevel: {
      type: String,
      enum: ["Low Risk", "Medium Risk", "High Risk"],
      default: "Medium Risk", // Used for public warning cards
    },

    safetyTip: {
      type: String,
      trim: true,
      default: "",
    },

    adminRemarks: {
      type: String,
      trim: true,
      default: "",
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Connects report to the user who submitted it
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;