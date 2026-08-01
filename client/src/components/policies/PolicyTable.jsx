import PolicyRow from "./PolicyRow";

const PolicyTable = ({
  policies = [],
  onView,
  onEdit,
  onCancel,
  onRenew,
  onReceivePayment,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200">
      <table className="w-full table-fixed">
        <thead className="bg-slate-50">
          <tr>
            <th className="w-[11%] px-4 py-4 text-left">Policy No.</th>
            <th className="w-[14%] px-4 py-4 text-left">Policy</th>
            <th className="w-[18%] px-4 py-4 text-left">Customer</th>
            <th className="w-[11%] px-4 py-4 text-left">Type</th>
            <th className="w-[10%] px-4 py-4 text-left">Premium</th>
            <th className="w-[11%] px-4 py-4 text-left">Coverage</th>
            <th className="w-[10%] px-4 py-4 text-center">Status</th>
            <th className="w-[15%] px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {policies.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-12 text-center text-slate-500"
              >
                No policies found.
              </td>
            </tr>
          ) : (
            policies.map((policy) => (
              <PolicyRow
                key={policy.id}
                policy={policy}
                onView={onView}
                onEdit={onEdit}
                onCancel={onCancel}
                onRenew={onRenew}
                onReceivePayment={onReceivePayment}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;