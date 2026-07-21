import {
  createClaimService,
  getAllClaimsService,
  getClaimByIdService,
  updateClaimService,
  deleteClaimService,
} from "../services/claim.service.js";

import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

export const createClaim = async (req, res, next) => {
  try {
    const claim = await createClaimService(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "Claim submitted successfully",
        claim
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getAllClaims = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const {
      search = "",
      status = "",
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const result = await getAllClaimsService(
      page,
      limit,
      search,
      status,
      sortBy,
      order
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Claims fetched successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getClaimById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const claim = await getClaimByIdService(id);

    if (!claim) {
      throw new ApiError(404, "Claim not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Claim fetched successfully",
        claim
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateClaim = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const claim = await updateClaimService(id, req.body);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Claim updated successfully",
        claim
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteClaim = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await deleteClaimService(id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Claim deleted successfully",
        null
      )
    );
  } catch (error) {
    next(error);
  }
};