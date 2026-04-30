import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// ✅ NAYA — Profile update route
router.put("/profile", authMiddleware, updateProfile);

export default router;