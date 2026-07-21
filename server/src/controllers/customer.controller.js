import {
  createCustomerService,
  getAllCustomersService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer.service.js";

import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { findCustomerOrThrow } from "../helpers/customer.helper.js";

// Create Customer
export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await createCustomerService(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Customer created successfully", {
      customer,
    })
  );
});

// Get All Customers
export const getAllCustomers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  const city = req.query.city || "";
  const state = req.query.state || "";
  const gender = req.query.gender || "";

  const { customers, totalCustomers } = await getAllCustomersService(
    page,
    limit,
    search,
    sortBy,
    order,
    city,
    state,
    gender
  );

  const totalPages = Math.ceil(totalCustomers / limit);

  return res.status(200).json(
    new ApiResponse(200, "Customers fetched successfully", {
      page,
      limit,
      search,
      sortBy,
      order,
      city,
      state,
      gender,
      totalCustomers,
      totalPages,
      customers,
    })
  );
});

// Get Customer By ID
export const getCustomerById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const customer = await findCustomerOrThrow(id);

  return res.status(200).json(
    new ApiResponse(200, "Customer fetched successfully", {
      customer,
    })
  );
});

// Update Customer
export const updateCustomer = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await findCustomerOrThrow(id);

  const updatedCustomer = await updateCustomerService(id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Customer updated successfully", {
      customer: updatedCustomer,
    })
  );
});

// Delete Customer
export const deleteCustomer = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await findCustomerOrThrow(id);

  await deleteCustomerService(id);

  return res.status(200).json(
    new ApiResponse(200, "Customer deleted successfully")
  );
});