import express from "express";
import upload from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  downloadDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document Management APIs
 */

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Upload a customer document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - documentName
 *               - documentType
 *               - customerId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               documentName:
 *                 type: string
 *                 example: Aadhaar Card
 *               documentType:
 *                 type: string
 *                 example: ID_PROOF
 *               customerId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 */
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadDocument
);

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Documents fetched successfully
 */
router.get("/", authMiddleware, getAllDocuments);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Get document by ID
 *     tags: [Documents]
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
 *         description: Document fetched successfully
 */
router.get("/:id", authMiddleware, getDocumentById);

/**
 * @swagger
 * /documents/{id}/download:
 *   get:
 *     summary: Download document
 *     tags: [Documents]
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
 *         description: File downloaded successfully
 */
router.get("/:id/download", authMiddleware, downloadDocument);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Update document
 *     tags: [Documents]
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
 *         description: Document updated successfully
 */
router.put("/:id", authMiddleware, updateDocument);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete document
 *     tags: [Documents]
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
 *         description: Document deleted successfully
 */
router.delete("/:id", authMiddleware, deleteDocument);

export default router;