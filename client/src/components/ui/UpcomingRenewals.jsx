const UpcomingRenewals = ({ policies = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-blue-700">
          Upcoming Renewals
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {policies.length}
        </span>
      </div>

      {policies.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No upcoming renewals found.
        </div>
      ) : (
        <div className="space-y-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="border border-blue-200 rounded-xl p-4 bg-blue-50"
            >
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
                  Renewal Date:{" "}
                  {new Date(policy.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingRenewals;