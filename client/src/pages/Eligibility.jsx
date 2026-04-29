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
    purpose: "Personal",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.income || !form.loanAmount || !form.creditScore || !form.tenureYears) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post("/loan/check", {
        income: Number(form.income),
        existingEMI: Number(form.existingEMI),
        loanAmount: Number(form.loanAmount),
        creditScore: Number(form.creditScore),
        tenureYears: Number(form.tenureYears),
      });
      setResult(res.data);
      toast.success("Eligibility calculated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
        purpose: form.purpose,
      });
      toast.success("Loan application submitted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "0.5px solid #d1d5db", fontSize: "13px",
    outline: "none", color: "#0a2818", background: "#fafafa",
  };

  const labelStyle = {
    display: "block", fontSize: "12px",
    fontWeight: 500, color: "#374151", marginBottom: "6px",
  };

  return (
    <div style={{ background: "#f8faf9", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 60%, #1a5c30 100%)",
        padding: "32px 32px 28px",
        borderBottom: "2px solid #d4920a"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: 500, color: "#f5c842", marginBottom: "6px" }}>
          Loan Eligibility Checker
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
          Compare loan offers from top banks instantly
        </p>

        {/* STEPS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
          {[
            { step: "01", icon: "📝", title: "Enter Details", sub: "Fill your financial info" },
            { step: "02", icon: "⚡", title: "Check Eligibility", sub: "Instant approval chances" },
            { step: "03", icon: "🏦", title: "Get Bank Offers", sub: "Compare and apply" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#0f3d22",              // ✅ thoda lighter green
              borderRadius: "10px", padding: "16px",
              border: "1px solid #d4920a",        // ✅ solid gold border
              display: "flex", alignItems: "center", gap: "14px"
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(245,200,66,0.15)",
                border: "1px solid rgba(245,200,66,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 500, color: "#f5c842", flexShrink: 0
              }}>
                {s.step}
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#f5c842" }}>{s.title}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px", marginBottom: "24px" }}>

          {/* FORM */}
          {/* FORM */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            border: "2px solid #d4920a",  // ✅ gold border
            padding: "24px"
          }}>
            <h2 style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818", marginBottom: "20px" }}>
              Enter Your Details
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Purpose */}
              <div>
                <label style={labelStyle}>Loan Purpose</label>
                <select
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  {["Personal", "Home", "Car", "Education", "Business", "Other"].map(p => (
                    <option key={p} value={p}>{p} Loan</option>
                  ))}
                </select>
              </div>

              {/* 2 col grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Monthly Income ₹ *</label>
                  <input name="income" type="number" placeholder="e.g. 50000" style={inputStyle} onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Existing EMI ₹</label>
                  <input name="existingEMI" type="number" placeholder="e.g. 5000" style={inputStyle} onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Loan Amount ₹ *</label>
                  <input name="loanAmount" type="number" placeholder="e.g. 500000" style={inputStyle} onChange={handleChange} />
                </div>
                <div>
                  <label style={labelStyle}>Credit Score *</label>
                  <input name="creditScore" type="number" placeholder="300–900" style={inputStyle} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Loan Tenure (Years) *</label>
                <input name="tenureYears" type="number" placeholder="e.g. 5" style={inputStyle} onChange={handleChange} />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "12px",
                  background: loading ? "#9ca3af" : "#0a2818",
                  color: "#f5c842", borderRadius: "8px",
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "14px", fontWeight: 500, marginTop: "4px",
                }}
              >
                {loading ? "Checking..." : "Check Eligibility →"}
              </button>
            </form>
          </div>

          {/* SUMMARY CARD */}
          {/* SUMMARY CARD */}
          {/* SUMMARY CARD */}
          <div style={{
            background: "#0f3d22",        // ✅ same as hero gradient start
            borderRadius: "12px",
            border: "2px solid #d4920a",  // ✅ gold border
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            <h2 style={{ fontSize: "15px", fontWeight: 500, color: "#f5c842" }}>
              Loan Summary
            </h2>

            {[
              { label: "Loan Amount", value: form.loanAmount ? `₹${Number(form.loanAmount).toLocaleString("en-IN")}` : "₹0" },
              { label: "Tenure", value: form.tenureYears ? `${form.tenureYears} Years` : "0 Years" },
              { label: "Monthly Income", value: form.income ? `₹${Number(form.income).toLocaleString("en-IN")}` : "₹0" },
              { label: "Purpose", value: form.purpose || "Personal" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{item.label}</span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "white" }}>{item.value}</span>
              </div>
            ))}

            {/* Approval meter */}
            {result && (
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Approval Chance</span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#f5c842" }}>{result.approvalChance}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "6px" }}>
                  <div style={{ height: "6px", borderRadius: "4px", background: "#1e9147", width: `${result.approvalChance}%`, transition: "width 0.5s" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "16px" }}>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>DTI Ratio</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: "#f5c842" }}>{result.dti?.toFixed(1)}%</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Banks</div>
                    <div style={{ fontSize: "16px", fontWeight: 500, color: "#f5c842" }}>{result.recommendedBanks?.length || 0}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BANK RESULTS */}
        {result && result.recommendedBanks?.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
              Recommended Banks ({result.recommendedBanks.length})
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {result.recommendedBanks.map((bank) => (
                <div
                  key={bank._id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    border: "2px solid #d4920a",  // ✅ gold border
                    padding: "20px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#d4f5e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 500, color: "#155c30", flexShrink: 0 }}>
                      {bank.name?.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818" }}>{bank.name}</div>
                      <div style={{ fontSize: "11px", color: "#6b7280" }}>Bank Offer</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Interest Rate</span>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#1a7a3f" }}>{bank.interestRate}% p.a.</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Monthly EMI</span>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#0a2818" }}>₹{Number(bank.emi).toLocaleString("en-IN")}</span>
                    </div>
                    {bank.maxLoanAmount && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>Max Loan</span>
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#0a2818" }}>₹{Number(bank.maxLoanAmount).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => applyLoan(bank._id)}
                    style={{
                      width: "100%", padding: "10px",
                      background: "#0a2818", color: "#f5c842",
                      borderRadius: "8px", border: "none",
                      cursor: "pointer", fontSize: "13px", fontWeight: 500,
                    }}
                  >
                    Apply Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NO BANKS */}
        {result && result.recommendedBanks?.length === 0 && (
          <div style={{ background: "white", borderRadius: "12px", border: "0.5px solid #e5e7eb", padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "36px", marginBottom: "12px" }}>🏦</p>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818", marginBottom: "8px" }}>No banks available</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>Try improving your credit score or reducing loan amount</p>
          </div>
        )}

        {/* WHY US */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          border: "2px solid #d4920a",  // ✅ gold border
          padding: "24px",
          marginTop: "24px"
        }}>
          <h2 style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818", marginBottom: "16px", textAlign: "center" }}>
            Why Choose Score2Loan
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", textAlign: "center" }}>
            {[
              { icon: "⚡", title: "Instant Results", sub: "Eligibility in seconds" },
              { icon: "🔒", title: "Secure Process", sub: "Your data is protected" },
              { icon: "🏦", title: "Multiple Banks", sub: "Compare top lenders" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#0a2818", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}