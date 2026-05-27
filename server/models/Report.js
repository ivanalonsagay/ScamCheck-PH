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
    },

    suspiciousLink: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending", // New reports start as pending
    },

    safetyTip: {
      type: String,
      trim: true,
      default: "",
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Connects report to user
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;