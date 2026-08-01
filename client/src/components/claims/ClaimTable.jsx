import ClaimRow from "./ClaimRow";

const ClaimTable = ({
  claims = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-700">

            <th className="px-6 py-5">
              Claim No.
            </th>

            <th className="px-6 py-5">
              Policy No.
            </th>

            <th className="px-6 py-5">
              Customer
            </th>

            <th className="px-6 py-5">
              Claim Amount
            </th>

            <th className="px-6 py-5">
              Incident Date
            </th>

            <th className="px-6 py-5">
              Status
            </th>

            <th className="px-6 py-5 text-center">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {claims.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-20 text-center text-slate-500"
              >
                No Claims Found
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
  );
};

export default ClaimTable;