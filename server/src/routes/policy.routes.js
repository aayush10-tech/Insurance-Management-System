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

// Create Policy
router.post(
  "/",
  authMiddleware,
  validate(createPolicySchema),
  createPolicy
);

// Get All Policies
router.get("/", authMiddleware, getAllPolicies);

// Get Policy By ID
router.get("/:id", authMiddleware, getPolicyById);

// Update Policy
router.put(
  "/:id",
  authMiddleware,
  validate(updatePolicySchema),
  updatePolicy
);

// Delete Policy
router.delete("/:id", authMiddleware, deletePolicy);

export default router;