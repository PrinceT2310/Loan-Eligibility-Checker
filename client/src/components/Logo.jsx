// src/components/Logo.jsx — ye file banao
export default function Logo({ size = "md", dark = false }) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const r = sizes[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg width={r} height={r} viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="30" fill="#3730A3"/>
        <circle cx="30" cy="30" r="24" fill="#4338CA"/>
        <path d="M20 38 L20 22 L40 22" fill="none" stroke="#E0E7FF"
          strokeWidth="3" strokeLinecap="round"/>
        <path d="M20 30 L38 30" fill="none" stroke="#E0E7FF"
          strokeWidth="3" strokeLinecap="round"/>
        <path d="M26 30 L40 38" fill="none" stroke="#A5B4FC"
          strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="17" y="42" width="6" height="9" rx="2" fill="#6366F1"/>
        <rect x="27" y="38" width="6" height="13" rx="2" fill="#818CF8"/>
        <rect x="37" y="34" width="6" height="17" rx="2" fill="#A5B4FC"/>
      </svg>

      <span style={{
        fontSize: size === "lg" ? 24 : size === "md" ? 20 : 16,
        fontWeight: 700,
        letterSpacing: "-0.5px",
      }}>
        <span style={{ color: dark ? "#E0E7FF" : "#3730A3" }}>Score</span>
        <span style={{ color: "#6366F1" }}>2</span>
        <span style={{ color: dark ? "#E0E7FF" : "#3730A3" }}>Loan</span>
      </span>
    </div>
  );
}