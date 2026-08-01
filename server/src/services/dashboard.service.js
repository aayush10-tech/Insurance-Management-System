import prisma from "../config/prisma.js";

export const getDashboardSummaryService = async () => {
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

  const [
    totalCustomers,
    totalPolicies,
    activePolicies,
    expiredPolicies,
    totalPayments,
    totalClaims,
    approvedClaims,
    pendingClaims,

    recentCustomers,
    recentClaims,

    payments,

    customers,

    policies,

    policyExpiryPolicies,

    policyExpiringSoon,
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

    prisma.customer.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    }),

    prisma.claim.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.premiumPayment.findMany({
      select: {
        amount: true,
        paymentDate: true,
      },
      orderBy: {
        paymentDate: "asc",
      },
    }),

    prisma.customer.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.policy.findMany({
      select: {
        policyType: true,
      },
    }),

    // ==========================
    // Upcoming Renewals
    // ==========================

    prisma.policy.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        endDate: "asc",
      },
      take: 5,
    }),

    // ==========================
    // Expiring Policies (Next 30 Days)
    // ==========================

    prisma.policy.findMany({
      where: {
        status: "ACTIVE",
        endDate: {
          gte: new Date(),
          lte: thirtyDaysLater,
        },
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        endDate: "asc",
      },
    }),
  ]);
 
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // ==========================
  // Monthly Revenue
  // ==========================

  const monthlyRevenueMap = {};

  months.forEach((month) => {
    monthlyRevenueMap[month] = 0;
  });

  payments.forEach((payment) => {
    const month = months[new Date(payment.paymentDate).getMonth()];
    monthlyRevenueMap[month] += Number(payment.amount);
  });

  const monthlyRevenue = months.map((month) => ({
    month,
    amount: monthlyRevenueMap[month],
  }));

  // ==========================
  // Customer Growth
  // ==========================

  const customerGrowthMap = {};

  months.forEach((month) => {
    customerGrowthMap[month] = 0;
  });

  customers.forEach((customer) => {
    const month = months[new Date(customer.createdAt).getMonth()];
    customerGrowthMap[month]++;
  });

  const customerGrowth = months.map((month) => ({
    month,
    customers: customerGrowthMap[month],
  }));

  // ==========================
  // Policy Distribution
  // ==========================

  const policyTypeMap = {};

  policies.forEach((policy) => {
    if (!policyTypeMap[policy.policyType]) {
      policyTypeMap[policy.policyType] = 0;
    }

    policyTypeMap[policy.policyType]++;
  });

  const policyDistribution = Object.keys(policyTypeMap).map((key) => ({
    name: key,
    value: policyTypeMap[key],
  }));

  // ==========================
  // Premium Collection
  // ==========================

  const totalPremiumCollected = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  // ==========================
  // Upcoming Renewals
  // ==========================

  const upcomingRenewals = policyExpiryPolicies.map((policy) => ({
    id: policy.id,
    policyNumber: policy.policyNumber,
    customerName: `${policy.customer.firstName} ${policy.customer.lastName}`,
    policyType: policy.policyType,
    endDate: policy.endDate,
  }));

  // ==========================
  // Expiring Policies
  // ==========================

  const expiringPolicies = policyExpiringSoon.map((policy) => {
    const today = new Date();

    const endDate = new Date(policy.endDate);

    const daysRemaining = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      id: policy.id,
      policyNumber: policy.policyNumber,
      customerName: `${policy.customer.firstName} ${policy.customer.lastName}`,
      policyType: policy.policyType,
      endDate,
      daysRemaining,
    };
  });

  return {
    totalCustomers,
    totalPolicies,

    activePolicies,
    expiredPolicies,

    totalPayments,

    totalClaims,
    approvedClaims,
    pendingClaims,

    totalPremiumCollected,

    monthlyRevenue,

    customerGrowth,

    policyDistribution,

    recentCustomers: recentCustomers.map((customer) => ({
      id: customer.id,
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone,
    })),

    recentClaims,

    claimsByStatus: [
      {
        name: "Approved",
        value: approvedClaims,
      },
      {
        name: "Pending",
        value: pendingClaims,
      },
    ],

    upcomingRenewals,

    expiringPolicies,
  };
};