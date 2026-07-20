import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

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

router.put("/:id", authMiddleware, updateCustomer);

router.delete("/:id", authMiddleware, deleteCustomer);

export default router;