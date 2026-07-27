const RecentClaims = ({ claims = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent Claims
        </h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No claims found.
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {claim.claimNumber || `Claim #${claim.id}`}
                </h3>

                <p className="text-sm text-slate-500">
                  {claim.status}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  claim.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : claim.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
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