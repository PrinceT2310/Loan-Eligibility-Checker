
import { useState } from "react";
import api from "../utils/api.js";
import toast from "react-hot-toast";

export default function Eligibility() {

  const [form, setForm] = useState({
    income: "",
    existingEMI: "",
    loanAmount: "",
    creditScore: "",
    tenureYears: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      income: Number(form.income),
      existingEMI: Number(form.existingEMI),
      loanAmount: Number(form.loanAmount),
      creditScore: Number(form.creditScore),
      tenureYears: Number(form.tenureYears),
    };

    try {

      const res = await api.post("/loan/check", payload);
      setResult(res.data);

    } catch (err) {

      setError(err.response?.data?.message || "Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  const applyLoan = async (bankId) => {

    try {

      await api.post("/applications/apply", {
        bankId,
        loanAmount: Number(form.loanAmount),
        tenureYears: Number(form.tenureYears),
      });

      toast.success("Loan application submitted successfully!");

    } catch (error) {

      toast.error(error.response?.data?.message || "Application failed");

    }

  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* HERO */}

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 text-center">

        <h1 className="text-4xl font-bold mb-3">
          Loan Eligibility Checker
        </h1>

        <p className="opacity-90">
          Compare loan offers from top banks instantly
        </p>

      </div>



      {/* PROCESS STEPS */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-10 px-4">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold">Enter Details</h3>
          <p className="text-gray-500 text-sm">
            Fill your financial information
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold">Check Eligibility</h3>
          <p className="text-gray-500 text-sm">
            Our system calculates approval chances
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <div className="text-3xl mb-2">🏦</div>
          <h3 className="font-semibold">Get Bank Offers</h3>
          <p className="text-gray-500 text-sm">
            Compare and apply instantly
          </p>
        </div>

      </div>



      {/* FORM + SUMMARY */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mt-12 px-4">


        {/* FORM */}

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Enter Your Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5"
          >

            <input
              name="income"
              placeholder="Monthly Income"
              className="border border-gray-300 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />

            <input
              name="existingEMI"
              placeholder="Existing EMI"
              className="border border-gray-300 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />

            <input
              name="loanAmount"
              placeholder="Loan Amount"
              className="border border-gray-300 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />

            <input
              name="creditScore"
              placeholder="Credit Score"
              className="border border-gray-300 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />

            <input
              name="tenureYears"
              placeholder="Loan Tenure (Years)"
              className="border border-gray-300 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />

            <button
              className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Checking..." : "Check Eligibility"}
            </button>

          </form>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

        </div>



        {/* SUMMARY */}

        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Loan Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Loan Amount</span>
              <span>₹{form.loanAmount || 0}</span>
            </div>

            <div className="flex justify-between">
              <span>Tenure</span>
              <span>{form.tenureYears || 0} Years</span>
            </div>

            <div className="flex justify-between">
              <span>Income</span>
              <span>₹{form.income || 0}</span>
            </div>

          </div>

          {result && (

            <div className="mt-8">

              <p className="mb-2">
                Approval Probability
              </p>

              <div className="bg-white/30 rounded-full h-4">

                <div
                  className="bg-green-400 h-4 rounded-full"
                  style={{ width: `${result.approvalChance}%` }}
                />

              </div>

              <p className="mt-2">
                {result.approvalChance}% Chance
              </p>

            </div>

          )}

        </div>

      </div>



      {/* RESULT METRICS */}

      {result && (

        <div className="max-w-6xl mx-auto mt-12 px-4">

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">DTI Ratio</p>
              <p className="text-3xl font-bold text-indigo-600">
                {result.dti.toFixed(2)}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">Approval Chance</p>
              <p className="text-3xl font-bold text-green-600">
                {result.approvalChance}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">Banks Available</p>
              <p className="text-3xl font-bold text-blue-600">
                {result.recommendedBanks?.length}
              </p>
            </div>

          </div>



          {/* BANK CARDS */}

          <h2 className="text-2xl font-bold mb-6 text-center">
            Recommended Banks
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {result.recommendedBanks?.map((bank) => (

              <div
                key={bank._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold mb-3">
                  {bank.name}
                </h3>

                <p className="text-gray-600 mb-2">
                  Interest Rate: {bank.interestRate}%
                </p>

                <p className="text-gray-600 mb-4">
                  EMI: ₹{bank.emi}
                </p>

                <button
                  onClick={() => applyLoan(bank._id)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Apply Loan
                </button>

              </div>

            ))}

          </div>

        </div>

      )}



      {/* WHY CHOOSE US */}

      <div className="max-w-6xl mx-auto mt-16 mb-20 bg-white p-10 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose Our Platform
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div>
            <h3 className="font-semibold mb-2">⚡ Instant Results</h3>
            <p className="text-gray-500 text-sm">
              Get loan eligibility within seconds
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🔒 Secure Process</h3>
            <p className="text-gray-500 text-sm">
              Your financial data is protected
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🏦 Multiple Banks</h3>
            <p className="text-gray-500 text-sm">
              Compare offers from top lenders
            </p>
          </div>

        </div>

      </div>

    </div>

  );

}
