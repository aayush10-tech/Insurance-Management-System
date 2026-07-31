import { useState } from "react";

const UpcomingRenewals = ({
  policies = [],
  expiringPolicies = [],
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatus = (days) => {
    if (days <= 7) {
      return {
        label: "Critical",
        bg: "bg-red-100",
        text: "text-red-700",
      };
    }

    if (days <= 15) {
      return {
        label: "Due Soon",
        bg: "bg-orange-100",
        text: "text-orange-700",
      };
    }

    return {
      label: "Upcoming",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    };
  };

  const totalAlerts = policies.length + expiringPolicies.length;

  return (
    <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-blue-700">
          🔔 Policy Alerts
        </h2>

        
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Upcoming ({Math.min(policies.length, 3)})
        </button>

        <button
          onClick={() => setActiveTab("expiring")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === "expiring"
              ? "bg-red-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Expiring ({Math.min(expiringPolicies.length, 3)})
        </button>
      </div>

      {/* Upcoming Renewals */}
      {activeTab === "upcoming" && (
        <>
          {policies.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No upcoming renewals found.
            </div>
          ) : (
            <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
              {policies.slice(0, 3).map((policy) => (
                <div
                  key={policy.id}
                  className="border border-blue-200 rounded-xl p-4 bg-blue-50"
                >
                  <h3 className="font-semibold text-slate-800">
                    {policy.customerName}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Policy No: {policy.policyNumber}
                  </p>

                  <p className="text-sm text-slate-500">
                    Policy Type: {policy.policyType}
                  </p>

                  <p className="text-sm text-slate-500">
                    Renewal Date:{" "}
                    {new Date(policy.endDate).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Expiring Policies */}
      {activeTab === "expiring" && (
        <>
          {expiringPolicies.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No expiring policies.
            </div>
          ) : (
            <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
              {expiringPolicies.slice(0, 3).map((policy) => {
                const status = getStatus(policy.daysRemaining);

                return (
                  <div
                    key={policy.id}
                    className="border border-red-200 rounded-xl p-4 bg-red-50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {policy.customerName}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Policy No: {policy.policyNumber}
                        </p>

                        <p className="text-sm text-slate-500">
                          Policy Type: {policy.policyType}
                        </p>

                        <p className="text-sm text-slate-500">
                          Expiry Date:{" "}
                          {new Date(policy.endDate).toLocaleDateString()}
                        </p>

                        <p className="text-sm font-medium mt-2 text-slate-700">
                          {policy.daysRemaining} day
                          {policy.daysRemaining !== 1 ? "s" : ""} remaining
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingRenewals;