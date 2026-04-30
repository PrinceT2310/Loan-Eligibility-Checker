import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users
    .filter(u => filter === "All" ? true : u.role === filter.toLowerCase())
    .filter(u =>
      search === "" ? true :
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );

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
              Manage Users
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              View and manage all registered users
            </p>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { label: "Total",  value: users.length,                              color: "#f5c842" },
              { label: "Users",  value: users.filter(u => u.role === "user").length,  color: "#1e9147" },
              { label: "Admins", value: users.filter(u => u.role === "admin").length, color: "#f0a800" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(245,200,66,0.2)",
                borderRadius: "10px", padding: "10px 16px", textAlign: "center"
              }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* SEARCH + FILTER */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px 10px 38px",
                borderRadius: "8px", border: "1.5px solid #d4920a",
                fontSize: "13px", outline: "none",
                color: "#0a2818", background: "white",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["All", "User", "Admin"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 16px", borderRadius: "8px",
                  border: "1.5px solid #d4920a", cursor: "pointer",
                  fontSize: "12px", fontWeight: 500,
                  background: filter === f ? "#0a2818" : "white",
                  color: filter === f ? "#f5c842" : "#6b7280",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                height: "80px", borderRadius: "12px",
                background: "#e5e7eb", animation: "pulse 1.5s infinite"
              }} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredUsers.length === 0 && (
          <div style={{
            background: "white", border: "2px solid #d4920a",
            borderRadius: "12px", padding: "60px", textAlign: "center"
          }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>👥</p>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818" }}>
              No users found
            </p>
          </div>
        )}

        {/* USERS TABLE */}
        {!loading && filteredUsers.length > 0 && (
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", overflow: "hidden"
          }}>
            {/* Table Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
              padding: "12px 20px", background: "#0a2818",
              borderBottom: "2px solid #d4920a"
            }}>
              {["User", "Email", "Role", "Credit Score", "Joined"].map((h, i) => (
                <span key={i} style={{ fontSize: "11px", fontWeight: 600, color: "#f5c842", letterSpacing: "0.5px" }}>
                  {h.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Table Rows */}
            {filteredUsers.map((user, i) => (
              <div
                key={user._id}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
                  padding: "14px 20px", alignItems: "center",
                  borderBottom: i < filteredUsers.length - 1 ? "0.5px solid #fef3c7" : "none",
                  background: i % 2 === 0 ? "white" : "#fafaf8",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#fef8e0"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "white" : "#fafaf8"}
              >
                {/* Name */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: user.role === "admin" ? "#0a2818" : "#d4f5e0",
                    border: "1.5px solid #d4920a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 600,
                    color: user.role === "admin" ? "#f5c842" : "#155c30",
                    flexShrink: 0,
                  }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#0a2818" }}>
                    {user.name}
                  </span>
                </div>

                {/* Email */}
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  {user.email}
                </span>

                {/* Role */}
                <span style={{
                  fontSize: "11px", fontWeight: 600,
                  padding: "3px 10px", borderRadius: "20px",
                  background: user.role === "admin" ? "#0a2818" : "#d4f5e0",
                  color: user.role === "admin" ? "#f5c842" : "#1a7a3f",
                  display: "inline-block", textTransform: "capitalize",
                }}>
                  {user.role === "admin" ? "👑 Admin" : "⭐ User"}
                </span>

                {/* Credit Score */}
                <div>
                  <span style={{
                    fontSize: "13px", fontWeight: 600,
                    color: !user.creditScore ? "#9ca3af" :
                      user.creditScore >= 750 ? "#1a7a3f" :
                      user.creditScore >= 650 ? "#b86e00" : "#c0392b"
                  }}>
                    {user.creditScore || "—"}
                  </span>
                  {user.creditScore && (
                    <div style={{ background: "#f3f4f6", borderRadius: "3px", height: "4px", marginTop: "4px", width: "60px" }}>
                      <div style={{
                        height: "4px", borderRadius: "3px",
                        background: user.creditScore >= 750 ? "#1a7a3f" : user.creditScore >= 650 ? "#b86e00" : "#c0392b",
                        width: `${((user.creditScore - 300) / 600) * 100}%`
                      }} />
                    </div>
                  )}
                </div>

                {/* Joined */}
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  }) : "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}