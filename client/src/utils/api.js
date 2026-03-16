import axios from "axios";

const api = axios.create({

   // baseURL: "http://localhost:5005/api",
   baseURL: "https://loan-backend-np7g.onrender.com/api",
});

// 🔥 Add Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;





// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://loan-backend-np7g.onrender.com/api"
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;