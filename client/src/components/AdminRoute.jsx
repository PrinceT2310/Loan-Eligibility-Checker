import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ✅ Loading hote time wait karo
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#0a2818"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", color: "#f5c842", fontWeight: 700, marginBottom: "8px" }}>
            Score2Loan
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}