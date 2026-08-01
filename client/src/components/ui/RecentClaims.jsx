const getStatusColor = (status) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-blue-100 text-blue-700";
  }
};

const RecentClaims = ({ claims = [] }) => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Claims
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest insurance claims
          </p>
        </div>

        <button className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
          View All
        </button>
      </div>

      {claims.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-slate-500">
          No claims found.
        </div>
      ) : (
        <div className="space-y-3">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {claim.claimNumber || `Claim #${claim.id}`}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Claim Request
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                  claim.status
                )}`}
              >
                {claim.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentClaims;