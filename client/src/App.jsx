import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Eligibility from "./pages/Eligibility";
import MyApplications from "./pages/MyApplications";
import AdminApplication from "./pages/AdminApplication";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import EmiCalculator from "./pages/EmiCalculator";
import CreditScore from "./pages/CreditScore";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <Toaster position="top-right" />
      <Routes>

        {/* Public Routes — No Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected Routes — With Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/eligibility"
          element={
            <ProtectedRoute>
              <Layout>
                <Eligibility />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Layout>
                <MyApplications />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes — With Layout */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <Layout>
                <AdminApplication />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/emi-calculator"
          element={
            <ProtectedRoute>
              <Layout>
                <EmiCalculator />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/credit-score"
          element={
            <ProtectedRoute>
              <Layout>
                <CreditScore />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}