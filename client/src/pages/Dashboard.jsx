
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    });

    const chartData = [
        { name: "Pending", value: stats.pending },
        { name: "Approved", value: stats.approved },
        { name: "Rejected", value: stats.rejected },
    ];

    const COLORS = ["#facc15", "#22c55e", "#ef4444"];

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {

        const fetchApps = async () => {

            try {

                const res = await api.get("/applications/my");
                const apps = res.data;

                const pending = apps.filter(a => a.status === "Pending").length;
                const approved = apps.filter(a => a.status === "Approved").length;
                const rejected = apps.filter(a => a.status === "Rejected").length;

                setStats({
                    total: apps.length,
                    pending,
                    approved,
                    rejected
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApps();

    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Loading dashboard...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 flex transition-colors duration-300">

            {/* SIDEBAR */}

            <div className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between">

                <div>

                    <div className="p-6 text-2xl font-bold text-blue-600 dark:text-blue-400">
                        LoanCheck
                    </div>

                    <nav className="flex flex-col gap-2 p-4">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                            📊 Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/eligibility")}
                            className="text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                            💳 Check Eligibility
                        </button>

                        <button
                            onClick={() => navigate("/applications")}
                            className="text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                            📄 My Applications
                        </button>

                    </nav>

                </div>


                {/* USER PROFILE */}

                <div className="p-4 border-t dark:border-gray-700">

                    <div className="flex items-center gap-3 mb-3">

                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0)}
                        </div>

                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* MAIN CONTENT */}

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Welcome back, {user?.name} 👋
                </h1>


                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow">

                        <p>Total Applications</p>
                        <h2 className="text-3xl font-bold">{stats.total}</h2>

                    </div>

                    <div className="bg-yellow-400 text-white p-6 rounded-xl shadow">

                        <p>Pending</p>
                        <h2 className="text-3xl font-bold">{stats.pending}</h2>

                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow">

                        <p>Approved</p>
                        <h2 className="text-3xl font-bold">{stats.approved}</h2>

                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-xl shadow">

                        <p>Rejected</p>
                        <h2 className="text-3xl font-bold">{stats.rejected}</h2>

                    </div>

                </div>


                {/* CHART + ACTIONS */}

                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    {/* CHART */}

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-4 dark:text-white">
                            Loan Status Overview
                        </h2>

                        <PieChart width={350} height={300}>

                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >

                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}

                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-6 dark:text-white">
                            Quick Actions
                        </h2>

                        <div className="grid gap-4">

                            <button
                                onClick={() => navigate("/eligibility")}
                                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                            >
                                Check Loan Eligibility
                            </button>

                            <button
                                onClick={() => navigate("/applications")}
                                className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                            >
                                View My Applications
                            </button>

                        </div>

                    </div>

                </div>


                {/* RECENT ACTIVITY */}

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Recent Activity
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400">
                        Your latest loan applications will appear here.
                    </p>

                </div>

            </div>

        </div>

    );
}