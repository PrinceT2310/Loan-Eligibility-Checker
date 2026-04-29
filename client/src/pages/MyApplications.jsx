import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get("/applications/my");
        if (Array.isArray(res.data)) {
          setApps(res.data);
        } else {
          setError("Received invalid data from server.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const statusStyle = (status) => {
    if (status === "Approved") return { background: "#d4f5e0", color: "#1a7a3f" };
    if (status === "Rejected") return { background: "#fdecea", color: "#c0392b" };
    return { background: "#fef8e0", color: "#b86e00" };
  };

  const statusIcon = (status) => {
    if (status === "Approved") return "✅";
    if (status === "Rejected") return "❌";
    return "⏳";
  };

  const calcEMI = (amount, rate, years) => {
    if (!rate || !years || !amount) return null;
    const r = rate / 100 / 12;
    const n = years * 12;
    return Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const filteredApps = filter === "All"
    ? apps
    : apps.filter(a => a.status === filter);

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
              My Loan Applications
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Track and manage all your loan applications
            </p>
          </div>
          <button
            onClick={() => navigate("/eligibility")}
            style={{
              background: "#d4920a", color: "white",
              padding: "10px 20px", borderRadius: "8px",
              border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: 500,
            }}
          >
            + New Application
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* LOADING */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                height: "100px", borderRadius: "12px",
                background: "#e5e7eb",
              }} />
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div style={{
            background: "#fdecea", border: "2px solid #d4920a",
            borderRadius: "12px", padding: "20px", color: "#c0392b"
          }}>
            <p style={{ fontWeight: 500 }}>Something went wrong</p>
            <p style={{ fontSize: "13px", marginTop: "4px" }}>{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && apps.length === 0 && (
          <div style={{
            background: "white", border: "2px solid #d4920a",
            borderRadius: "12px", padding: "60px 20px", textAlign: "center"
          }}>
            <p style={{ fontSize: "48px", marginBottom: "12px" }}>📋</p>
            <p style={{ fontSize: "16px", fontWeight: 500, color: "#0a2818", marginBottom: "8px" }}>
              No applications yet
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
              Check your loan eligibility and apply to top banks
            </p>
            <button
              onClick={() => navigate("/eligibility")}
              style={{
                background: "#0a2818", color: "#f5c842",
                padding: "12px 28px", borderRadius: "8px",
                border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: 500,
              }}
            >
              Check Eligibility Now
            </button>
          </div>
        )}

        {/* APPLICATIONS LIST */}
        {!loading && !error && apps.length > 0 && (
          <>
            {/* SUMMARY STRIP */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px", marginBottom: "20px"
            }}>
              {[
                { label: "Total",    value: apps.length,                                      color: "#f5c842", bg: "#0a2818" },
                { label: "Pending",  value: apps.filter(a => a.status === "Pending").length,  color: "#b86e00", bg: "white" },
                { label: "Approved", value: apps.filter(a => a.status === "Approved").length, color: "#1a7a3f", bg: "white" },
                { label: "Rejected", value: apps.filter(a => a.status === "Rejected").length, color: "#c0392b", bg: "white" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: s.bg, borderRadius: "12px",
                  border: "2px solid #d4920a", padding: "16px 20px",
                  cursor: "pointer",
                }}
                  onClick={() => setFilter(i === 0 ? "All" : s.label)}
                >
                  <p style={{ fontSize: "11px", color: s.bg === "#0a2818" ? "rgba(255,255,255,0.5)" : "#6b7280", marginBottom: "6px" }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: "26px", fontWeight: 500, color: s.color }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* FILTER TABS */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              {["All", "Pending", "Approved", "Rejected"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 16px", borderRadius: "20px",
                    border: "1.5px solid #d4920a", cursor: "pointer",
                    fontSize: "12px", fontWeight: 500,
                    background: filter === f ? "#0a2818" : "white",
                    color: filter === f ? "#f5c842" : "#6b7280",
                  }}
                >
                  {f}
                  {f !== "All" && (
                    <span style={{ marginLeft: "6px", fontSize: "11px" }}>
                      ({apps.filter(a => a.status === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* CARDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredApps.map((app) => {
                const emi = calcEMI(app.loanAmount, app.bank?.interestRate, app.tenureYears);
                const bankName = app.bank?.name || "Unknown Bank";
                const hasBank = !!app.bank?.name;

                return (
                  <div key={app._id} style={{
                    background: "white", borderRadius: "12px",
                    border: "2px solid #d4920a", padding: "20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>

                      {/* LEFT */}
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{
                          width: "46px", height: "46px", borderRadius: "50%",
                          background: hasBank ? "#d4f5e0" : "#f3f4f6",
                          border: "1.5px solid #d4920a",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "16px", fontWeight: 600,
                          color: hasBank ? "#155c30" : "#9ca3af",
                          flexShrink: 0,
                        }}>
                          {bankName.charAt(0)}
                        </div>
                        <div>
                          {/* Bank Name */}
                          <p style={{ fontSize: "15px", fontWeight: 600, color: "#0a2818" }}>
                            {bankName}
                          </p>

                          {/* Loan Details Row */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>
                              ₹{app.loanAmount?.toLocaleString("en-IN")}
                            </span>
                            <span style={{ color: "#d4920a" }}>•</span>
                            <span style={{ fontSize: "12px", color: "#6b7280" }}>
                              {app.tenureYears} yrs tenure
                            </span>
                            {app.bank?.interestRate && (
                              <>
                                <span style={{ color: "#d4920a" }}>•</span>
                                <span style={{ fontSize: "12px", color: "#1a7a3f", fontWeight: 500 }}>
                                  {app.bank.interestRate}% p.a.
                                </span>
                              </>
                            )}
                          </div>

                          {/* Date + Purpose Row */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                            <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                              📅 {new Date(app.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </span>
                            {app.purpose && (
                              <>
                                <span style={{ color: "#d1d5db" }}>•</span>
                                <span style={{
                                  fontSize: "11px", background: "#fef8e0",
                                  color: "#b86e00", padding: "2px 8px",
                                  borderRadius: "20px", fontWeight: 500,
                                  border: "0.5px solid #d4920a"
                                }}>
                                  {app.purpose}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
                        <span style={{
                          ...statusStyle(app.status),
                          fontSize: "12px", fontWeight: 500,
                          padding: "5px 14px", borderRadius: "20px",
                        }}>
                          {statusIcon(app.status)} {app.status}
                        </span>
                        {emi && (
                          <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: "10px", color: "#9ca3af" }}>Monthly EMI</p>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0a2818" }}>
                              ₹{emi.toLocaleString("en-IN")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* REJECTION REASON */}
                    {app.status === "Rejected" && app.rejectionReason && (
                      <div style={{
                        marginTop: "14px", background: "#fdecea",
                        border: "0.5px solid #f5c6c6",
                        borderRadius: "8px", padding: "12px",
                        display: "flex", alignItems: "flex-start", gap: "8px"
                      }}>
                        <span style={{ fontSize: "14px" }}>❌</span>
                        <div>
                          <p style={{ fontSize: "11px", color: "#c0392b", fontWeight: 600, marginBottom: "2px" }}>
                            Rejection Reason
                          </p>
                          <p style={{ fontSize: "12px", color: "#c0392b" }}>
                            {app.rejectionReason}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* APPROVED MESSAGE */}
                    {app.status === "Approved" && (
                      <div style={{
                        marginTop: "14px", background: "#d4f5e0",
                        border: "0.5px solid #a7f3c0",
                        borderRadius: "8px", padding: "12px",
                        display: "flex", alignItems: "center", gap: "8px"
                      }}>
                        <span style={{ fontSize: "16px" }}>🎉</span>
                        <p style={{ fontSize: "12px", color: "#1a7a3f", fontWeight: 500 }}>
                          Congratulations! Your loan has been approved. The bank will contact you shortly.
                        </p>
                      </div>
                    )}

                    {/* PENDING MESSAGE */}
                    {app.status === "Pending" && (
                      <div style={{
                        marginTop: "14px", background: "#fef8e0",
                        border: "0.5px solid #f5e080",
                        borderRadius: "8px", padding: "12px",
                        display: "flex", alignItems: "center", gap: "8px"
                      }}>
                        <span style={{ fontSize: "16px" }}>⏳</span>
                        <p style={{ fontSize: "12px", color: "#b86e00", fontWeight: 500 }}>
                          Your application is under review. Expected response within 2-3 business days.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}