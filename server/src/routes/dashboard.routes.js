import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/summary",
  authMiddleware,
  getDashboardSummary
);

export default router;