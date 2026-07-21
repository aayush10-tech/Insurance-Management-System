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

router.post(
  "/",
  authMiddleware,
  validate(createClaimSchema),
  createClaim
);

router.get(
  "/",
  authMiddleware,
  getAllClaims
);

router.get(
  "/:id",
  authMiddleware,
  getClaimById
);

router.put(
  "/:id",
  authMiddleware,
  validate(updateClaimSchema),
  updateClaim
);

router.delete(
  "/:id",
  authMiddleware,
  deleteClaim
);

export default router;