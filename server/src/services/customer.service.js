import prisma from "../config/prisma.js";

export const createCustomerService = async (customerData) => {
  return await prisma.customer.create({
    data: customerData,
  });
};

export const getAllCustomersService = async (
  page,
  limit,
  search = "",
  sortBy = "createdAt",
  order = "desc",
  city = "",
  state = "",
  gender = ""
) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
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
          phone: {
            contains: search,
          },
        },
      ],
    }),

    ...(city && {
      city: {
        equals: city,
        mode: "insensitive",
      },
    }),

    ...(state && {
      state: {
        equals: state,
        mode: "insensitive",
      },
    }),

    ...(gender && {
      gender,
    }),
  };

  const customers = await prisma.customer.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
  });

  const totalCustomers = await prisma.customer.count({
    where,
  });

  return {
    customers,
    totalCustomers,
  };
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

export const deleteCustomerService = async (id) => {
  return await prisma.customer.delete({
    where: {
      id,
    },
  });
};