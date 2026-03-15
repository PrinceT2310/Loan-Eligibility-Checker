export const calculateEMI = (loanAmount, annualRate, tenureYears) => {
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  return Math.round(emi);
};