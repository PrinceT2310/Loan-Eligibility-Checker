
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow">

      <Link to="/" className="text-xl font-bold tracking-wide">
        Loan Checker
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        {!user && (
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
        )}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/eligibility">Eligibility</Link>
            <Link to="/applications">My Loans</Link>

            {user.role === "admin" && (
              <>
                <Link to="/admin/applications">User Applications</Link>
                <Link
                  to="/admin/dashboard"
                  className="text-yellow-400 font-semibold"
                >
                  Admin Dashboard
                </Link>

              </>

            )}

            <span className="text-gray-300">
              {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

