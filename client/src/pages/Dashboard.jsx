import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import SkeletonCard from "../components/SkeletonCard";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState({
    total: 0, pending: 0, approved: 0, rejected: 0
  });

  const chartData = [
    { name: "Pending",  value: stats.pending  },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];
  const COLORS = ["#f0a800", "#1e9147", "#e74c3c"];

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get("/applications/my");
        const data = res.data;
        setApps(data);
        setStats({
          total:    data.length,
          pending:  data.filter(a => a.status === "Pending").length,
          approved: data.filter(a => a.status === "Approved").length,
          rejected: data.filter(a => a.status === "Rejected").length,
        });
      } catch (error) {
        console.error(error);
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
              Welcome back, {user?.name} 👋
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Here's your loan activity overview
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
            + Check Eligibility
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* STAT CARDS */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "24px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ height: "90px", borderRadius: "12px", background: "#e5e7eb" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total Applications", value: stats.total,    color: "#f5c842", bg: "#0a2818", dark: true  },
              { label: "Pending",            value: stats.pending,  color: "#b86e00", bg: "white",   dark: false },
              { label: "Approved",           value: stats.approved, color: "#1a7a3f", bg: "white",   dark: false },
              { label: "Rejected",           value: stats.rejected, color: "#c0392b", bg: "white",   dark: false },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.bg, borderRadius: "12px",
                border: "2px solid #d4920a", padding: "20px",
                cursor: "pointer",
              }}
                onClick={() => navigate("/applications")}
              >
                <p style={{ fontSize: "11px", color: s.dark ? "rgba(255,255,255,0.5)" : "#6b7280", marginBottom: "8px" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "30px", fontWeight: 600, color: s.color }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CHART + QUICK ACTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

          {/* PIE CHART */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "4px" }}>
              Loan Status Overview
            </h2>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
              Distribution of your applications
            </p>
            {loading ? (
              <div style={{ height: "240px", borderRadius: "8px", background: "#f3f4f6" }} />
            ) : stats.total === 0 ? (
              <div style={{
                height: "240px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", color: "#9ca3af"
              }}>
                <p style={{ fontSize: "36px", marginBottom: "8px" }}>📋</p>
                <p style={{ fontSize: "13px" }}>No applications yet</p>
                <button
                  onClick={() => navigate("/eligibility")}
                  style={{
                    marginTop: "12px", background: "#0a2818", color: "#f5c842",
                    padding: "8px 20px", borderRadius: "8px",
                    border: "none", cursor: "pointer", fontSize: "12px",
                  }}
                >
                  Check Eligibility
                </button>
              </div>
            ) : (
              <PieChart width={300} height={240}>
                <Pie data={chartData} cx="50%" cy="50%"
                  outerRadius={85} dataKey="value" label>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div style={{
            background: "#0a2818", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#f5c842", marginBottom: "4px" }}>
              Quick Actions
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "20px" }}>
              What would you like to do?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: "💳", label: "Check Loan Eligibility",  sub: "Find best bank offers",      path: "/eligibility"   },
                { icon: "📄", label: "View My Applications",    sub: "Track application status",   path: "/applications"  },
                { icon: "👤", label: "Update My Profile",       sub: "Income & credit score",      path: "/profile"       },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(245,200,66,0.08)",
                    color: "white", borderRadius: "8px",
                    border: "0.5px solid rgba(245,200,66,0.2)",
                    cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "12px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(245,200,66,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(245,200,66,0.08)"}
                >
                  <span style={{ fontSize: "20px" }}>{action.icon}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500 }}>{action.label}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{action.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Credit Score hint */}
            {user?.creditScore && (
              <div style={{
                marginTop: "16px", padding: "12px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "8px", border: "0.5px solid rgba(255,255,255,0.08)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Your Credit Score</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#f5c842" }}>{user.creditScore}</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "5px" }}>
                  <div style={{
                    height: "5px", borderRadius: "4px",
                    background: user.creditScore >= 750 ? "#1e9147" : user.creditScore >= 650 ? "#f0a800" : "#e74c3c",
                    width: `${((user.creditScore - 300) / 600) * 100}%`
                  }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div style={{
          background: "white", borderRadius: "12px",
          border: "2px solid #d4920a", padding: "24px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818" }}>
                Recent Activity
              </h2>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                Your latest loan applications
              </p>
            </div>
            {apps.length > 5 && (
              <button
                onClick={() => navigate("/applications")}
                style={{
                  background: "none", border: "1.5px solid #d4920a",
                  color: "#d4920a", padding: "6px 14px",
                  borderRadius: "8px", cursor: "pointer", fontSize: "12px",
                }}
              >
                View All →
              </button>
            )}
          </div>

          {loading ? (
            <SkeletonCard rows={3} />
          ) : apps.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
              <p style={{ fontSize: "36px", marginBottom: "8px" }}>📋</p>
              <p style={{ fontSize: "13px", marginBottom: "16px" }}>No applications yet</p>
              <button
                onClick={() => navigate("/eligibility")}
                style={{
                  background: "#0a2818", color: "#f5c842",
                  padding: "10px 24px", borderRadius: "8px",
                  border: "none", cursor: "pointer", fontSize: "13px",
                }}
              >
                Check Eligibility Now
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {apps.slice(0, 5).map((app) => (
                <div
                  key={app._id}
                  onClick={() => navigate("/applications")}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px", borderRadius: "10px",
                    background: "#f8faf9", border: "0.5px solid #fef3c7",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fef8e0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f8faf9"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      background: "#d4f5e0", border: "1.5px solid #d4920a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 600, color: "#155c30", flexShrink: 0,
                    }}>
                      {app.bank?.name?.charAt(0) || "B"}
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: "#0a2818" }}>
                        {app.bank?.name || "Bank"}
                      </p>
                      <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                        ₹{app.loanAmount?.toLocaleString("en-IN")} &bull;{" "}
                        {app.tenureYears} yrs &bull;{" "}
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    ...statusStyle(app.status),
                    fontSize: "11px", fontWeight: 500,
                    padding: "4px 12px", borderRadius: "20px",
                  }}>
                    {statusIcon(app.status)} {app.status}
                  </span>
                </div>
              ))}
              {apps.length > 5 && (
                <button
                  onClick={() => navigate("/applications")}
                  style={{
                    width: "100%", padding: "10px",
                    background: "none", border: "1.5px dashed #d4920a",
                    color: "#d4920a", borderRadius: "8px",
                    cursor: "pointer", fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  View all {apps.length} applications →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}