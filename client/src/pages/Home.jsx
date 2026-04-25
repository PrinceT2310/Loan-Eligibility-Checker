import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Home() {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const banks = [
        { name: "HDFC Bank", logo: "/logos/hdfc.png" },
        { name: "ICICI Bank", logo: "/logos/icici.png" },
        { name: "State Bank of India", logo: "/logos/sbi.png" },
        { name: "Axis Bank", logo: "/logos/axis.png" },
        { name: "Kotak Mahindra Bank", logo: "/logos/kotak.png" },
        { name: "IndusInd Bank", logo: "/logos/indusind.png" },
        { name: "Yes Bank", logo: "/logos/yes.png" },
        { name: "Punjab National Bank", logo: "/logos/pnb.png" },
        { name: "Bank of Baroda", logo: "/logos/bob.png" },
        { name: "Canara Bank", logo: "/logos/canara.png" },
    ];

    const nbfcs = [
        { name: "Bajaj Finserv", logo: "/logos/bajaj.png" },
        { name: "Tata Capital", logo: "/logos/tata.png" },
        { name: "Aditya Birla Finance", logo: "/logos/adbl.png" },
        { name: "Mahindra Finance", logo: "/logos/mahindra.png" },
        { name: "L&T Finance", logo: "/logos/l&t.png" },
        { name: "Muthoot Finance", logo: "/logos/muthoot.png" },
        { name: "Shriram Finance", logo: "/logos/shriram.png" },
        { name: "Hero FinCorp", logo: "/logos/hero.png" },
        { name: "Piramal Finance", logo: "/logos/piramal.png" },
        { name: "Cholamandalam Finance", logo: "/logos/chola.png" },
    ];

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">

            {/* NAVBAR */}

            <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow sticky top-0 z-50">

                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                    <div onClick={() => navigate("/")} className="cursor-pointer">
                        <Logo size="md" />
                    </div>

                    <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">

                        <button
                            onClick={() => navigate("/")}
                            className="hover:text-blue-600 transition"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/eligibility")}
                            className="hover:text-blue-600 transition"
                        >
                            Check Eligibility
                        </button>

                        <button className="hover:text-blue-600 transition">
                            Banks
                        </button>

                        <button className="hover:text-blue-600 transition">
                            About
                        </button>

                    </div>

                    <div>

                        {user ? (

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Dashboard
                            </button>

                        ) : (

                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </button>

                        )}

                    </div>

                </div>

            </nav>


            {/* HERO SECTION */}

            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-28">

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

                    <div>

                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Check Your Loan Eligibility Instantly
                        </h1>

                        <p className="text-lg opacity-90 mb-8">
                            Compare loan offers from top banks and NBFCs across India.
                            Find the best loan option tailored to your needs within seconds.
                        </p>

                        <div className="flex gap-4">

                            <button
                                onClick={() => {
                                    if (user) {
                                        navigate("/eligibility");
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
                            >
                                {user ? "Check Eligibility" : "Get Started"}
                            </button>

                            <button
                                className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
                            >
                                Learn More
                            </button>

                        </div>

                    </div>

                    <div className="hidden md:block">

                        <img
                            src="https://illustrations.popsy.co/white/business-analysis.svg"
                            alt="loan"
                            className="w-full"
                        />

                    </div>

                </div>

            </div>


            {/* STATS SECTION */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 text-center dark:bg-gray-900">

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-3xl font-bold text-blue-600">150+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Lending Partners</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-3xl font-bold text-blue-600">Instant</h3>
                    <p className="text-gray-600 dark:text-gray-400">Eligibility Check</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-3xl font-bold text-blue-600">100%</h3>
                    <p className="text-gray-600 dark:text-gray-400">Secure Process</p>
                </div>

            </div>


            {/* BANKS */}

            <div className="p-10 dark:bg-gray-900">

                <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
                    Partner Banks
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                    {banks.map((bank, index) => (

                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center hover:shadow-lg transition"
                        >

                            <img
                                src={bank.logo}
                                alt={bank.name}
                                className="h-12 mx-auto mb-3 object-contain"
                                onError={(e) => {
                                    e.target.src =
                                        "https://cdn-icons-png.flaticon.com/512/2830/2830284.png";
                                }}
                            />

                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                {bank.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* NBFC */}

            <div className="p-10 bg-gray-50 dark:bg-gray-950">

                <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
                    NBFC Lending Partners
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                    {nbfcs.map((nbfc, index) => (

                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center hover:shadow-lg transition"
                        >

                            <img
                                src={nbfc.logo}
                                alt={nbfc.name}
                                className="h-12 mx-auto mb-3 object-contain"
                            />

                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                {nbfc.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* FOOTER */}

            <footer className="bg-gray-900 text-gray-300 mt-auto">

                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 p-10">

                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">
                            Score2Loan
                        </h3>
                        <p className="text-sm">
                            Compare loans from top banks and NBFCs instantly.
                            Find the best loan offers tailored to your needs.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-3">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>About</li>
                            <li>Careers</li>
                            <li>Blog</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-3">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Loan Calculator</li>
                            <li>Interest Rates</li>
                            <li>Help Center</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>

                </div>

                <div className="text-center border-t border-gray-700 py-4 text-sm">
                    © {new Date().getFullYear()} Score2Loan All rights reserved.
                </div>

            </footer>

        </div>
    );
}




// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Home() {

//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const banks = [
//         { name: "HDFC Bank", logo: "/logos/hdfc.png" },
//         { name: "ICICI Bank", logo: "/logos/icici.png" },
//         { name: "State Bank of India", logo: "/logos/sbi.png" },
//         { name: "Axis Bank", logo: "/logos/axis.png" },
//         { name: "Kotak Mahindra Bank", logo: "/logos/kotak.png" },
//         { name: "IndusInd Bank", logo: "/logos/indusind.png" },
//         { name: "Yes Bank", logo: "/logos/yes.png" },
//         { name: "Punjab National Bank", logo: "/logos/pnb.png" },
//         { name: "Bank of Baroda", logo: "/logos/bob.png" },
//         { name: "Canara Bank", logo: "/logos/canara.png" },
//     ];

//     const nbfcs = [
//         { name: "Bajaj Finserv", logo: "/logos/bajaj.png" },
//         { name: "Tata Capital", logo: "/logos/tata.png" },
//         { name: "Aditya Birla Finance", logo: "/logos/adbl.png" },
//         { name: "Mahindra Finance", logo: "/logos/mahindra.png" },
//         { name: "L&T Finance", logo: "/logos/l&t.png" },
//         { name: "Muthoot Finance", logo: "/logos/muthoot.png" },
//         { name: "Shriram Finance", logo: "/logos/shriram.png" },
//         { name: "Hero FinCorp", logo: "/logos/hero.png" },
//         { name: "Piramal Finance", logo: "/logos/piramal.png" },
//         { name: "Cholamandalam Finance", logo: "/logos/chola.png" },
//     ];

//     return (

//         <div className="min-h-screen bg-gray-100 flex flex-col">

//             {/* HERO SECTION */}

//             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center">

//                 <h1 className="text-5xl font-bold mb-6">
//                     Check Your Loan Eligibility
//                 </h1>

//                 <p className="text-lg mb-8 max-w-xl mx-auto">
//                     Compare loan offers from top banks and NBFCs in India.
//                     Apply easily and track your loan applications in one place.
//                 </p>

//                 <button
//                     onClick={() => {
//                         if (user) {
//                             navigate("/eligibility");
//                         } else {
//                             navigate("/login");
//                         }
//                     }}
//                     className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
//                 >
//                     {user ? "Check Eligibility" : "Get Started"}
//                 </button>

//             </div>

//             {/* STATS SECTION */}

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 text-center">

//                 <div className="bg-white p-6 rounded shadow">
//                     <h3 className="text-3xl font-bold text-blue-600">150+</h3>
//                     <p className="text-gray-600">Lending Partners</p>
//                 </div>

//                 <div className="bg-white p-6 rounded shadow">
//                     <h3 className="text-3xl font-bold text-blue-600">Instant</h3>
//                     <p className="text-gray-600">Eligibility Check</p>
//                 </div>

//                 <div className="bg-white p-6 rounded shadow">
//                     <h3 className="text-3xl font-bold text-blue-600">100%</h3>
//                     <p className="text-gray-600">Secure Process</p>
//                 </div>

//             </div>

//             {/* BANKS */}

//             <div className="p-10">

//                 <h2 className="text-3xl font-bold text-center mb-10">
//                     Partner Banks
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

//                     {banks.map((bank, index) => (

//                         <div
//                             key={index}
//                             className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition"
//                         >

//                             <img
//                                 src={bank.logo}
//                                 alt={bank.name}
//                                 className="h-12 mx-auto mb-3 object-contain"
//                                 onError={(e) => {
//                                     e.target.src =
//                                         "https://cdn-icons-png.flaticon.com/512/2830/2830284.png";
//                                 }}
//                             />

//                             <p className="font-semibold text-gray-700">
//                                 {bank.name}
//                             </p>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//             {/* NBFC */}

//             <div className="p-10 bg-gray-50">

//                 <h2 className="text-3xl font-bold text-center mb-10">
//                     NBFC Lending Partners
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

//                     {nbfcs.map((nbfc, index) => (

//                         <div
//                             key={index}
//                             className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition"
//                         >

//                             <img
//                                 src={nbfc.logo}
//                                 alt={nbfc.name}
//                                 className="h-12 mx-auto mb-3 object-contain"
//                             />

//                             <p className="font-semibold text-gray-700">
//                                 {nbfc.name}
//                             </p>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//             {/* FOOTER */}

//             <footer className="bg-gray-900 text-gray-300 mt-auto">

//                 <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 p-10">

//                     <div>
//                         <h3 className="text-white font-bold text-lg mb-3">
//                             Loan Eligibility Checker
//                         </h3>
//                         <p className="text-sm">
//                             Compare loans from top banks and NBFCs instantly.
//                             Find the best loan offers tailored to your needs.
//                         </p>
//                     </div>

//                     <div>
//                         <h4 className="text-white font-semibold mb-3">Company</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li>About</li>
//                             <li>Careers</li>
//                             <li>Blog</li>
//                             <li>Contact</li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 className="text-white font-semibold mb-3">Resources</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li>Loan Calculator</li>
//                             <li>Interest Rates</li>
//                             <li>Help Center</li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h4 className="text-white font-semibold mb-3">Legal</h4>
//                         <ul className="space-y-2 text-sm">
//                             <li>Privacy Policy</li>
//                             <li>Terms of Service</li>
//                         </ul>
//                     </div>

//                 </div>

//                 <div className="text-center border-t border-gray-700 py-4 text-sm">
//                     © {new Date().getFullYear()} Loan Eligibility Checker. All rights reserved.
//                 </div>

//             </footer>

//         </div>

//     );

// }



