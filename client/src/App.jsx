// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";
// import Register from "./pages/Register";
// import Eligibility from "./pages/Eligibility";
// import MyApplications from "./pages/MyApplications";
// import AdminApplication from "./pages/AdminApplication";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";

// export default function App() {
//   return (
//     <>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//         <Route path="/eligibility" element={
//           <ProtectedRoute>
//             <Eligibility />
//           </ProtectedRoute>
//         } />
//         <Route path="/applications" element={
//           <ProtectedRoute>
//             <MyApplications />
//           </ProtectedRoute>
//         } />
//         <Route path="/admin/applications"
//           element={<ProtectedRoute> <AdminApplication /></ProtectedRoute>}
//         />
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//     </>

//   );
// }


import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Eligibility from "./pages/Eligibility";
import MyApplications from "./pages/MyApplications";
import AdminApplication from "./pages/AdminApplication";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {

  return (

    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/eligibility"
          element={
            <ProtectedRoute>
              <Eligibility />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute>
              <AdminApplication />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>

  );

}