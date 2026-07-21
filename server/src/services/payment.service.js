import prisma from "../config/prisma.js";

export const createPaymentService = async (paymentData) => {
  return await prisma.premiumPayment.create({
    data: paymentData,
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

export const getAllPaymentsService = async (
  page,
  limit,
  search = "",
  status = "",
  paymentMethod = "",
  sortBy = "createdAt",
  order = "desc"
) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(status && { status }),

    ...(paymentMethod && { paymentMethod }),

    ...(search && {
      OR: [
        {
          transactionId: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          policy: {
            policyNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),
  };

  const payments = await prisma.premiumPayment.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });

  const totalPayments = await prisma.premiumPayment.count({
    where,
  });

  return {
    payments,
    totalPayments,
  };
};

export const getPaymentByIdService = async (id) => {
  return await prisma.premiumPayment.findUnique({
    where: { id },
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

export const updatePaymentService = async (id, paymentData) => {
  return await prisma.premiumPayment.update({
    where: { id },
    data: paymentData,
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

export const deletePaymentService = async (id) => {
  return await prisma.premiumPayment.delete({
    where: { id },
  });
};