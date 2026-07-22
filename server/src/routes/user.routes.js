import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getProfile,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Returns the profile details of the currently authenticated user.
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized or invalid token
 *       500:
 *         description: Internal server error
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Returns a list of all registered users. Accessible only by ADMIN users.
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized or invalid token
 *       403:
 *         description: Access denied. Admin only.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

export default router;