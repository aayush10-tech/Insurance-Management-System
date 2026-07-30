import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsGrid from "../../components/ui/StatsGrid";
import RevenueChart from "../../components/ui/RevenueChart";
import CustomerGrowthChart from "../../components/ui/CustomerGrowthChart";
import PolicyDistributionChart from "../../components/ui/PolicyDistributionChart";
import ClaimsChart from "../../components/ui/ClaimsChart";
import RecentCustomers from "../../components/ui/RecentCustomers";
import RecentClaims from "../../components/ui/RecentClaims";

import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-semibold text-slate-600">
            Loading Dashboard...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Total Customers",
      value: dashboard?.totalCustomers ?? 0,
    },
    {
      title: "Total Policies",
      value: dashboard?.totalPolicies ?? 0,
    },
    {
      title: "Active Policies",
      value: dashboard?.activePolicies ?? 0,
    },
    {
      title: "Expired Policies",
      value: dashboard?.expiredPolicies ?? 0,
    },
    {
      title: "Total Claims",
      value: dashboard?.totalClaims ?? 0,
    },
    {
      title: "Total Payments",
      value: dashboard?.totalPayments ?? 0,
    },
    {
      title: "Approved Claims",
      value: dashboard?.approvedClaims ?? 0,
    },
    {
      title: "Premium Collected",
      value: `₹${Number(
        dashboard?.totalPremiumCollected ?? 0
      ).toLocaleString()}`,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome to the Insurance Management System
          </p>
        </div>

        {/* KPI Cards */}
        <StatsGrid stats={stats} />

        {/* Revenue & Customer Growth */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RevenueChart
            data={dashboard?.monthlyRevenue || []}
          />

          <CustomerGrowthChart
            data={dashboard?.customerGrowth || []}
          />
        </div>

        {/* Policy Distribution & Claims */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PolicyDistributionChart
            data={dashboard?.policyDistribution || []}
          />

          <ClaimsChart
            data={dashboard?.claimsByStatus || []}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentCustomers
            customers={dashboard?.recentCustomers}
          />

          <RecentClaims
            claims={dashboard?.recentClaims}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;