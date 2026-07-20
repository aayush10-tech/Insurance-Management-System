import prisma from "../config/prisma.js";

export const createCustomerService = async (customerData) => {
  const customer = await prisma.customer.create({
    data: customerData,
  });

  return customer;
};