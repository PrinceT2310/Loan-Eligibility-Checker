import express from "express";
import {
  addBank,
  deleteBank,
  getBanks,
  updateBank,
} from "../controllers/bank.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

// Public Route
router.get("/", getBanks);

// Admin Only Routes
router.post("/", authMiddleware, adminMiddleware, addBank);
router.put("/:id", authMiddleware, adminMiddleware, updateBank);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBank);

export default router;