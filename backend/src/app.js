import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Import Error Middleware
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Loan Recommendation API Running");
});

// Error Handler (Always LAST)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5005;

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
});