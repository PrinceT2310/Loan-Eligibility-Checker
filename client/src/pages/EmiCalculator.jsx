import { useState } from "react";

export default function EmiCalculator() {
  const [form, setForm] = useState({
    principal: "",
    rate: "",
    tenure: "",
    tenureType: "years",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
  };

  const calculate = (e) => {
    e.preventDefault();
    const P = Number(form.principal);
    const annualRate = Number(form.rate);
    const tenureMonths = form.tenureType === "years"
      ? Number(form.tenure) * 12
      : Number(form.tenure);

    if (!P || !annualRate || !tenureMonths) return;

    const r = annualRate / 100 / 12;
    const emi = Math.round((P * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1));
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalPayment, totalInterest, tenureMonths });
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    borderRadius: "8px", border: "1.5px solid #d4920a",
    fontSize: "13px", outline: "none",
    color: "#0a2818", background: "#fafafa",
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
          EMI Calculator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
          Calculate your monthly EMI instantly
        </p>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "900px" }}>

          {/* FORM */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "28px"
          }}>
            <h2 style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818", marginBottom: "20px" }}>
              Enter Loan Details
            </h2>

            <form onSubmit={calculate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Principal */}
              <div>
                <label style={labelStyle}>Loan Amount (₹)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#d4920a", fontWeight: 500 }}>₹</span>
                  <input
                    name="principal"
                    type="number"
                    placeholder="e.g. 500000"
                    value={form.principal}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: "28px" }}
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label style={labelStyle}>Annual Interest Rate (%)</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="rate"
                    type="number"
                    step="0.1"
                    placeholder="e.g. 8.5"
                    value={form.rate}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingRight: "40px" }}
                  />
                  <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#d4920a", fontWeight: 500 }}>%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label style={labelStyle}>Loan Tenure</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px" }}>
                  <input
                    name="tenure"
                    type="number"
                    placeholder={form.tenureType === "years" ? "e.g. 5" : "e.g. 60"}
                    value={form.tenure}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <select
                    name="tenureType"
                    value={form.tenureType}
                    onChange={handleChange}
                    style={{
                      padding: "11px 14px", borderRadius: "8px",
                      border: "1.5px solid #d4920a", fontSize: "13px",
                      outline: "none", color: "#0a2818", background: "#fafafa",
                      cursor: "pointer",
                    }}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%", padding: "13px",
                  background: "#0a2818", color: "#f5c842",
                  borderRadius: "8px", border: "2px solid #d4920a",
                  cursor: "pointer", fontSize: "14px", fontWeight: 600,
                  marginTop: "4px",
                }}
              >
                Calculate EMI →
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* EMI Result */}
            <div style={{
              background: "#0a2818", borderRadius: "12px",
              border: "2px solid #d4920a", padding: "28px",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", letterSpacing: "1px" }}>
                MONTHLY EMI
              </p>
              <p style={{
                fontSize: result ? "40px" : "32px",
                fontWeight: 700, color: "#f5c842",
                marginBottom: "4px",
              }}>
                {result ? `₹${result.emi.toLocaleString("en-IN")}` : "—"}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                {result ? `for ${result.tenureMonths} months` : "Enter details to calculate"}
              </p>
            </div>

            {/* Breakdown */}
            {result && (
              <>
                <div style={{
                  background: "white", borderRadius: "12px",
                  border: "2px solid #d4920a", padding: "24px"
                }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
                    Payment Breakdown
                  </h3>
                  {[
                    { label: "Principal Amount",  value: `₹${Number(form.principal).toLocaleString("en-IN")}`, color: "#1a7a3f" },
                    { label: "Total Interest",    value: `₹${result.totalInterest.toLocaleString("en-IN")}`,   color: "#c0392b" },
                    { label: "Total Payment",     value: `₹${result.totalPayment.toLocaleString("en-IN")}`,    color: "#0a2818" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: i < 2 ? "0.5px solid #fef3c7" : "none"
                    }}>
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>{item.label}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div style={{
                  background: "white", borderRadius: "12px",
                  border: "2px solid #d4920a", padding: "24px"
                }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
                    Interest vs Principal
                  </h3>
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Principal</span>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#1a7a3f" }}>
                        {Math.round((Number(form.principal) / result.totalPayment) * 100)}%
                      </span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "8px" }}>
                      <div style={{
                        height: "8px", borderRadius: "4px", background: "#1a7a3f",
                        width: `${(Number(form.principal) / result.totalPayment) * 100}%`
                      }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Interest</span>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: "#c0392b" }}>
                        {Math.round((result.totalInterest / result.totalPayment) * 100)}%
                      </span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "8px" }}>
                      <div style={{
                        height: "8px", borderRadius: "4px", background: "#c0392b",
                        width: `${(result.totalInterest / result.totalPayment) * 100}%`
                      }} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Tip */}
            {!result && (
              <div style={{
                background: "#fef8e0", borderRadius: "12px",
                border: "2px solid #d4920a", padding: "20px"
              }}>
                <p style={{ fontSize: "13px", color: "#b86e00", fontWeight: 600, marginBottom: "8px" }}>
                  💡 How EMI is calculated?
                </p>
                <p style={{ fontSize: "12px", color: "#92400e", lineHeight: "1.6" }}>
                  EMI = P × r × (1+r)^n / ((1+r)^n - 1)
                  <br /><br />
                  Where P = Principal, r = Monthly rate, n = Tenure in months
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}