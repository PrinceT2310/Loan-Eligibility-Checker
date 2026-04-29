import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    borderRadius: "8px", border: "1.5px solid #d4920a",
    fontSize: "13px", outline: "none",
    color: "#0a2818", background: "#fafafa",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>

      {/* LEFT — Branding */}
      <div style={{
        width: "50%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", padding: "48px",
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 60%, #1a5c30 100%)",
        borderRight: "2px solid #d4920a",
      }}>
        <div style={{ maxWidth: "380px", width: "100%" }}>

          {/* Logo */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#f5c842", letterSpacing: "-0.5px" }}>
              Score2Loan
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "2px", marginTop: "4px" }}>
              LOAN ELIGIBILITY PLATFORM
            </div>
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", lineHeight: "1.3", marginBottom: "16px" }}>
            Start Your
            <span style={{ color: "#f5c842", display: "block" }}>Loan Journey</span>
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", marginBottom: "40px" }}>
            Create your free account and instantly compare loan
            offers from India's top banks and NBFCs.
          </p>

          {/* Steps */}
          {[
            { step: "01", text: "Create your free account" },
            { step: "02", text: "Set up your financial profile" },
            { step: "03", text: "Check loan eligibility instantly" },
            { step: "04", text: "Apply and track your loans" },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "14px",
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(245,200,66,0.15)",
                border: "1px solid rgba(245,200,66,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700, color: "#f5c842", flexShrink: 0,
              }}>
                {s.step}
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                {s.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Register Form */}
      <div style={{
        width: "50%", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "48px",
        background: "#f8faf9",
      }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0a2818", marginBottom: "6px" }}>
            Create Account
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "28px" }}>
            Join Score2Loan — it's free!
          </p>

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Full Name
              </label>
              <input
                placeholder="Prince Tyagi"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ ...inputStyle, paddingRight: "60px" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "11px", color: "#d4920a",
                    cursor: "pointer", fontWeight: 500,
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                style={{
                  ...inputStyle,
                  borderColor: form.confirmPassword && form.password !== form.confirmPassword ? "#c0392b" : "#d4920a"
                }}
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "4px" }}>
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px",
                background: loading ? "#9ca3af" : "#0a2818",
                color: "#f5c842", borderRadius: "8px",
                border: "2px solid #d4920a",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "14px", fontWeight: 600, marginTop: "4px",
              }}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>or</span>
            <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
          </div>

          {/* Login Link */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#d4920a", fontWeight: 600, textDecoration: "none" }}
              >
                Login
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span
              onClick={() => navigate("/")}
              style={{ fontSize: "12px", color: "#9ca3af", cursor: "pointer" }}
            >
              ← Back to Home
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}