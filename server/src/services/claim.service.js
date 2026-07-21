import prisma from "../config/prisma.js";

export const createClaimService = async (claimData) => {
  return await prisma.claim.create({
    data: claimData,
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

export const getAllClaimsService = async (
  page,
  limit,
  search = "",
  status = "",
  sortBy = "createdAt",
  order = "desc"
) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(status && { status }),

    ...(search && {
      OR: [
        {
          claimNumber: {
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

  const claims = await prisma.claim.findMany({
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

  const totalClaims = await prisma.claim.count({
    where,
  });

  return {
    claims,
    totalClaims,
  };
};

export const getClaimByIdService = async (id) => {
  return await prisma.claim.findUnique({
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

export const updateClaimService = async (id, claimData) => {
  return await prisma.claim.update({
    where: { id },
    data: claimData,
    include: {
      policy: {
        include: {
          customer: true,
        },
      },
    },
  });
};

export const deleteClaimService = async (id) => {
  return await prisma.claim.delete({
    where: { id },
  });
};