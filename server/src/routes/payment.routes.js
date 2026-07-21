import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../validators/payment.validator.js";

import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Create Premium Payment
router.post(
  "/",
  authMiddleware,
  validate(createPaymentSchema),
  createPayment
);

// Get All Premium Payments
router.get("/", authMiddleware, getAllPayments);

// Get Premium Payment By ID
router.get("/:id", authMiddleware, getPaymentById);

// Update Premium Payment
router.put(
  "/:id",
  authMiddleware,
  validate(updatePaymentSchema),
  updatePayment
);

// Delete Premium Payment
router.delete("/:id", authMiddleware, deletePayment);

export default router;