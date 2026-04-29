import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0, approved: 0, rejected: 0, pending: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const pieData = [
    { name: "Approved", value: stats.approved },
    { name: "Pending",  value: stats.pending  },
    { name: "Rejected", value: stats.rejected },
  ];

  const barData = [
    { name: "Total",    value: stats.total,    fill: "#f5c842" },
    { name: "Approved", value: stats.approved, fill: "#1e9147" },
    { name: "Pending",  value: stats.pending,  fill: "#f0a800" },
    { name: "Rejected", value: stats.rejected, fill: "#e74c3c" },
  ];

  const COLORS = ["#1e9147", "#f0a800", "#e74c3c"];

  const statCards = [
    { label: "Total Applications", value: stats.total,    color: "#f5c842", bg: "#0a2818",  dark: true  },
    { label: "Approved",           value: stats.approved, color: "#1a7a3f", bg: "white",    dark: false },
    { label: "Pending",            value: stats.pending,  color: "#b86e00", bg: "white",    dark: false },
    { label: "Rejected",           value: stats.rejected, color: "#c0392b", bg: "white",    dark: false },
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
              Admin Dashboard
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Platform analytics and management overview
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/applications")}
            style={{
              background: "#d4920a", color: "white",
              padding: "10px 20px", borderRadius: "8px",
              border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: 500,
            }}
          >
            View All Applications →
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
            {statCards.map((s, i) => (
              <div key={i} style={{
                background: s.bg, borderRadius: "12px",
                border: "2px solid #d4920a", padding: "20px",
              }}>
                <p style={{ fontSize: "11px", color: s.dark ? "rgba(255,255,255,0.5)" : "#6b7280", marginBottom: "8px" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "30px", fontWeight: 600, color: s.color }}>
                  {s.value}
                </p>
                {i === 0 && stats.total > 0 && (
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                    {Math.round((stats.approved / stats.total) * 100)}% approval rate
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CHARTS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

          {/* PIE CHART */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "4px" }}>
              Application Status Distribution
            </h2>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
              Overview of all loan applications
            </p>
            {stats.total === 0 ? (
              <div style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                <p>No data yet</p>
              </div>
            ) : (
              <PieChart width={320} height={260}>
                <Pie
                  data={pieData} cx="50%" cy="50%"
                  outerRadius={90} dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </div>

          {/* BAR CHART */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "4px" }}>
              Applications Overview
            </h2>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
              Total vs status breakdown
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM — STATS + QUICK ACTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          {/* APPROVAL RATE */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
              Platform Metrics
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Approval Rate",  value: stats.total ? `${Math.round((stats.approved / stats.total) * 100)}%` : "0%",  color: "#1a7a3f", width: stats.total ? `${(stats.approved / stats.total) * 100}%` : "0%",  bg: "#d4f5e0" },
                { label: "Rejection Rate", value: stats.total ? `${Math.round((stats.rejected / stats.total) * 100)}%` : "0%",  color: "#c0392b", width: stats.total ? `${(stats.rejected / stats.total) * 100}%` : "0%",  bg: "#fdecea" },
                { label: "Pending Rate",   value: stats.total ? `${Math.round((stats.pending  / stats.total) * 100)}%` : "0%",  color: "#b86e00", width: stats.total ? `${(stats.pending  / stats.total) * 100}%` : "0%",  bg: "#fef8e0" },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>{m.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: m.color }}>{m.value}</span>
                  </div>
                  <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "7px" }}>
                    <div style={{
                      height: "7px", borderRadius: "4px",
                      background: m.color, width: m.width,
                      transition: "width 0.5s"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div style={{
            background: "#0a2818", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>
            <h2 style={{ fontSize: "14px", fontWeight: 500, color: "#f5c842", marginBottom: "16px" }}>
              Quick Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "📄 Review Pending Applications", path: "/admin/applications", count: stats.pending },
                { label: "🏦 Manage Bank Offers",          path: "/admin/applications", count: null },
                { label: "👥 View All Applications",       path: "/admin/applications", count: stats.total },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  style={{
                    width: "100%", padding: "12px 16px",
                    background: "rgba(245,200,66,0.08)",
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: "8px",
                    border: "0.5px solid rgba(245,200,66,0.2)",
                    cursor: "pointer", fontSize: "13px",
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", textAlign: "left",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(245,200,66,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(245,200,66,0.08)"}
                >
                  <span>{action.label}</span>
                  {action.count !== null && (
                    <span style={{
                      background: "#d4920a", color: "white",
                      fontSize: "11px", fontWeight: 600,
                      padding: "2px 8px", borderRadius: "20px"
                    }}>
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              marginTop: "16px", padding: "12px 16px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "8px", border: "0.5px solid rgba(255,255,255,0.08)"
            }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: "1.6" }}>
                This admin panel provides insights into loan applications,
                approval rates, and pending reviews across the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}