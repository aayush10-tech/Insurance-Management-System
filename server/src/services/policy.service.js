import prisma from "../config/prisma.js";

export const createPolicyService = async (policyData) => {
  const lastPolicy = await prisma.policy.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  const nextId = (lastPolicy?.id || 0) + 1;

  const year = new Date().getFullYear();

  const policyNumber = `POL-${year}-${String(nextId).padStart(5, "0")}`;

  return await prisma.policy.create({
    data: {
      ...policyData,
      policyNumber,
      status: policyData.status || "ACTIVE",
    },
    include: {
      customer: true,
    },
  });
};

export const getAllPoliciesService = async (
  page,
  limit,
  search = "",
  sortBy = "createdAt",
  order = "desc",
  status = "",
  policyType = ""
) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        {
          policyNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          policyName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          policyType: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          customer: {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          customer: {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),

    ...(status && {
      status,
    }),

    ...(policyType && {
      policyType,
    }),
  };

  const policies = await prisma.policy.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
    include: {
      customer: true,
    },
  });

  const totalPolicies = await prisma.policy.count({
    where,
  });

  return {
    policies,
    totalPolicies,
  };
};

export const getPolicyByIdService = async (id) => {
  return await prisma.policy.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
    },
  });
};

export const updatePolicyService = async (id, policyData) => {
  return await prisma.policy.update({
    where: {
      id,
    },
    data: policyData,
    include: {
      customer: true,
    },
  });
};

// Cancel Policy
export const cancelPolicyService = async (id) => {
  return await prisma.policy.update({
    where: {
      id,
    },
    data: {
      status: "CANCELLED",
    },
    include: {
      customer: true,
    },
  });
};

// Renew Policy
export const renewPolicyService = async (id) => {
  const policy = await prisma.policy.findUnique({
    where: {
      id,
    },
  });

  if (!policy) {
    throw new Error("Policy not found");
  }

  const currentEndDate = new Date(policy.endDate);

  const newEndDate = new Date(currentEndDate);
  newEndDate.setFullYear(newEndDate.getFullYear() + 1);

  return await prisma.policy.update({
    where: {
      id,
    },
    data: {
      endDate: newEndDate,
      status: "ACTIVE",
    },
    include: {
      customer: true,
    },
  });
};

// Policies Expiring Soon
export const getExpiringPoliciesService = async (days = 30) => {
  const today = new Date();

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);

  return await prisma.policy.findMany({
    where: {
      status: "ACTIVE",
      endDate: {
        gte: today,
        lte: futureDate,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      endDate: "asc",
    },
  });
};

// Legacy Delete
export const deletePolicyService = async (id) => {
  return await prisma.policy.delete({
    where: {
      id,
    },
  });
};