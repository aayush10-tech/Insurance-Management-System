import CustomerRow from "./CustomerRow";

const CustomerTable = ({
  customers = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                City
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Gender
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Annual Income
              </th>

              <th className="w-48 px-6 py-4 text-center text-sm font-semibold text-slate-700">
  Actions
</th>

            </tr>

          </thead>

          <tbody>

            {customers.length === 0 ? (
              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-slate-500"
                >
                  No customers found.
                </td>

              </tr>
            ) : (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
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

export default CustomerTable;