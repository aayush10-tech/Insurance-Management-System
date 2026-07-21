import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";
import { customerSchema } from "../validators/customer.validator.js";   

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

// Create Customer
router.post("/", authMiddleware, createCustomer);

// Get All Customers
router.get("/", authMiddleware, getAllCustomers);

//Get Customers by ID
router.get("/:id", authMiddleware, getCustomerById);

router.put(
  "/:id",
  authMiddleware,
  validate(customerSchema),
  updateCustomer
);
router.delete("/:id", authMiddleware, deleteCustomer);

router.post(
  "/",
  authMiddleware,
  validate(customerSchema),
  createCustomer
);

export default router;