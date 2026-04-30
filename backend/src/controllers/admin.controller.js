import Application from "../models/Application.model.js";
import User from "../models/User.model.js";

export const getAdminStats = async (req, res) => {
  try {

    const total = await Application.countDocuments();

    const approved = await Application.countDocuments({
      status: "Approved"
    });

    const rejected = await Application.countDocuments({
      status: "Rejected"
    });

    const pending = await Application.countDocuments({
      status: "Pending"
    });

    res.json({
      total,
      approved,
      rejected,
      pending
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};