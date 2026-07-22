import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  createClaim,
  getAllClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
} from "../controllers/claim.controller.js";

import {
  createClaimSchema,
  updateClaimSchema,
} from "../validators/claim.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Claims
 *   description: Insurance Claim Management APIs
 */

/**
 * @swagger
 * /claims:
 *   post:
 *     summary: Create a new insurance claim
 *     tags: [Claims]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Claim created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  validate(createClaimSchema),
  createClaim
);

/**
 * @swagger
 * /claims:
 *   get:
 *     summary: Get all claims
 *     tags: [Claims]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Claims fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllClaims);

/**
 * @swagger
 * /claims/{id}:
 *   get:
 *     summary: Get claim by ID
 *     tags: [Claims]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Claim fetched successfully
 *       404:
 *         description: Claim not found
 */
router.get("/:id", authMiddleware, getClaimById);

/**
 * @swagger
 * /claims/{id}:
 *   put:
 *     summary: Update claim
 *     tags: [Claims]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Claim updated successfully
 *       404:
 *         description: Claim not found
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updateClaimSchema),
  updateClaim
);

/**
 * @swagger
 * /claims/{id}:
 *   delete:
 *     summary: Delete claim
 *     tags: [Claims]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Claim deleted successfully
 *       404:
 *         description: Claim not found
 */
router.delete("/:id", authMiddleware, deleteClaim);

export default router;