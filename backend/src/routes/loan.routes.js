import express from "express";
import { checkEligibility } from "../controllers/loan.controller.js";

const router = express.Router();

router.post("/check", checkEligibility);

export default router;