import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(null);
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications");
      setApps(res.data);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApps(); }, []);

  const approveApp = async (id) => {
    try {
      await api.put(`/applications/${id}/status`, { status: "Approved" });
      toast.success("Application approved!");
      fetchApps();
    } catch {
      toast.error("Failed to approve");
    }
  };

  const confirmReject = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a rejection reason");
      return;
    }
    try {
      await api.put(`/applications/${rejectModal}/status`, {
        status: "Rejected",
        rejectionReason: reason,
      });
      toast.success("Application rejected");
      setRejectModal(null);
      setReason("");
      fetchApps();
    } catch {
      toast.error("Failed to reject");
    }
  };

  const statusStyle = (status) => {
    if (status === "Approved") return { background: "#d4f5e0", color: "#1a7a3f" };
    if (status === "Rejected") return { background: "#fdecea", color: "#c0392b" };
    return { background: "#fef8e0", color: "#b86e00" };
  };

  const filteredApps = apps
    .filter(a => filter === "All" ? true : a.status === filter)
    .filter(a =>
      search === "" ? true :
      a.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.bank?.name?.toLowerCase().includes(search.toLowerCase())
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
              Loan Applications
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              Review, approve or reject loan applications
            </p>
          </div>
          {/* Stats in hero */}
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { label: "Total",    value: apps.length,                                      color: "#f5c842" },
              { label: "Pending",  value: apps.filter(a => a.status === "Pending").length,  color: "#f0a800" },
              { label: "Approved", value: apps.filter(a => a.status === "Approved").length, color: "#1e9147" },
              { label: "Rejected", value: apps.filter(a => a.status === "Rejected").length, color: "#e74c3c" },
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
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "14px" }}>🔍</span>
            <input
              placeholder="Search by name, email or bank..."
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

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["All", "Pending", "Approved", "Rejected"].map(f => (
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
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                height: "110px", borderRadius: "12px",
                background: "#e5e7eb", animation: "pulse 1.5s infinite"
              }} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredApps.length === 0 && (
          <div style={{
            background: "white", border: "2px solid #d4920a",
            borderRadius: "12px", padding: "60px", textAlign: "center"
          }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>📋</p>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#0a2818" }}>
              No applications found
            </p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
              {search ? "Try different search terms" : "No applications yet"}
            </p>
          </div>
        )}

        {/* APPLICATIONS */}
        {!loading && filteredApps.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredApps.map((app) => (
              <div key={app._id} style={{
                background: "white", borderRadius: "12px",
                border: "2px solid #d4920a", padding: "20px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>

                  {/* LEFT — User Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "46px", height: "46px", borderRadius: "50%",
                      background: "#0a2818", border: "1.5px solid #d4920a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", fontWeight: 600, color: "#f5c842", flexShrink: 0,
                    }}>
                      {app.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#0a2818" }}>
                        {app.user?.name || "Unknown User"}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                        📧 {app.user?.email}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>
                          🏦 {app.bank?.name || "Bank N/A"}
                        </span>
                        <span style={{ color: "#d4920a" }}>•</span>
                        <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>
                          ₹{app.loanAmount?.toLocaleString("en-IN")}
                        </span>
                        <span style={{ color: "#d4920a" }}>•</span>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>
                          {app.tenureYears} yrs
                        </span>
                        {app.bank?.interestRate && (
                          <>
                            <span style={{ color: "#d4920a" }}>•</span>
                            <span style={{ fontSize: "12px", color: "#1a7a3f", fontWeight: 500 }}>
                              {app.bank.interestRate}% p.a.
                            </span>
                          </>
                        )}
                        {app.purpose && (
                          <span style={{
                            fontSize: "11px", background: "#fef8e0",
                            color: "#b86e00", padding: "2px 8px",
                            borderRadius: "20px", fontWeight: 500,
                            border: "0.5px solid #d4920a"
                          }}>
                            {app.purpose}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>
                        📅 Applied: {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT — Status + Actions */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    <span style={{
                      ...statusStyle(app.status),
                      fontSize: "12px", fontWeight: 600,
                      padding: "5px 14px", borderRadius: "20px",
                    }}>
                      {app.status === "Approved" ? "✅" : app.status === "Rejected" ? "❌" : "⏳"} {app.status}
                    </span>

                    {/* Action Buttons — sirf Pending pe */}
                    {app.status === "Pending" && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => approveApp(app._id)}
                          style={{
                            background: "#1a7a3f", color: "white",
                            padding: "7px 16px", borderRadius: "8px",
                            border: "none", cursor: "pointer",
                            fontSize: "12px", fontWeight: 500,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#155c30"}
                          onMouseLeave={e => e.currentTarget.style.background = "#1a7a3f"}
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => { setRejectModal(app._id); setReason(""); }}
                          style={{
                            background: "#c0392b", color: "white",
                            padding: "7px 16px", borderRadius: "8px",
                            border: "none", cursor: "pointer",
                            fontSize: "12px", fontWeight: 500,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#a93226"}
                          onMouseLeave={e => e.currentTarget.style.background = "#c0392b"}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rejection Reason */}
                {app.status === "Rejected" && app.rejectionReason && (
                  <div style={{
                    marginTop: "14px", background: "#fdecea",
                    border: "0.5px solid #f5c6c6",
                    borderRadius: "8px", padding: "12px",
                    display: "flex", gap: "8px"
                  }}>
                    <span>❌</span>
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REJECT MODAL */}
      {rejectModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            background: "white", borderRadius: "16px",
            border: "2px solid #d4920a",
            padding: "32px", width: "100%", maxWidth: "440px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0a2818", marginBottom: "6px" }}>
              Reject Application
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
              Please provide a reason — this will be shown to the user.
            </p>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. Low credit score, insufficient income..."
              style={{
                width: "100%", padding: "12px 14px",
                border: "1.5px solid #d4920a", borderRadius: "8px",
                fontSize: "13px", outline: "none",
                color: "#0a2818", height: "110px",
                resize: "none", background: "#fafafa",
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={() => setRejectModal(null)}
                style={{
                  flex: 1, padding: "11px",
                  border: "1.5px solid #d4920a",
                  borderRadius: "8px", background: "white",
                  color: "#6b7280", cursor: "pointer", fontSize: "13px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                style={{
                  flex: 1, padding: "11px",
                  background: "#c0392b", color: "white",
                  borderRadius: "8px", border: "none",
                  cursor: "pointer", fontSize: "13px", fontWeight: 500,
                }}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}