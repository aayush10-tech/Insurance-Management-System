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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Policy No.
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Policy Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Premium
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Coverage
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
            {policies.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-slate-500"
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
    </div>
  );
};

export default PolicyTable;