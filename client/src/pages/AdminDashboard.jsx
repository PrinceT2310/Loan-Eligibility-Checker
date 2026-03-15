// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// export default function AdminDashboard() {

//     const [stats, setStats] = useState({
//         total: 0,
//         approved: 0,
//         rejected: 0,
//         pending: 0
//     });

//     const chartData = [
//         { name: "Approved", value: stats.approved },
//         { name: "Rejected", value: stats.rejected },
//         { name: "Pending", value: stats.pending }
//     ];

//     const COLORS = ["#22c55e", "#ef4444", "#facc15"];

//     useEffect(() => {

//         const fetchStats = async () => {

//             const res = await api.get("/admin/stats");

//             setStats(res.data);

//         };

//         fetchStats();

//     }, []);

//     return (

//         <div className="p-10 bg-gray-100 min-h-screen">

//             <h1 className="text-3xl font-bold mb-8">
//                 Admin Analytics
//             </h1>

//             <div className="grid md:grid-cols-4 gap-6">

//                 <div className="bg-white p-6 rounded shadow text-center">
//                     <p className="text-gray-500">Total Applications</p>
//                     <h2 className="text-3xl font-bold">{stats.total}</h2>
//                 </div>

//                 <div className="bg-green-100 p-6 rounded shadow text-center">
//                     <p>Approved</p>
//                     <h2 className="text-3xl font-bold">{stats.approved}</h2>
//                 </div>

//                 <div className="bg-red-100 p-6 rounded shadow text-center">
//                     <p>Rejected</p>
//                     <h2 className="text-3xl font-bold">{stats.rejected}</h2>
//                 </div>

//                 <div className="bg-yellow-100 p-6 rounded shadow text-center">
//                     <p>Pending</p>
//                     <h2 className="text-3xl font-bold">{stats.pending}</h2>
//                 </div>

//             </div>

//             <div className="bg-white p-8 rounded-xl shadow mt-10">

//                 <h2 className="text-2xl font-bold mb-6">
//                     Loan Status Analytics
//                 </h2>

//                 <div className="flex justify-center">

//                     <PieChart width={400} height={300}>

//                         <Pie
//                             data={chartData}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             dataKey="value"
//                             label
//                         >

//                             {chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                             ))}

//                         </Pie>

//                         <Tooltip />
//                         <Legend />

//                     </PieChart>

//                 </div>

//             </div>

//         </div>

//     );

// }



import { useEffect, useState } from "react";
import api from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0
    });

    const chartData = [
        { name: "Approved", value: stats.approved },
        { name: "Rejected", value: stats.rejected },
        { name: "Pending", value: stats.pending }
    ];

    const COLORS = ["#22c55e", "#ef4444", "#facc15"];

    const navigate = useNavigate();

    useEffect(() => {

        const fetchStats = async () => {

            try {
                const res = await api.get("/admin/stats");
                setStats(res.data);
            } catch (error) {
                console.error(error);
            }

        };

        fetchStats();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}

            <div className="w-64 bg-white shadow-lg flex flex-col justify-between">

                <div>

                    <div className="p-6 text-2xl font-bold text-indigo-600">
                        Admin Panel
                    </div>

                    <nav className="flex flex-col gap-2 p-4">

                        <button className="text-left px-4 py-3 rounded-lg hover:bg-indigo-50">
                            📊 Analytics
                        </button>

                        <button className="text-left px-4 py-3 rounded-lg hover:bg-indigo-50">
                            📄 Loan Applications
                        </button>

                        <button className="text-left px-4 py-3 rounded-lg hover:bg-indigo-50">
                            👥 Users
                        </button>

                        <button className="text-left px-4 py-3 rounded-lg hover:bg-indigo-50">
                            ⚙️ Settings
                        </button>

                    </nav>

                </div>

                <div className="p-4 border-t text-sm text-gray-500">
                    Loan Eligibility Checker
                </div>

            </div>


            {/* MAIN CONTENT */}

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Analytics Dashboard
                </h1>


                {/* STAT CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-xl shadow">

                        <p>Total Applications</p>
                        <h2 className="text-3xl font-bold">{stats.total}</h2>

                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow">

                        <p>Approved</p>
                        <h2 className="text-3xl font-bold">{stats.approved}</h2>

                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-xl shadow">

                        <p>Rejected</p>
                        <h2 className="text-3xl font-bold">{stats.rejected}</h2>

                    </div>

                    <div className="bg-yellow-400 text-white p-6 rounded-xl shadow">

                        <p>Pending</p>
                        <h2 className="text-3xl font-bold">{stats.pending}</h2>

                    </div>

                </div>


                {/* CHART + QUICK ACTIONS */}

                <div className="grid md:grid-cols-2 gap-8 mb-10">

                    {/* PIE CHART */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Loan Status Distribution
                        </h2>

                        <div className="flex justify-center">

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
                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />
                                    ))}

                                </Pie>

                                <Tooltip />
                                <Legend />

                            </PieChart>

                        </div>

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-6">
                            Admin Quick Actions
                        </h2>

                        <div className="flex flex-col gap-4">

                            <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700" onClick={()=>{navigate("/admin/applications")}}>
                                View All Applications
                            </button>

                            <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                Manage Users
                            </button>

                            <button className="bg-gray-800 text-white py-3 rounded-lg hover:bg-black">
                                System Settings
                            </button>

                        </div>

                    </div>

                </div>


                {/* SYSTEM SUMMARY */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4">
                        System Overview
                    </h2>

                    <p className="text-gray-600">
                        This admin panel provides insights into loan applications,
                        approval rates, and pending applications across the platform.
                        Use the analytics and quick actions to manage the system efficiently.
                    </p>

                </div>

            </div>

        </div>

    );

}

