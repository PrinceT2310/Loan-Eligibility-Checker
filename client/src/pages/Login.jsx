import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api.js";
import toast from "react-hot-toast";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate(res.data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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

          {/* Tagline */}
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "white", lineHeight: "1.3", marginBottom: "16px" }}>
            Find Your Perfect
            <span style={{ color: "#f5c842", display: "block" }}>Loan Offer</span>
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", marginBottom: "40px" }}>
            Compare loan offers from 150+ banks and NBFCs instantly.
            Get the best interest rates tailored to your profile.
          </p>

          {/* Features */}
          {[
            { icon: "⚡", text: "Instant eligibility check" },
            { icon: "🏦", text: "150+ lending partners" },
            { icon: "🔒", text: "100% secure & private" },
            { icon: "📊", text: "Smart loan comparison" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(245,200,66,0.1)",
                border: "1px solid rgba(245,200,66,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                {f.text}
              </span>
            </div>
          ))}

          {/* Stats */}
          <div style={{
            display: "flex", gap: "24px", marginTop: "40px",
            paddingTop: "24px", borderTop: "0.5px solid rgba(255,255,255,0.1)"
          }}>
            {[
              { value: "150+", label: "Banks" },
              { value: "Instant", label: "Results" },
              { value: "100%", label: "Secure" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#f5c842" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div style={{
        width: "50%", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "48px",
        background: "#f8faf9",
      }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0a2818", marginBottom: "6px" }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "32px" }}>
            Login to your Score2Loan account
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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

            {/* Login Button */}
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
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>or</span>
            <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
          </div>

          {/* Register Link */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#d4920a", fontWeight: 600, textDecoration: "none" }}
              >
                Register Free
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