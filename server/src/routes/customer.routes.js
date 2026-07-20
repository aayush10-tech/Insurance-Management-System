import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { createCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

// Create Customer
router.post(
  "/",
  authMiddleware,
  createCustomer
);

export default router;