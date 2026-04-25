# Score2Loan 🏦

> **Check your loan eligibility instantly. Compare offers from top banks. Apply in seconds.**

![Score2Loan Banner](https://illustrations.popsy.co/white/business-analysis.svg)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://loan-eligibility-checker-4rmw.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=for-the-badge&logo=render)](https://render.com)
[![Made With](https://img.shields.io/badge/Made%20With-MERN%20Stack-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Author](#author)

---

## 🎯 About

**Score2Loan** is a full-stack MERN web application that helps users check their loan eligibility based on their financial profile — income, credit score, and existing EMIs. It compares offers from multiple banks, calculates EMI instantly, and lets users apply directly from the platform.

Admins can review applications, approve or reject them with reasons, and monitor platform analytics from a dedicated dashboard.

---

## ✨ Features

### 👤 User Features
- ✅ Register / Login with JWT Authentication
- ✅ Check Loan Eligibility (income, credit score, EMI)
- ✅ Compare bank offers with EMI calculation
- ✅ Apply for loan directly from the platform
- ✅ Track loan application status (Pending / Approved / Rejected)
- ✅ View rejection reason when application is rejected
- ✅ Update profile — income & credit score
- ✅ Personal dashboard with loan statistics & charts

### 🛡️ Admin Features
- ✅ Admin dashboard with analytics (Pie chart — Approved/Rejected/Pending)
- ✅ View all loan applications
- ✅ Approve applications with one click
- ✅ Reject applications with a custom reason
- ✅ Add / Update / Delete bank offers
- ✅ Role-based route protection

### 🎨 UI/UX
- ✅ Fully responsive (Mobile + Desktop)
- ✅ Dark mode support
- ✅ Skeleton loading states
- ✅ Toast notifications (no alert popups)
- ✅ Clean, modern design with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Tailwind CSS |
| **Charts** | Recharts |
| **Notifications** | React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

---

## 🖥️ Screenshots

> _Add screenshots here after deployment_

| Page | Description |
|---|---|
| Home | Landing page with bank partners |
| Dashboard | User stats, charts, recent activity |
| Eligibility | Loan checker form + bank results |
| My Applications | Application tracking with status |
| Profile | Update income & credit score |
| Admin Dashboard | Analytics + quick actions |
| Admin Applications | Review & approve/reject |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/PrinceT2310/Loan-Eligibility-Checker.git
cd Loan-Eligibility-Checker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `.env` file in `/client`:
```env
VITE_API_URL=http://localhost:5005/api
```

Start frontend:
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend `/backend/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5005` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `mysecretkey123` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

### Frontend `/client/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `https://your-api.render.com/api` |

---

## 📡 API Reference

### Auth Routes — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login user |
| GET | `/me` | ✅ | Get current user |
| PUT | `/profile` | ✅ | Update profile |

### Loan Routes — `/api/loan`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/check` | ✅ | Check eligibility + get bank offers |

### Application Routes — `/api/applications`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/apply` | ✅ | Submit loan application |
| GET | `/my` | ✅ | Get user's applications |
| GET | `/` | ✅ Admin | Get all applications |
| PUT | `/:id/status` | ✅ Admin | Approve / Reject application |

### Bank Routes — `/api/banks`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ❌ | Get all banks |
| POST | `/` | ✅ Admin | Add new bank |
| PUT | `/:id` | ✅ Admin | Update bank |
| DELETE | `/:id` | ✅ Admin | Delete bank |

### Admin Routes — `/api/admin`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/stats` | ✅ Admin | Get platform statistics |

---

## ☁️ Deployment

### Frontend — Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Set **Root Directory** to `client`
5. Add environment variable: `VITE_API_URL=https://your-backend.render.com/api`
6. Deploy ✅

### Backend — Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Start Command** to `node src/app.js`
5. Add environment variables (MONGO_URI, JWT_SECRET, CLIENT_URL, PORT)
6. Deploy ✅

---

## 👨‍💻 Author

**Prince Tyagi**
- GitHub: [@PrinceT2310](https://github.com/PrinceT2310)
- Project: [Score2Loan](https://loan-eligibility-checker-4rmw.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using the MERN Stack
