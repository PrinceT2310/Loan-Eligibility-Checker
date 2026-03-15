
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



// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {

//   const { user, setUser, loading } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   // Wait until auth check completes
//   if (loading) return null;

//   return (
//     <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">

//       <Link to="/" className="text-xl font-bold">
//         Loan Eligibility
//       </Link>

//       <div className="flex gap-6">

//         <Link to="/">Home</Link>

//         {!user && (
//           <Link to="/login">Login</Link>
//         )}

//         {user && (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/eligibility">Eligibility</Link>
//             <Link to="/applications">My Loans</Link>

//             {user.role === "admin" && (
//               <Link to="/admin/applications">Admin</Link>
//             )}

//             <button onClick={logout}>Logout</button>
//           </>
//         )}

//       </div>
//     </nav>
//   );
// }


// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {

//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {

//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }

//   }, [darkMode]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (

//     <nav className="bg-gray-900 dark:bg-gray-950 text-white px-8 py-4 flex justify-between items-center shadow">

//       <Link to="/" className="text-xl font-bold tracking-wide">
//         Loan Checker
//       </Link>

//       <div className="flex gap-6 items-center">

//         <Link to="/">Home</Link>

//         {!user && (
//           <Link to="/login" className="hover:text-blue-400">
//             Login
//           </Link>
//         )}

//         {user && (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/eligibility">Eligibility</Link>
//             <Link to="/applications">My Loans</Link>

//             {user.role === "admin" && (
//               <>
//                 <Link to="/admin/applications">Admin</Link>

//                 <Link
//                   to="/admin/dashboard"
//                   className="text-yellow-400 font-semibold"
//                 >
//                   Admin Dashboard
//                 </Link>
//               </>
//             )}

//             <span className="text-gray-300">
//               {user.name}
//             </span>

//             <button
//               onClick={logout}
//               className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
//         )}

//         {/* DARK MODE BUTTON */}

//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="bg-gray-700 dark:bg-gray-600 px-3 py-1 rounded"
//         >
//           {darkMode ? "☀️" : "🌙"}
//         </button>

//       </div>

//     </nav>

//   );

// }