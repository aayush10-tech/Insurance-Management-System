import {
  createPolicyService,
  getAllPoliciesService,
  getPolicyByIdService,
  updatePolicyService,
  deletePolicyService,
} from "../services/policy.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const createPolicy = asyncHandler(async (req, res) => {
  const policy = await createPolicyService(req.body);

  res.status(201).json(
    new ApiResponse(201, "Policy created successfully", policy)
  );
});

export const getAllPolicies = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";
  const status = req.query.status || "";
  const policyType = req.query.policyType || "";

  const result = await getAllPoliciesService(
    page,
    limit,
    search,
    sortBy,
    order,
    status,
    policyType
  );

  res.status(200).json(
    new ApiResponse(200, "Policies fetched successfully", result)
  );
});

export const getPolicyById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const policy = await getPolicyByIdService(id);

  if (!policy) {
    throw new ApiError(404, "Policy not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Policy fetched successfully", policy)
  );
});

export const updatePolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  const updatedPolicy = await updatePolicyService(id, req.body);

  res.status(200).json(
    new ApiResponse(200, "Policy updated successfully", updatedPolicy)
  );
});

export const deletePolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  await deletePolicyService(id);

  res.status(200).json(
    new ApiResponse(200, "Policy deleted successfully", null)
  );
});