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

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer Management APIs
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all customers.
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a customer using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Customer fetched successfully
 *       404:
 *         description: Customer not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getCustomerById);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     description: Create a new customer record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Rahul
 *               lastName:
 *                 type: string
 *                 example: Sharma
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rahul.sharma@example.com
 *               phone:
 *                 type: string
 *                 example: "9999999999"
 *               gender:
 *                 type: string
 *                 example: Male
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1995-06-15"
 *               address:
 *                 type: string
 *                 example: 456 Linking Road
 *               city:
 *                 type: string
 *                 example: Mumbai
 *               state:
 *                 type: string
 *                 example: Maharashtra
 *               pincode:
 *                 type: string
 *                 example: "400050"
 *               occupation:
 *                 type: string
 *                 example: Software Engineer
 *               annualIncome:
 *                 type: number
 *                 example: 1200000
 *               aadhaarNumber:
 *                 type: string
 *                 example: "123412341234"
 *               panNumber:
 *                 type: string
 *                 example: ABCDE1234F
 *     responses:
 *       201:
 *         description: Customer created successfully
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
  validate(customerSchema),
  createCustomer
);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing customer's information.
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
 *         description: Customer updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authMiddleware,
  validate(customerSchema),
  updateCustomer
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a customer using their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;