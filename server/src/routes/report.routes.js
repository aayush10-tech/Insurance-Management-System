import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { getDashboardReport } from "../controllers/report.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports and Analytics APIs
 */

/**
 * @swagger
 * /reports/dashboard:
 *   get:
 *     summary: Get dashboard report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard report fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/dashboard",
  authMiddleware,
  getDashboardReport
);

export default router;