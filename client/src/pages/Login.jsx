// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// // Assuming you have an api instance defined in a file like 'src/api.js'
// import api from "../utils/api.js";

// export default function Login() {

//     const { setUser } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await api.post("/auth/login", { email, password });

//             //Store Token:
//             localStorage.setItem("token", res.data.token);

//             setUser(res.data.user);

//             Promise.resolve().then(() => {
//                 navigate("/");
//             });
//         }
//         catch (error) {
//             alert(error.response?.data?.message || "Login failed");
//         };
//     };


//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <form
//                 onSubmit={handleLogin}
//                 className="bg-white p-8 rounded shadow w-96"
//             >
//                 <h2 className="text-2xl font-bold mb-4"> Login </h2>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full p-2 border mb-4 "
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full p-2 border mb-4 "
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button className="w-full bg-blue-500 text-white p-2 rounded">
//                     Login
//                 </button>

//                 <div className="mt-4 text-center">
//                     <p className="text-sm text-gray-600">
//                         Don't have an account?{" "}
//                         <Link to="/register" className="text-blue-500 hover:underline">
//                             Register
//                         </Link>
//                     </p>
//                 </div>
//             </form>
//         </div>
//     )
// }




import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api.js";

export default function Login() {

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (

        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white items-center justify-center p-10">

                <div className="max-w-md text-center">

                    <h1 className="text-4xl font-bold mb-6">
                        Loan Eligibility Checker
                    </h1>

                    <p className="text-lg opacity-90">
                        Check your loan eligibility instantly and compare offers
                        from top banks and NBFCs in India.
                    </p>

                    <img
                        src="https://illustrations.popsy.co/white/business-analysis.svg"
                        alt="loan"
                        className="mt-10"
                    />

                </div>

            </div>


            {/* RIGHT SIDE LOGIN FORM */}

            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">

                <form
                    onSubmit={handleLogin}
                    className="bg-white p-10 rounded-xl shadow-lg w-96"
                >

                    <h2 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mb-6">
                        Login to continue
                    </p>


                    {/* EMAIL */}

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    {/* PASSWORD */}

                    <div className="mb-4 relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>


                    {/* REGISTER LINK */}

                    <div className="mt-6 text-center">

                        <p className="text-sm text-gray-600">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Register
                            </Link>

                        </p>

                    </div>

                </form>

            </div>

        </div>
    );
}