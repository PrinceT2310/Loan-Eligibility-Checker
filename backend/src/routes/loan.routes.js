import express from "express";
import { checkEligibility } from "../controllers/loan.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/check", authMiddleware, checkEligibility);

export default router;