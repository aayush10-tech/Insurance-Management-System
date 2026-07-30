import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createPolicySchema,
  updatePolicySchema,
} from "../validators/policy.validator.js";

import {
  createPolicy,
  getAllPolicies,
  getExpiringPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
  cancelPolicy,
  renewPolicy,
} from "../controllers/policy.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Policies
 *   description: Policy Management APIs
 */

/**
 * @swagger
 * /policies:
 *   get:
 *     summary: Get all policies
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, getAllPolicies);

/**
 * @swagger
 * /policies/expiring:
 *   get:
 *     summary: Get policies expiring within the next 30 days
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.get("/expiring", authMiddleware, getExpiringPolicies);

/**
 * @swagger
 * /policies/{id}:
 *   get:
 *     summary: Get policy by ID
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authMiddleware, getPolicyById);

/**
 * @swagger
 * /policies:
 *   post:
 *     summary: Create Policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  authMiddleware,
  validate(createPolicySchema),
  createPolicy
);

/**
 * @swagger
 * /policies/{id}:
 *   put:
 *     summary: Update Policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updatePolicySchema),
  updatePolicy
);

/**
 * @swagger
 * /policies/{id}/cancel:
 *   patch:
 *     summary: Cancel Policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/cancel", authMiddleware, cancelPolicy);

/**
 * @swagger
 * /policies/{id}/renew:
 *   patch:
 *     summary: Renew Policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/renew", authMiddleware, renewPolicy);

/**
 * @swagger
 * /policies/{id}:
 *   delete:
 *     summary: Delete Policy (Legacy)
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, deletePolicy);

export default router;