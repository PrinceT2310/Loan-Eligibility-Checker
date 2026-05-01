import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  User,
  Calculator,
  TrendingUp,
  LogOut,
  ShieldCheck,
  Users,
  BarChart3,
  Home,
  Building2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    label: "MAIN MENU",
    items: [
      { icon: Home, name: "Home", path: "/" },
      { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
      { icon: CreditCard,      name: "Check Eligibility", path: "/eligibility" },
      { icon: FileText,        name: "My Applications", path: "/applications" },
      { icon: User,            name: "My Profile", path: "/profile" },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { icon: Calculator, name: "EMI Calculator", path: "/emi-calculator" },
      { icon: TrendingUp, name: "Credit Score", path: "/credit-score" },
    ],
  },
];

const adminItems = [
  {
    label: "ADMIN",
    items: [
      { icon: BarChart3,   name: "Admin Dashboard", path: "/admin/dashboard" },
      { icon: ShieldCheck, name: "Applications",    path: "/admin/applications" },
      { icon: Users,       name: "Manage Users",    path: "/admin/users" },
      { icon: Building2, name: "Bank Management", path: "/admin/banks" },
    ],
  },
];

export default function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const allNavItems = user?.role === "admin"
    ? [...navItems, ...adminItems]
    : navItems;

  return (
    <div
      style={{ background: "#0a2818", minHeight: "100vh", width: "240px" }}
      className="flex flex-col flex-shrink-0"
    >
      {/* LOGO */}
      <div className="px-5 py-6" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <div style={{ fontSize: "20px", fontWeight: 500, color: "#f5c842", letterSpacing: "-0.3px" }}>
            Score2Loan
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", marginTop: "2px" }}>
            LOAN ELIGIBILITY PLATFORM
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {allNavItems.map((section, si) => (
          <div key={si} className="mb-4">
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1.5px", padding: "0 8px", marginBottom: "6px" }}>
              {section.label}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all text-left"
                  style={{
                    background: active ? "rgba(212,146,10,0.15)" : "transparent",
                    color: active ? "#f5c842" : "rgba(255,255,255,0.55)",
                    fontSize: "13px",
                  }}
                >
                  <Icon size={15} style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }} />
                  {item.name}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* USER */}
      <div className="px-3 py-4" style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2.5 px-2 mb-3">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: "34px", height: "34px", background: "#155c30", border: "1.5px solid #d4920a", fontSize: "12px", fontWeight: 500, color: "#f5c842" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
              {user?.name}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
              {user?.role === "admin" ? "Administrator" : "Premium Member"}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
          style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f87171"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
}