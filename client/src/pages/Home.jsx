import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const banks = [
    { name: "HDFC Bank",           short: "HD" },
    { name: "ICICI Bank",          short: "IC" },
    { name: "State Bank of India", short: "SB" },
    { name: "Axis Bank",           short: "AX" },
    { name: "Kotak Mahindra",      short: "KO" },
    { name: "IndusInd Bank",       short: "IN" },
    { name: "Yes Bank",            short: "YB" },
    { name: "Punjab National",     short: "PN" },
    { name: "Bank of Baroda",      short: "BB" },
    { name: "Canara Bank",         short: "CA" },
  ];

  const nbfcs = [
    { name: "Bajaj Finserv",         short: "BF" },
    { name: "Tata Capital",          short: "TC" },
    { name: "Aditya Birla Finance",  short: "AB" },
    { name: "Mahindra Finance",      short: "MF" },
    { name: "L&T Finance",           short: "LT" },
    { name: "Muthoot Finance",       short: "MU" },
    { name: "Shriram Finance",       short: "SF" },
    { name: "Hero FinCorp",          short: "HF" },
    { name: "Piramal Finance",       short: "PF" },
    { name: "Cholamandalam",         short: "CH" },
  ];

  const features = [
    { icon: "⚡", title: "Instant Results",     desc: "Get loan eligibility within seconds — no waiting, no paperwork." },
    { icon: "🏦", title: "Multiple Banks",       desc: "Compare offers from 150+ banks and NBFCs across India." },
    { icon: "🔒", title: "100% Secure",          desc: "Your financial data is encrypted and never shared." },
    { icon: "📊", title: "Smart Analysis",       desc: "AI-powered eligibility check with DTI ratio and credit score analysis." },
    { icon: "💰", title: "Best Rates",           desc: "Find the lowest interest rates tailored to your profile." },
    { icon: "📱", title: "Easy Tracking",        desc: "Track all your loan applications in one place." },
  ];

  const steps = [
    { step: "01", title: "Create Account",      desc: "Register and set up your financial profile in minutes." },
    { step: "02", title: "Enter Details",        desc: "Fill in your income, credit score, and loan requirements." },
    { step: "03", title: "Check Eligibility",   desc: "Instantly see which banks will approve your loan." },
    { step: "04", title: "Apply & Track",        desc: "Apply to your preferred bank and track status in real-time." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8faf9", fontFamily: "inherit" }}>

      {/* NAVBAR */}
      <nav style={{
        background: "#0a2818",
        borderBottom: "1px solid rgba(245,200,66,0.2)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "16px 24px"
        }}>
          {/* Logo */}
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "#f5c842", letterSpacing: "-0.3px" }}>
              Score2Loan
            </div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px" }}>
              LOAN ELIGIBILITY PLATFORM
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {["Home", "Banks", "How It Works", "About"].map((item) => (
              <span
                key={item}
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", cursor: "pointer", fontWeight: 400 }}
                onMouseEnter={e => e.target.style.color = "#f5c842"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ display: "flex", gap: "10px" }}>
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  background: "#d4920a", color: "white",
                  padding: "9px 20px", borderRadius: "8px",
                  border: "none", cursor: "pointer",
                  fontSize: "13px", fontWeight: 500,
                }}
              >
                Dashboard →
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    background: "transparent", color: "rgba(255,255,255,0.7)",
                    padding: "9px 20px", borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    cursor: "pointer", fontSize: "13px",
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  style={{
                    background: "#d4920a", color: "white",
                    padding: "9px 20px", borderRadius: "8px",
                    border: "none", cursor: "pointer",
                    fontSize: "13px", fontWeight: 500,
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 50%, #1a5c30 100%)",
        padding: "80px 24px",
        borderBottom: "2px solid #d4920a",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.3)",
              padding: "6px 14px", borderRadius: "20px", marginBottom: "20px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f5c842", display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: "#f5c842", fontWeight: 500 }}>India's Trusted Loan Platform</span>
            </div>

            <h1 style={{
              fontSize: "42px", fontWeight: 700, color: "white",
              lineHeight: "1.2", marginBottom: "20px", letterSpacing: "-0.5px"
            }}>
              Check Your Loan
              <span style={{ color: "#f5c842", display: "block" }}>Eligibility Instantly</span>
            </h1>

            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", marginBottom: "32px" }}>
              Compare loan offers from 150+ banks and NBFCs across India.
              Find the best interest rates tailored to your financial profile — in seconds.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => user ? navigate("/eligibility") : navigate("/register")}
                style={{
                  background: "#d4920a", color: "white",
                  padding: "14px 28px", borderRadius: "10px",
                  border: "none", cursor: "pointer",
                  fontSize: "14px", fontWeight: 600,
                }}
              >
                {user ? "Check Eligibility →" : "Get Started Free →"}
              </button>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "transparent", color: "rgba(255,255,255,0.8)",
                  padding: "14px 28px", borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer", fontSize: "14px",
                }}
              >
                Login
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "20px", marginTop: "32px" }}>
              {[
                { value: "150+", label: "Lending Partners" },
                { value: "Instant", label: "Eligibility Check" },
                { value: "100%", label: "Secure Process" },
              ].map((b, i) => (
                <div key={i}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#f5c842" }}>{b.value}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Floating Card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(245,200,66,0.25)",
              borderRadius: "16px", padding: "28px",
              width: "100%", maxWidth: "360px",
            }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", letterSpacing: "1px" }}>
                ELIGIBILITY PREVIEW
              </p>
              {[
                { label: "Monthly Income",  value: "₹50,000",  color: "white" },
                { label: "Credit Score",    value: "762",       color: "#1e9147" },
                { label: "Loan Amount",     value: "₹10,00,000", color: "white" },
                { label: "Approval Chance", value: "87%",       color: "#f5c842" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.08)" : "none"
                }}>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: item.color }}>{item.value}</span>
                </div>
              ))}
              <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Approval Probability</span>
                  <span style={{ fontSize: "11px", color: "#f5c842", fontWeight: 600 }}>87%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "6px" }}>
                  <div style={{ height: "6px", borderRadius: "4px", background: "#1e9147", width: "87%" }} />
                </div>
              </div>
              <button
                onClick={() => user ? navigate("/eligibility") : navigate("/register")}
                style={{
                  width: "100%", marginTop: "16px", padding: "12px",
                  background: "#d4920a", color: "white",
                  borderRadius: "8px", border: "none",
                  cursor: "pointer", fontSize: "13px", fontWeight: 600,
                }}
              >
                Check Your Eligibility →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: "70px 24px", background: "#f8faf9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0a2818", marginBottom: "10px" }}>
              How It Works
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              4 simple steps to get your loan approved
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "12px",
                border: "2px solid #d4920a", padding: "24px",
                textAlign: "center",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: "#0a2818", border: "2px solid #d4920a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 700, color: "#f5c842",
                  margin: "0 auto 14px",
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#0a2818", marginBottom: "8px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.6" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: "70px 24px", background: "#0a2818", borderTop: "2px solid #d4920a", borderBottom: "2px solid #d4920a" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#f5c842", marginBottom: "10px" }}>
              Why Choose Score2Loan
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
              Everything you need to find the perfect loan
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "12px",
                border: "1px solid rgba(245,200,66,0.2)",
                padding: "24px",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#f5c842", marginBottom: "8px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNER BANKS */}
      <div style={{ padding: "70px 24px", background: "#f8faf9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0a2818", marginBottom: "10px" }}>
              Partner Banks
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Trusted by India's leading financial institutions
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "12px", marginBottom: "40px" }}>
            {banks.map((bank, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "10px",
                border: "2px solid #d4920a", padding: "16px",
                textAlign: "center",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "#0a2818", border: "1.5px solid #d4920a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 700, color: "#f5c842",
                  margin: "0 auto 10px",
                }}>
                  {bank.short}
                </div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#0a2818" }}>
                  {bank.name}
                </p>
              </div>
            ))}
          </div>

          {/* NBFCs */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0a2818", marginBottom: "8px" }}>
              NBFC Partners
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "12px" }}>
            {nbfcs.map((nbfc, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "10px",
                border: "2px solid #d4920a", padding: "16px",
                textAlign: "center",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "#155c30", border: "1.5px solid #d4920a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 700, color: "#f5c842",
                  margin: "0 auto 10px",
                }}>
                  {nbfc.short}
                </div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#0a2818" }}>
                  {nbfc.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{
        background: "linear-gradient(135deg, #0f3d22 0%, #0a2818 60%, #1a5c30 100%)",
        padding: "70px 24px",
        borderTop: "2px solid #d4920a",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#f5c842", marginBottom: "14px" }}>
          Ready to Get Your Loan?
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>
          Join thousands of users who found their perfect loan through Score2Loan
        </p>
        <button
          onClick={() => user ? navigate("/eligibility") : navigate("/register")}
          style={{
            background: "#d4920a", color: "white",
            padding: "16px 40px", borderRadius: "10px",
            border: "none", cursor: "pointer",
            fontSize: "15px", fontWeight: 600,
          }}
        >
          {user ? "Check Eligibility Now →" : "Start For Free →"}
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#050f08", borderTop: "1px solid rgba(245,200,66,0.15)", padding: "40px 24px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px", marginBottom: "32px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#f5c842", marginBottom: "8px" }}>Score2Loan</div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: "1.7" }}>
                India's trusted loan eligibility platform. Compare offers from 150+ banks and NBFCs instantly.
              </p>
            </div>
            {[
              { title: "Company",   links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Resources", links: ["EMI Calculator", "Interest Rates", "Help Center"] },
              { title: "Legal",     links: ["Privacy Policy", "Terms of Service"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "12px", letterSpacing: "1px" }}>
                  {col.title.toUpperCase()}
                </h4>
                {col.links.map((link, j) => (
                  <p key={j} style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", cursor: "pointer" }}>
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
            paddingTop: "16px", textAlign: "center",
          }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()} Score2Loan. All rights reserved. Built with ❤️ using MERN Stack
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}