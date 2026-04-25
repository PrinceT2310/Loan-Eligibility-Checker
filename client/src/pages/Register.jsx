import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";
import toast from "react-hot-toast";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await api.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            toast.success("Account created! Please login.");

            navigate("/login");

        } catch (err) {
           toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (

        <div className="min-h-screen flex">

            {/* LEFT SIDE */}

            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-indigo-600 to-blue-700 text-white items-center justify-center p-10">

                <div className="max-w-md text-center">

                    <div className="mb-6">
                        <Logo size="lg" dark={true} />
                    </div>

                    <p className="text-lg opacity-90">
                        Create your account and start checking loan eligibility
                        from top banks and NBFCs instantly.
                    </p>

                    <img
                        src="https://illustrations.popsy.co/white/business-analysis.svg"
                        alt="register"
                        className="mt-10"
                    />

                </div>

            </div>


            {/* RIGHT SIDE FORM */}

            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

                <form
                    onSubmit={handleRegister}
                    className="bg-white p-10 rounded-xl shadow-lg w-96"
                >

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Create Account
                    </h2>

                    <p className="text-center text-gray-500 mb-6">
                        Register to continue
                    </p>


                    {/* NAME */}

                    <input
                        name="name"
                        placeholder="Full Name"
                        className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />


                    {/* EMAIL */}

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />


                    {/* PASSWORD */}

                    <div className="relative mb-4">

                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <span
                            className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            setForm({ ...form, confirmPassword: e.target.value })
                        }
                    />


                    {/* BUTTON */}

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Register
                    </button>


                    {/* LOGIN LINK */}

                    <div className="mt-6 text-center">

                        <p className="text-sm text-gray-600">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </form>

            </div>

        </div>

    );
}