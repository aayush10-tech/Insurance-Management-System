import prisma from "../config/prisma.js";

export const getDashboardReportService = async () => {
  const [
    totalCustomers,
    totalPolicies,
    activePolicies,
    expiredPolicies,
    cancelledPolicies,
    totalClaims,
    approvedClaims,
    pendingClaims,
    rejectedClaims,
    totalPayments,
    paymentAggregate,
    recentPayments,
    recentPolicies,
    recentClaims,
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

    prisma.policy.count({
      where: {
        status: "CANCELLED",
      },
    }),

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

    prisma.claim.count({
      where: {
        status: "REJECTED",
      },
    }),

    prisma.premiumPayment.count(),

    prisma.premiumPayment.aggregate({
      _sum: {
        amount: true,
      },
    }),

    prisma.premiumPayment.findMany({
      take: 5,
      orderBy: {
        paymentDate: "desc",
      },
      include: {
        policy: {
          include: {
            customer: true,
          },
        },
      },
    }),

    prisma.policy.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    }),

    prisma.claim.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        policy: {
          include: {
            customer: true,
          },
        },
      },
    }),
  ]);

  return {
    summary: {
      totalCustomers,
      totalPolicies,
      activePolicies,
      expiredPolicies,
      cancelledPolicies,

      totalClaims,
      approvedClaims,
      pendingClaims,
      rejectedClaims,

      totalPayments,

      totalPremiumCollected:
        paymentAggregate._sum.amount || 0,
    },

    recentPayments,
    recentPolicies,
    recentClaims,
  };
};