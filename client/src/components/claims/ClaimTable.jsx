import ClaimRow from "./ClaimRow";

const ClaimTable = ({
  claims = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Claim No.
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Policy No.
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Claim Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Incident Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {claims.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-slate-500"
                >
                  No claims found.
                </td>
              </tr>
            ) : (
              claims.map((claim) => (
                <ClaimRow
                  key={claim.id}
                  claim={claim}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimTable;