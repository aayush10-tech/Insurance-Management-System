import prisma from "../config/prisma.js";

export const createCustomerService = async (customerData) => {
  return await prisma.customer.create({
    data: customerData,
  });
};

export const getAllCustomersService = async () => {
  return await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCustomerByIdService = async (id) => {
  return await prisma.customer.findUnique({
    where: {
      id,
    },
  });
};

export const updateCustomerService = async (id, customerData) => {
  return await prisma.customer.update({
    where: {
      id,
    },
    data: customerData,
  });
};