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
  getPolicyById,
  updatePolicy,
  deletePolicy,
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
 *   post:
 *     summary: Create a new policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     description: Create a new insurance policy for a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Policy created successfully
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
  validate(createPolicySchema),
  createPolicy
);

/**
 * @swagger
 * /policies:
 *   get:
 *     summary: Get all policies
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all insurance policies.
 *     responses:
 *       200:
 *         description: Policies fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getAllPolicies);

/**
 * @swagger
 * /policies/{id}:
 *   get:
 *     summary: Get policy by ID
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Policy fetched successfully
 *       404:
 *         description: Policy not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getPolicyById);

/**
 * @swagger
 * /policies/{id}:
 *   put:
 *     summary: Update policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing insurance policy.
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
 *         description: Policy updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updatePolicySchema),
  updatePolicy
);

/**
 * @swagger
 * /policies/{id}:
 *   delete:
 *     summary: Delete policy
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Policy deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deletePolicy);

export default router;