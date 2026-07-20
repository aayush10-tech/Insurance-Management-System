import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getProfile,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// Protected Route
router.get("/profile", authMiddleware, getProfile);

// Admin Only Route
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

export default router;