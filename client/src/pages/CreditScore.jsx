import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreditScore() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const score = user?.creditScore || 0;

  const getScoreInfo = (s) => {
    if (s >= 800) return { label: "Excellent",  color: "#1a7a3f", bg: "#d4f5e0", desc: "You have an excellent credit score! You qualify for the best loan rates from all top banks." };
    if (s >= 750) return { label: "Very Good",  color: "#1e9147", bg: "#d4f5e0", desc: "Very good score! Most banks will offer you competitive interest rates." };
    if (s >= 700) return { label: "Good",        color: "#b86e00", bg: "#fef8e0", desc: "Good score. You qualify for most loan products with reasonable rates." };
    if (s >= 650) return { label: "Fair",        color: "#d4920a", bg: "#fef8e0", desc: "Fair score. Some banks may approve your loan but at higher interest rates." };
    if (s >= 550) return { label: "Poor",        color: "#c0392b", bg: "#fdecea", desc: "Poor score. Limited loan options available. Focus on improving your score." };
    return       { label: "Very Poor", color: "#922b21", bg: "#fdecea", desc: "Very poor score. Work on improving it before applying for loans." };
  };

  const info = getScoreInfo(score);
  const scorePercent = Math.min(((score - 300) / 600) * 100, 100);

  const ranges = [
    { label: "Very Poor", range: "300–549", color: "#922b21", min: 300, max: 549 },
    { label: "Poor",      range: "550–649", color: "#c0392b", min: 550, max: 649 },
    { label: "Fair",      range: "650–699", color: "#d4920a", min: 650, max: 699 },
    { label: "Good",      range: "700–749", color: "#b86e00", min: 700, max: 749 },
    { label: "Very Good", range: "750–799", color: "#1e9147", min: 750, max: 799 },
    { label: "Excellent", range: "800–900", color: "#1a7a3f", min: 800, max: 900 },
  ];

  const tips = [
    { icon: "💳", title: "Pay Bills on Time",        desc: "Payment history is the most important factor. Never miss a due date." },
    { icon: "📊", title: "Keep Credit Utilization Low", desc: "Use less than 30% of your credit limit for a healthy score." },
    { icon: "🕒", title: "Maintain Credit History",   desc: "Longer credit history positively impacts your score." },
    { icon: "🔍", title: "Avoid Multiple Inquiries",  desc: "Too many loan applications in short time can lower your score." },
    { icon: "💰", title: "Diversify Credit Mix",      desc: "Having both secured and unsecured loans can boost your score." },
    { icon: "📋", title: "Check Credit Report",       desc: "Review your credit report regularly for errors and disputes." },
  ];

  const banks = [
    { name: "HDFC Bank",   minScore: 750, rate: "8.50%"  },
    { name: "ICICI Bank",  minScore: 720, rate: "9.00%"  },
    { name: "SBI",         minScore: 700, rate: "8.75%"  },
    { name: "Axis Bank",   minScore: 720, rate: "9.25%"  },
    { name: "Kotak",       minScore: 740, rate: "8.90%"  },
    { name: "Yes Bank",    minScore: 650, rate: "10.50%" },
  ];

  return (
    <div style={{ background: "#f8faf9", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 60%, #1a5c30 100%)",
        padding: "32px 32px 28px",
        borderBottom: "2px solid #d4920a"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 500, color: "#f5c842", marginBottom: "6px" }}>
              Credit Score
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Understand and improve your credit score
            </p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "#d4920a", color: "white",
              padding: "10px 20px", borderRadius: "8px",
              border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: 500,
            }}
          >
            Update Score →
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

          {/* SCORE METER */}
          <div style={{
            background: "#0a2818", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "28px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: "20px" }}>
              YOUR CREDIT SCORE
            </p>

            {/* Big Score */}
            <div style={{
              fontSize: "72px", fontWeight: 700,
              color: score >= 700 ? "#f5c842" : score >= 600 ? "#f0a800" : "#e74c3c",
              lineHeight: 1, marginBottom: "8px"
            }}>
              {score || "—"}
            </div>

            <div style={{
              display: "inline-block",
              background: info.bg, color: info.color,
              padding: "4px 16px", borderRadius: "20px",
              fontSize: "13px", fontWeight: 600,
              marginBottom: "20px"
            }}>
              {info.label}
            </div>

            {/* Progress Bar */}
            <div style={{ margin: "0 auto", maxWidth: "280px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                <span>300</span>
                <span>600</span>
                <span>900</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "6px", height: "10px", position: "relative" }}>
                <div style={{
                  height: "10px", borderRadius: "6px",
                  background: `linear-gradient(90deg, #e74c3c, #f0a800, #1e9147)`,
                  width: "100%", opacity: 0.3,
                  position: "absolute",
                }} />
                <div style={{
                  height: "10px", borderRadius: "6px",
                  background: info.color,
                  width: `${scorePercent}%`,
                  position: "absolute", transition: "width 1s",
                }} />
                {/* Indicator */}
                <div style={{
                  position: "absolute", top: "-4px",
                  left: `calc(${scorePercent}% - 9px)`,
                  width: "18px", height: "18px",
                  borderRadius: "50%", background: "white",
                  border: `3px solid ${info.color}`,
                }} />
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "20px", lineHeight: "1.6" }}>
              {info.desc}
            </p>

            {/* No score message */}
            {!score && (
              <button
                onClick={() => navigate("/profile")}
                style={{
                  marginTop: "16px", background: "#d4920a", color: "white",
                  padding: "10px 20px", borderRadius: "8px",
                  border: "none", cursor: "pointer", fontSize: "13px",
                }}
              >
                Set Your Score →
              </button>
            )}
          </div>

          {/* SCORE RANGES */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
              Credit Score Ranges
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ranges.map((r, i) => {
                const isActive = score >= r.min && score <= r.max;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 14px", borderRadius: "8px",
                    background: isActive ? r.color + "15" : "transparent",
                    border: isActive ? `1.5px solid ${r.color}` : "1.5px solid transparent",
                  }}>
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: r.color, flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: isActive ? 600 : 400, color: isActive ? r.color : "#374151" }}>
                          {r.label} {isActive && "← You are here"}
                        </span>
                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>{r.range}</span>
                      </div>
                      <div style={{ background: "#f3f4f6", borderRadius: "3px", height: "5px" }}>
                        <div style={{
                          height: "5px", borderRadius: "3px",
                          background: r.color,
                          width: `${((r.max - 300) / 600) * 100}%`
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BANK ELIGIBILITY */}
        <div style={{
          background: "white", borderRadius: "12px",
          border: "2px solid #d4920a", padding: "24px",
          marginBottom: "20px"
        }}>
          <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
            Bank Eligibility Based on Your Score
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
            {banks.map((bank, i) => {
              const eligible = score >= bank.minScore;
              return (
                <div key={i} style={{
                  padding: "16px", borderRadius: "10px",
                  border: `1.5px solid ${eligible ? "#d4920a" : "#e5e7eb"}`,
                  background: eligible ? "#fef8e0" : "#fafafa",
                  textAlign: "center",
                }}>
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    background: eligible ? "#0a2818" : "#e5e7eb",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 700,
                    color: eligible ? "#f5c842" : "#9ca3af",
                    margin: "0 auto 10px",
                  }}>
                    {bank.name.charAt(0)}
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: eligible ? "#0a2818" : "#9ca3af", marginBottom: "4px" }}>
                    {bank.name}
                  </p>
                  <p style={{ fontSize: "11px", color: eligible ? "#1a7a3f" : "#9ca3af", marginBottom: "6px" }}>
                    From {bank.rate}
                  </p>
                  <p style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "8px" }}>
                    Min score: {bank.minScore}
                  </p>
                  <span style={{
                    fontSize: "11px", fontWeight: 600,
                    padding: "3px 10px", borderRadius: "20px",
                    background: eligible ? "#d4f5e0" : "#fdecea",
                    color: eligible ? "#1a7a3f" : "#c0392b",
                  }}>
                    {eligible ? "✅ Eligible" : "❌ Not Eligible"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIPS */}
        <div style={{
          background: "white", borderRadius: "12px",
          border: "2px solid #d4920a", padding: "24px"
        }}>
          <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
            How to Improve Your Credit Score
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }}>
            {tips.map((tip, i) => (
              <div key={i} style={{
                padding: "16px", borderRadius: "10px",
                background: "#f8faf9", border: "1px solid #fef3c7",
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{tip.icon}</div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#0a2818", marginBottom: "6px" }}>
                  {tip.title}
                </p>
                <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.6" }}>
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}