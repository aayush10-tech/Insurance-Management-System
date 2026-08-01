import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsGrid from "../../components/ui/StatsGrid";
import RevenueChart from "../../components/ui/RevenueChart";
import CustomerGrowthChart from "../../components/ui/CustomerGrowthChart";
import PolicyDistributionChart from "../../components/ui/PolicyDistributionChart";
import ClaimsChart from "../../components/ui/ClaimsChart";
import RecentCustomers from "../../components/ui/RecentCustomers";
import RecentClaims from "../../components/ui/RecentClaims";
import UpcomingRenewals from "../../components/ui/UpcomingRenewals";
import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-700">
              Loading Dashboard...
            </h2>
          </div>
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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Insurance Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor customers, policies, claims and premium collection from one place.
            </p>
          </div>

          
        </div>

        {/* KPI Cards */}
        <StatsGrid stats={stats} />

        {/* Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  <div className="xl:col-span-2">
            <RevenueChart
              data={dashboard?.monthlyRevenue || []}
            />
          </div>

          <div>
            <ClaimsChart
              data={dashboard?.claimsByStatus || []}
            />
          </div>

        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <CustomerGrowthChart
            data={dashboard?.customerGrowth || []}
          />

          <PolicyDistributionChart
            data={dashboard?.policyDistribution || []}
          />

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

  <div className="xl:col-span-4">
            <RecentCustomers
              customers={dashboard?.recentCustomers}
            />
          </div>

          <div className="xl:col-span-4">
            <RecentClaims
              claims={dashboard?.recentClaims}
            />
          </div>

          <div className="2xl:col-span-4">
            <UpcomingRenewals
              policies={dashboard?.upcomingRenewals || []}
              expiringPolicies={dashboard?.expiringPolicies || []}
            />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;