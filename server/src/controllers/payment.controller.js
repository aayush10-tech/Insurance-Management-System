import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
} from "../services/payment.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/apiError.js";

// Create Payment
export const createPayment = asyncHandler(async (req, res) => {
  const payment = await createPaymentService(req.body);

  res.status(201).json(
    new ApiResponse(201, "Premium payment recorded successfully", payment)
  );
});

// Get All Payments
export const getAllPayments = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";
  const status = req.query.status || "";
  const paymentMethod = req.query.paymentMethod || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  const result = await getAllPaymentsService(
    page,
    limit,
    search,
    status,
    paymentMethod,
    sortBy,
    order
  );

  res.status(200).json(
    new ApiResponse(200, "Premium payments fetched successfully", result)
  );
});

// Get Payment By ID
export const getPaymentById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const payment = await getPaymentByIdService(id);

  if (!payment) {
    throw new ApiError(404, "Premium payment not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Premium payment fetched successfully", payment)
  );
});

// Update Payment
export const updatePayment = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPayment = await getPaymentByIdService(id);

  if (!existingPayment) {
    throw new ApiError(404, "Premium payment not found");
  }

  const updatedPayment = await updatePaymentService(id, req.body);

  res.status(200).json(
    new ApiResponse(200, "Premium payment updated successfully", updatedPayment)
  );
});

// Delete Payment
export const deletePayment = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPayment = await getPaymentByIdService(id);

  if (!existingPayment) {
    throw new ApiError(404, "Premium payment not found");
  }

  await deletePaymentService(id);

  res.status(200).json(
    new ApiResponse(200, "Premium payment deleted successfully", null)
  );
});