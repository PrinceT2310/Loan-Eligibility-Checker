import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ✅ Loading hote time wait karo — turant redirect mat karo
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
  return children;
}