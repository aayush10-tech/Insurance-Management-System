import prisma from "../config/prisma.js";

export const getDashboardSummaryService = async () => {
  const [
    totalCustomers,
    totalPolicies,
    activePolicies,
    expiredPolicies,
    totalPayments,
    totalClaims,
    approvedClaims,
    pendingClaims,
  ] = await Promise.all([
    prisma.customer.count(),

    prisma.policy.count(),

    prisma.policy.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.policy.count({
      where: {
        status: "EXPIRED",
      },
    }),

    prisma.premiumPayment.count(),

    prisma.claim.count(),

    prisma.claim.count({
      where: {
        status: "APPROVED",
      },
    }),

    prisma.claim.count({
      where: {
        status: "PENDING",
      },
    }),
  ]);

  return {
    totalCustomers,
    totalPolicies,
    activePolicies,
    expiredPolicies,
    totalPayments,
    totalClaims,
    approvedClaims,
    pendingClaims,
  };
};