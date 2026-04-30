import Application from "../models/Application.model.js";
import Bank from "../models/Bank.model.js";
import User from "../models/User.model.js";
import {
  sendApplicationSubmittedEmail,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
} from "../utils/emailService.js";

// APPLY FOR LOAN
export const applyLoan = async (req, res) => {
  try {
    const { bankId, loanAmount, tenureYears, purpose } = req.body;

    if (!bankId || !loanAmount || !tenureYears) {
      return res.status(400).json({ message: "All fields required" });
    }

    const application = await Application.create({
      user: req.user._id,
      bank: bankId,
      loanAmount,
      tenureYears,
      purpose: purpose || "Personal",
    });

    // Bank details fetch karo email ke liye
    const bank = await Bank.findById(bankId);

    // ✅ Email send karo
    sendApplicationSubmittedEmail(
      req.user.email,
      req.user.name,
      bank?.name || "Bank",
      loanAmount
    );

    res.status(201).json({ message: "Application Submitted", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData = { status };
    if (status === "Rejected" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    if (status === "Approved") {
      updateData.rejectionReason = "";
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("bank", "name interestRate")
     .populate("user", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Email send karo based on status
    if (status === "Approved") {
      sendApplicationApprovedEmail(
        application.user.email,
        application.user.name,
        application.bank?.name || "Bank",
        application.loanAmount
      );
    } else if (status === "Rejected") {
      sendApplicationRejectedEmail(
        application.user.email,
        application.user.name,
        application.bank?.name || "Bank",
        application.loanAmount,
        rejectionReason
      );
    }

    res.json({ message: "Status updated", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER APPLICATIONS
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id
    }).populate("bank", "name interestRate");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPLICATIONS (ADMIN)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("bank", "name interestRate")
      .populate("user", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};