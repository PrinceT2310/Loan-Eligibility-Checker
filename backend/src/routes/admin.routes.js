import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

export default router;