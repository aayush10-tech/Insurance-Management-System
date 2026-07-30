import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";

import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// Get Logged-in User Profile
export const getProfile = (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      req.user
    )
  );
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await getAllUsersService(
      page,
      limit,
      search
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Users fetched successfully",
        {
          users: result.users,
          totalUsers: result.totalUsers,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

// Get User By ID
export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = await getUserByIdService(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "User fetched successfully",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};

// Create User
export const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);

    return res.status(201).json(
      new ApiResponse(
        201,
        "User created successfully",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const existingUser = await getUserByIdService(id);

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    const updatedUser = await updateUserService(
      id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "User updated successfully",
        updatedUser
      )
    );
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const existingUser = await getUserByIdService(id);

    if (!existingUser) {
      throw new ApiError(404, "User not found");
    }

    await deleteUserService(id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "User deleted successfully",
        null
      )
    );
  } catch (error) {
    next(error);
  }
};