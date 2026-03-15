import { calculateEligibility } from "../utils/eligibilityLogic.js";
import Bank from "../models/Bank.model.js";
import { calculateEMI } from "../utils/emiCalculator.js";

// CHECK LOAN ELIGIBILITY
export const checkEligibility = async (req, res) => {
  try {
    const {
      income,
      existingEMI,
      loanAmount,
      creditScore,
      tenureYears,
    } = req.body;

    // 1️⃣ Calculate eligibility metrics
    const result = calculateEligibility({
      income,
      existingEMI,
      loanAmount,
      creditScore,
    });

    // 2️⃣ Filter suitable banks
    const recommendedBanks = await Bank.find({
      minScore: { $lte: creditScore },
      minIncome: { $lte: income },
      maxLoanAmount: { $gte: loanAmount },
    });

    // 3️⃣ Add EMI calculation for each bank
    const banksWithEMI = recommendedBanks.map((bank) => {
      const emi = calculateEMI(
        loanAmount,
        bank.interestRate,
        tenureYears
      );

      return {
        ...bank._doc,
        emi,
      };
    });

    // 4️⃣ Send response
    res.json({
      message: "Eligibility Calculated",
      ...result,
      recommendedBanks: banksWithEMI,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};