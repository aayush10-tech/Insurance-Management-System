import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import { getDashboardReport } from "../services/reportService";
import { exportPdf } from "../utils/exportPdf";
import { exportExcel } from "../utils/exportExcel";

import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const StatCard = ({ title, value, color }) => (
  <div
    className="bg-white rounded-xl shadow-md border-l-4 p-6"
    style={{ borderColor: color }}
  >
    <h3 className="text-sm text-slate-500 font-medium">
      {title}
    </h3>

    <h2 className="text-3xl font-bold text-slate-800 mt-3">
      {value}
    </h2>
  </div>
);

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const data = await getDashboardReport();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportSummaryPdf = () => {
    if (!report) return;

    exportPdf({
      title: "Insurance Dashboard Report",
      columns: ["Metric", "Value"],
      rows: [
        ["Total Customers", report.summary.totalCustomers],
        ["Total Policies", report.summary.totalPolicies],
        ["Active Policies", report.summary.activePolicies],
        ["Expired Policies", report.summary.expiredPolicies],
        ["Cancelled Policies", report.summary.cancelledPolicies],
        ["Total Claims", report.summary.totalClaims],
        ["Approved Claims", report.summary.approvedClaims],
        ["Pending Claims", report.summary.pendingClaims],
        ["Rejected Claims", report.summary.rejectedClaims],
        ["Total Payments", report.summary.totalPayments],
        [
          "Premium Collected",
          `₹${Number(
            report.summary.totalPremiumCollected
          ).toLocaleString("en-IN")}`,
        ],
      ],
      fileName: "Dashboard_Report.pdf",
    });
  };

  const exportSummaryExcel = () => {
    if (!report) return;

    exportExcel({
      fileName: "Dashboard_Report",
      data: [
        {
          totalCustomers: report.summary.totalCustomers,
          totalPolicies: report.summary.totalPolicies,
          activePolicies: report.summary.activePolicies,
          expiredPolicies: report.summary.expiredPolicies,
          cancelledPolicies: report.summary.cancelledPolicies,
          totalClaims: report.summary.totalClaims,
          approvedClaims: report.summary.approvedClaims,
          pendingClaims: report.summary.pendingClaims,
          rejectedClaims: report.summary.rejectedClaims,
          totalPayments: report.summary.totalPayments,
          totalPremiumCollected:
            report.summary.totalPremiumCollected,
        },
      ],
      columnMapping: {
        "Total Customers": "totalCustomers",
        "Total Policies": "totalPolicies",
        "Active Policies": "activePolicies",
        "Expired Policies": "expiredPolicies",
        "Cancelled Policies": "cancelledPolicies",
        "Total Claims": "totalClaims",
        "Approved Claims": "approvedClaims",
        "Pending Claims": "pendingClaims",
        "Rejected Claims": "rejectedClaims",
        "Total Payments": "totalPayments",
        "Premium Collected": "totalPremiumCollected",
      },
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl font-semibold text-slate-600">
            Loading Reports...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  const summary = report.summary;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Reports
            </h1>

            <p className="text-slate-500 mt-2">
              Dashboard Analytics
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={exportSummaryPdf}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
            >
              <FaFilePdf />
              Export PDF
            </button>

            <button
              onClick={exportSummaryExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              <FaFileExcel />
              Export Excel
            </button>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Total Customers"
            value={summary.totalCustomers}
            color="#3B82F6"
          />

          <StatCard
            title="Total Policies"
            value={summary.totalPolicies}
            color="#10B981"
          />

          <StatCard
            title="Active Policies"
            value={summary.activePolicies}
            color="#22C55E"
          />

          <StatCard
            title="Expired Policies"
            value={summary.expiredPolicies}
            color="#EF4444"
          />

          <StatCard
            title="Cancelled Policies"
            value={summary.cancelledPolicies}
            color="#F97316"
          />

          <StatCard
            title="Total Claims"
            value={summary.totalClaims}
            color="#8B5CF6"
          />

          <StatCard
            title="Total Payments"
            value={summary.totalPayments}
            color="#0EA5E9"
          />

          <StatCard
            title="Premium Collected"
            value={`₹${Number(
              summary.totalPremiumCollected
            ).toLocaleString("en-IN")}`}
            color="#14B8A6"
          />

        </div>

        {/* Recent Payments */}

        <div className="bg-white rounded-xl shadow-md">

          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Recent Payments
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Policy
                  </th>

                  <th className="text-left p-4">
                    Customer
                  </th>

                  <th className="text-left p-4">
                    Amount
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>
                                {report.recentPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {payment.policy.policyNumber}
                    </td>

                    <td className="p-4">
                      {payment.policy.customer.firstName}{" "}
                      {payment.policy.customer.lastName}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{Number(payment.amount).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          payment.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        payment.paymentDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Policies */}

        <div className="bg-white rounded-xl shadow-md">

          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Recent Policies
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Policy</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {report.recentPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {policy.policyNumber}
                    </td>

                    <td className="p-4">
                      {policy.customer.firstName}{" "}
                      {policy.customer.lastName}
                    </td>

                    <td className="p-4">
                      {policy.policyType}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          policy.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : policy.status === "EXPIRED"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {policy.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Claims */}

        <div className="bg-white rounded-xl shadow-md">

          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Recent Claims
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">
                    Claim No
                  </th>

                  <th className="text-left p-4">
                    Customer
                  </th>

                  <th className="text-left p-4">
                    Amount
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {report.recentClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {claim.claimNumber}
                    </td>

                    <td className="p-4">
                      {claim.policy.customer.firstName}{" "}
                      {claim.policy.customer.lastName}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{Number(
                        claim.claimAmount
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          claim.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : claim.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Reports;