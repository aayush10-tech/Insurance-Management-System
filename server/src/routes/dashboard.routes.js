import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard Statistics APIs
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     description: Returns overall statistics including customers, policies, payments and claims.
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/summary",
  authMiddleware,
  getDashboardSummary
);

export default router;