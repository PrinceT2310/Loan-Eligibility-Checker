import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || "",
    monthlyIncome: user?.monthlyIncome || "",
    creditScore: user?.creditScore || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/auth/profile", {
        name: form.name,
        monthlyIncome: Number(form.monthlyIncome),
        creditScore: Number(form.creditScore),
      });
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const scoreColor = () => {
    const s = Number(form.creditScore);
    if (s >= 750) return "#1a7a3f";
    if (s >= 650) return "#b86e00";
    return "#c0392b";
  };

  const scoreLabel = () => {
    const s = Number(form.creditScore);
    if (s >= 750) return "Excellent";
    if (s >= 700) return "Good";
    if (s >= 650) return "Fair";
    return "Poor";
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px",
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
          My Profile
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
          Update your financial details for accurate loan eligibility
        </p>
      </div>

      <div style={{ padding: "24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "900px" }}>

          {/* LEFT — PROFILE CARD */}
          <div style={{
            background: "white", borderRadius: "12px",
            border: "2px solid #d4920a", padding: "24px"
          }}>

            {/* AVATAR */}
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              paddingBottom: "20px", marginBottom: "20px",
              borderBottom: "1px solid #fef3c7"
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "#0a2818", border: "2px solid #d4920a",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", fontWeight: 600, color: "#f5c842", flexShrink: 0,
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0a2818" }}>
                  {user?.name}
                </h2>
                <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                  {user?.email}
                </p>
                <span style={{
                  fontSize: "11px", background: "#d4f5e0",
                  color: "#155c30", padding: "2px 10px",
                  borderRadius: "20px", marginTop: "6px",
                  display: "inline-block", fontWeight: 500,
                  border: "0.5px solid #a7f3c0",
                  textTransform: "capitalize",
                }}>
                  {user?.role === "admin" ? "👑 Administrator" : "⭐ Premium Member"}
                </span>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Monthly Income */}
              <div>
                <label style={labelStyle}>Monthly Income (₹)</label>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d4920a", fontSize: "13px", fontWeight: 500
                  }}>₹</span>
                  <input
                    name="monthlyIncome"
                    type="number"
                    value={form.monthlyIncome}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    style={{ ...inputStyle, paddingLeft: "28px" }}
                  />
                </div>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                  Used to calculate your loan eligibility
                </p>
              </div>

              {/* Credit Score */}
              <div>
                <label style={labelStyle}>Credit Score (300–900)</label>
                <input
                  name="creditScore"
                  type="number"
                  value={form.creditScore}
                  onChange={handleChange}
                  min={300} max={900}
                  placeholder="e.g. 750"
                  style={inputStyle}
                />
                {form.creditScore && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af", marginBottom: "5px" }}>
                      <span>Poor (300)</span>
                      <span>Excellent (900)</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "6px" }}>
                      <div style={{
                        height: "6px", borderRadius: "4px",
                        background: scoreColor(), transition: "width 0.3s",
                        width: `${((Number(form.creditScore) - 300) / 600) * 100}%`
                      }} />
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 500, marginTop: "6px", color: scoreColor() }}>
                      {scoreLabel()} — {form.creditScore}
                    </p>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <button
  type="submit"
  disabled={saving}
  style={{
    width: "100%", padding: "12px",
    background: saving ? "#9ca3af" : "#0a2818",
    color: "#f5c842", borderRadius: "8px",
    border: "2px solid #d4920a",   // ✅ gold border add
    cursor: saving ? "not-allowed" : "pointer",
    fontSize: "14px", fontWeight: 500, marginTop: "4px",
  }}
>
  {saving ? "Saving..." : "💾 Save Changes"}
</button>
            </form>
          </div>

          {/* RIGHT — INFO CARDS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Financial Summary */}
<div style={{
  background: "white",        // ✅ dark green se white
  borderRadius: "12px",
  border: "2px solid #d4920a",
  padding: "24px"
}}>
  <h3 style={{ 
    fontSize: "14px", fontWeight: 500, 
    color: "#0a2818",           // ✅ gold se dark green
    marginBottom: "16px" 
  }}>
    Financial Summary
  </h3>
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {[
      { label: "Monthly Income", value: user?.monthlyIncome ? `₹${Number(user.monthlyIncome).toLocaleString("en-IN")}` : "Not set" },
      { label: "Credit Score",   value: user?.creditScore   ? user.creditScore : "Not set" },
      { label: "Member Since",   value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—" },
    ].map((item, i) => (
      <div key={i} style={{
        display: "flex", justifyContent: "space-between",
        paddingBottom: "10px",
        borderBottom: "0.5px solid #fef3c7"  // ✅ gold tint border
      }}>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>
          {item.label}
        </span>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#0a2818" }}>
          {item.value}
        </span>
      </div>
    ))}
  </div>
</div>

            {/* Credit Score Meter */}
            {user?.creditScore && (
              <div style={{
                background: "white", borderRadius: "12px",
                border: "2px solid #d4920a", padding: "24px"
              }}>
                <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#0a2818", marginBottom: "16px" }}>
                  Credit Score Analysis
                </h3>
                {[
                  { label: "Poor",      range: "300–549", color: "#c0392b", width: "20%" },
                  { label: "Fair",      range: "550–649", color: "#e67e22", width: "40%" },
                  { label: "Good",      range: "650–749", color: "#b86e00", width: "60%" },
                  { label: "Very Good", range: "750–799", color: "#1a7a3f", width: "80%" },
                  { label: "Excellent", range: "800–900", color: "#155c30", width: "100%" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "70px", fontSize: "11px", color: "#6b7280" }}>{s.label}</div>
                    <div style={{ flex: 1, background: "#f3f4f6", borderRadius: "4px", height: "6px" }}>
                      <div style={{ height: "6px", borderRadius: "4px", background: s.color, width: s.width }} />
                    </div>
                    <div style={{ width: "60px", fontSize: "11px", color: "#9ca3af", textAlign: "right" }}>{s.range}</div>
                  </div>
                ))}
                <div style={{
                  marginTop: "14px", padding: "10px 14px",
                  background: "#d4f5e0", borderRadius: "8px",
                  border: "0.5px solid #a7f3c0"
                }}>
                  <p style={{ fontSize: "12px", color: "#155c30", fontWeight: 500 }}>
                    Your Score: {user.creditScore} —{" "}
                    {user.creditScore >= 750 ? "Excellent! Best loan rates available." :
                     user.creditScore >= 650 ? "Good. Most banks will approve." :
                     "Improve your score for better offers."}
                  </p>
                </div>
              </div>
            )}

            {/* Tip Card */}
            <div style={{
              background: "#fef8e0", borderRadius: "12px",
              border: "2px solid #d4920a", padding: "20px"
            }}>
              <p style={{ fontSize: "13px", color: "#b86e00", fontWeight: 600, marginBottom: "8px" }}>
                💡 Why update your profile?
              </p>
              <p style={{ fontSize: "12px", color: "#92400e", lineHeight: "1.6" }}>
                Accurate income and credit score helps us show the most relevant
                bank offers and gives better eligibility results. Keep your
                profile updated for the best experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}