import {
  createPolicyService,
  getAllPoliciesService,
  getPolicyByIdService,
  updatePolicyService,
  deletePolicyService,
  cancelPolicyService,
  renewPolicyService,
  getExpiringPoliciesService,
} from "../services/policy.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// Create Policy
export const createPolicy = asyncHandler(async (req, res) => {
  const policy = await createPolicyService(req.body);

  return res.status(201).json(
    new ApiResponse(201, "Policy created successfully", {
      policy,
    })
  );
});

// Get All Policies
export const getAllPolicies = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  const status = req.query.status || "";
  const policyType = req.query.policyType || "";

  const { policies, totalPolicies } = await getAllPoliciesService(
    page,
    limit,
    search,
    sortBy,
    order,
    status,
    policyType
  );

  const totalPages = Math.ceil(totalPolicies / limit);

  return res.status(200).json(
    new ApiResponse(200, "Policies fetched successfully", {
      page,
      limit,
      search,
      sortBy,
      order,
      status,
      policyType,
      totalPolicies,
      totalPages,
      policies,
    })
  );
});

// Get Expiring Policies
export const getExpiringPolicies = asyncHandler(async (req, res) => {
  const days = Number(req.query.days) || 30;

  const policies = await getExpiringPoliciesService(days);

  return res.status(200).json(
    new ApiResponse(200, "Expiring policies fetched successfully", {
      totalPolicies: policies.length,
      policies,
    })
  );
});

// Get Policy By ID
export const getPolicyById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const policy = await getPolicyByIdService(id);

  if (!policy) {
    throw new ApiError(404, "Policy not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Policy fetched successfully", {
      policy,
    })
  );
});

// Update Policy
export const updatePolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  const updatedPolicy = await updatePolicyService(id, req.body);

  return res.status(200).json(
    new ApiResponse(200, "Policy updated successfully", {
      policy: updatedPolicy,
    })
  );
});

// Cancel Policy
export const cancelPolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  if (existingPolicy.status === "CANCELLED") {
    throw new ApiError(400, "Policy is already cancelled");
  }

  const cancelledPolicy = await cancelPolicyService(id);

  return res.status(200).json(
    new ApiResponse(200, "Policy cancelled successfully", {
      policy: cancelledPolicy,
    })
  );
});

// Renew Policy
export const renewPolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  const renewedPolicy = await renewPolicyService(id);

  return res.status(200).json(
    new ApiResponse(200, "Policy renewed successfully", {
      policy: renewedPolicy,
    })
  );
});

// Delete Policy (Legacy)
export const deletePolicy = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existingPolicy = await getPolicyByIdService(id);

  if (!existingPolicy) {
    throw new ApiError(404, "Policy not found");
  }

  await deletePolicyService(id);

  return res.status(200).json(
    new ApiResponse(200, "Policy deleted successfully")
  );
});