import Application from "../models/Application.model.js";

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