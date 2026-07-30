import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

// Get All Users (Pagination + Search)
export const getAllUsersService = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            fullName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            role: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    users,
    totalUsers,
    page,
    limit,
    totalPages: Math.ceil(totalUsers / limit),
  };
};

// Get User By ID
export const getUserByIdService = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// Create User
export const createUserService = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// Update User
export const updateUserService = async (id, data) => {
  const updateData = {
    fullName: data.fullName,
    email: data.email,
    role: data.role,
  };

  if (data.password && data.password.trim() !== "") {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// Delete User
export const deleteUserService = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};