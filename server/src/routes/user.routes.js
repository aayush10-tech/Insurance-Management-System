import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getProfile,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Profile
router.get("/profile", authMiddleware, getProfile);

// View Users
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  getAllUsers
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  getUserById
);

// Create User
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  createUser
);

// Update User
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  updateUser
);

// Delete User
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "AGENT"),
  deleteUser
);

export default router;