import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { applyLoan, getAllApplications } from "../controllers/application.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { updateApplicationStatus } from "../controllers/application.controller.js";
import { getUserApplications } from "../controllers/application.controller.js";


const router = express.Router();

router.post("/apply", authMiddleware, applyLoan);
router.get("/my", authMiddleware, getUserApplications);
router.get("/", authMiddleware, adminMiddleware, getAllApplications);
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);


export default router;