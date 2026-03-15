export const calculateEligibility = ({
  income,
  existingEMI,
  loanAmount,
  creditScore,
}) => {
  // 1️⃣ DTI
  const dti = (existingEMI / income) * 100;

  // 2️⃣ Max EMI allowed (40% rule)
  const maxEMI = income * 0.4;

  // 3️⃣ Approval logic
  let approvalChance = 0;

  if (creditScore >= 750 && dti < 40) {
    approvalChance = 90;
  } else if (creditScore >= 650 && dti < 50) {
    approvalChance = 70;
  } else if (creditScore >= 550 && dti < 60) {
    approvalChance = 50;
  } else {
    approvalChance = 20;
  }

  return {
    dti,
    maxEMI,
    approvalChance,
  };
};