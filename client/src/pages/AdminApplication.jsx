import { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminApplications() {

    const [apps, setApps] = useState([]);

    const fetchApps = async () => {
        const res = await api.get("/applications");
        setApps(res.data);
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const updateStatus = async (id, status) => {
        await api.put(`/applications/${id}/status`, { status });
        fetchApps();
    };

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-6">
                Admin Application
            </h1>

            {apps.map((app) => (

                <div key={app._id} className="border p-4 mb-6 bg-white rounded shadow">

                    <p className="font-bold text-lg">
                        {app.bank?.name}
                    </p>

                    <p>User : {app.user?.name}</p>

                    <p>Email : {app.user?.email}</p>

                    <p>Loan : {app.loanAmount}</p>

                    <p>Status : {app.status}</p>



                
                    {/* Buttons */}
                    {/* <div className="mt-3">

                        <button
                            onClick={() => updateStatus(app._id, "Approved")}
                            className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => updateStatus(app._id, "Rejected")}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Reject
                        </button>

                    </div> */}


                    {app.status === "Pending" && (
                        <div className="mt-3">
                            <button
                                onClick={() => updateStatus(app._id, "Approved")}
                                className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    )}

                </div>

            ))}

        </div>
    );
}