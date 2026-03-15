import { useEffect, useState } from "react";
import api from "../utils/api";

export default function MyApplications() {

    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchApps = async () => {
            try {
                const res = await api.get("/applications/my");
                if (Array.isArray(res.data)) {
                    setApps(res.data);

                } else {
                    setError("Received invalid data from server.");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApps();

    }, []);

    if (loading) {
        return <div className="p-10">Loading applications...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-500">Error: {error}</div>;
    }

    return (

        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                My Loan Applications
            </h1>

            {apps.length === 0 && (
                <div className="text-gray-500 ">
                    No loan applications yet.
                </div>
            )}

            {apps.map((app) => (

                <div key={app._id} className="border p-4 mb-3 bg-white rounded shadow">

                    <p className="font-bold">
                        {app.bank?.name || "Bank not specified"}
                    </p>

                    <p>Loan Amount: ₹{app.loanAmount}</p>

                    <p>Tenure: {app.tenureYears} years</p>

                    <span
                        className={`px-2 py-1 rounded text-white text-sm ${app.status === "Approved"
                                ? "bg-green-500"
                                : app.status === "Rejected"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                            }`}
                    >
                        {app.status}
                    </span>

                </div>

            ))}

        </div>

    );

}