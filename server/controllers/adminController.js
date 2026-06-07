import Report from "../models/Report.js";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    const reportCounts = await Report.aggregate([
      {
        $group: {
          _id: "$submittedBy",
          totalReports: { $sum: 1 },
          verifiedReports: {
            $sum: {
              $cond: [{ $eq: ["$status", "Verified"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const countsByUser = reportCounts.reduce((acc, item) => {
      acc[item._id.toString()] = {
        totalReports: item.totalReports,
        verifiedReports: item.verifiedReports,
      };
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      count: users.length,
      users: users.map((user) => ({
        ...user.toObject(),
        totalReports: countsByUser[user._id.toString()]?.totalReports || 0,
        verifiedReports: countsByUser[user._id.toString()]?.verifiedReports || 0,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while getting users",
      error: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own admin role",
      });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User role updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating user role",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account from the admin panel",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Report.deleteMany({ submittedBy: user._id });
    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User and submitted reports deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};
