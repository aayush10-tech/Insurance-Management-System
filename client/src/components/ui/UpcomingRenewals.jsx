import { useState } from "react";

const UpcomingRenewals = ({
  policies = [],
  expiringPolicies = [],
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatus = (days) => {
    if (days <= 7)
      return {
        label: "Critical",
        color: "bg-red-100 text-red-700",
      };

    if (days <= 15)
      return {
        label: "Due Soon",
        color: "bg-orange-100 text-orange-700",
      };

    return {
      label: "Upcoming",
      color: "bg-blue-100 text-blue-700",
    };
  };

  const renderCard = (policy, expiring = false) => {
    const status = getStatus(policy.daysRemaining);

    return (
      <div
        key={policy.id}
        className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-800">
              {policy.customerName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {policy.policyNumber}
            </p>

            <p className="text-sm text-slate-500">
              {policy.policyType}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {expiring ? "Expiry" : "Renewal"} :
              {" "}
              {new Date(policy.endDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            {expiring && (
              <p className="mt-2 text-sm font-medium text-slate-700">
                {policy.daysRemaining} day
                {policy.daysRemaining !== 1 ? "s" : ""} remaining
              </p>
            )}
          </div>

          {expiring && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Policy Alerts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upcoming renewals & expiring policies
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2">

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-lg py-2 text-sm font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Upcoming ({Math.min(policies.length, 3)})
        </button>

        <button
          onClick={() => setActiveTab("expiring")}
          className={`rounded-lg py-2 text-sm font-semibold transition ${
            activeTab === "expiring"
              ? "bg-red-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Expiring ({Math.min(expiringPolicies.length, 3)})
        </button>

      </div>

      {activeTab === "upcoming" ? (
        policies.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-slate-500">
            No upcoming renewals.
          </div>
        ) : (
          <div className="space-y-3">
            {policies.slice(0, 3).map((policy) => renderCard(policy))}
          </div>
        )
      ) : expiringPolicies.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-slate-500">
          No expiring policies.
        </div>
      ) : (
        <div className="space-y-3">
          {expiringPolicies
            .slice(0, 3)
            .map((policy) => renderCard(policy, true))}
        </div>
      )}

    </div>
  );
};

export default UpcomingRenewals;