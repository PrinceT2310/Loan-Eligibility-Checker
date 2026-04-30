import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    tenureYears: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    // ✅ NAYA — Rejection reason
    rejectionReason: {
      type: String,
      default: "",
    },
    // ✅ NAYA — Loan purpose
    purpose: {
      type: String,
      enum: ["Home", "Car", "Personal", "Education", "Business", "Other"],
      default: "Personal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);