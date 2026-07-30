import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

// Helper to safely parse dates
const parsePaymentDate = (value) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    throw new ApiError(
      400,
      `Invalid payment date received: ${value}`
    );
  }

  return date;
};

// Create Payment
export const createPaymentService = async (data) => {
  console.log("========== CREATE PAYMENT ==========");
  console.log("Incoming Data:", data);

  const paymentDate = parsePaymentDate(data.paymentDate);

  console.log("Parsed Date:", paymentDate);

  const payment = await prisma.premiumPayment.create({
    data: {
      policyId: Number(data.policyId),
      amount: Number(data.amount),
      paymentDate,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId || null,
      status: data.status,
      remarks: data.remarks || null,
    },
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });

  return payment;
};

// Get All Payments
export const getAllPaymentsService = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  paymentMethod = "",
  sortBy = "createdAt",
  order = "desc"
) => {
  const skip = (page - 1) * limit;

  const where = {
    AND: [
      status ? { status } : {},
      paymentMethod ? { paymentMethod } : {},
      search
        ? {
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
              {
                policy: {
                  customer: {
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
                    ],
                  },
                },
              },
            ],
          }
        : {},
    ],
  };

  const [payments, totalPayments] = await Promise.all([
    prisma.premiumPayment.findMany({
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
    }),

    prisma.premiumPayment.count({
      where,
    }),
  ]);

  return {
    payments,
    totalPayments,
    page,
    limit,
    totalPages: Math.ceil(totalPayments / limit),
  };
};

// Get Payment By ID
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

// Update Payment
export const updatePaymentService = async (id, data) => {
  const existingPayment = await prisma.premiumPayment.findUnique({
    where: { id },
  });

  if (!existingPayment) {
    throw new ApiError(404, "Premium payment not found");
  }

  const updateData = {
    ...(data.policyId && { policyId: Number(data.policyId) }),
    ...(data.amount && { amount: Number(data.amount) }),
    ...(data.paymentMethod && {
      paymentMethod: data.paymentMethod,
    }),
    ...(data.transactionId !== undefined && {
      transactionId: data.transactionId || null,
    }),
    ...(data.status && {
      status: data.status,
    }),
    ...(data.remarks !== undefined && {
      remarks: data.remarks || null,
    }),
  };

  if (data.paymentDate) {
    updateData.paymentDate = parsePaymentDate(
      data.paymentDate
    );
  }

  return await prisma.premiumPayment.update({
    where: { id },
    data: updateData,
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

// Delete Payment
export const deletePaymentService = async (id) => {
  const existingPayment = await prisma.premiumPayment.findUnique({
    where: { id },
  });

  if (!existingPayment) {
    throw new ApiError(404, "Premium payment not found");
  }

  return await prisma.premiumPayment.delete({
    where: { id },
  });
};