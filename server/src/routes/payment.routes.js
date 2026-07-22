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

/**
 * @swagger
 * tags:
 *   name: Premium Payments
 *   description: Premium Payment Management APIs
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a premium payment
 *     tags: [Premium Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Create a new premium payment record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Premium payment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authMiddleware,
  validate(createPaymentSchema),
  createPayment
);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all premium payments
 *     tags: [Premium Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all premium payment records.
 *     responses:
 *       200:
 *         description: Premium payments fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getAllPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get premium payment by ID
 *     tags: [Premium Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a premium payment using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Premium payment fetched successfully
 *       404:
 *         description: Premium payment not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update premium payment
 *     tags: [Premium Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing premium payment.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Premium payment updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Premium payment not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updatePaymentSchema),
  updatePayment
);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete premium payment
 *     tags: [Premium Payments]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a premium payment using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Premium payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Premium payment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deletePayment);

export default router;