import prisma from "../config/prisma.js";

export const createPolicyService = async (policyData) => {
  return await prisma.policy.create({
    data: policyData,
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
      ],
    }),

    ...(status && { status }),

    ...(policyType && { policyType }),
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
    where: { id },
    include: {
      customer: true,
    },
  });
};

export const updatePolicyService = async (id, policyData) => {
  return await prisma.policy.update({
    where: { id },
    data: policyData,
    include: {
      customer: true,
    },
  });
};

export const deletePolicyService = async (id) => {
  return await prisma.policy.delete({
    where: { id },
  });
};