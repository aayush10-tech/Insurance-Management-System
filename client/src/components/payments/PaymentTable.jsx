import PaymentRow from "./PaymentRow";

const PaymentTable = ({
  payments,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-700">

            <th className="px-6 py-4">Policy No.</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Method</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">
              Payment Date
            </th>
            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-16 text-center text-slate-500"
              >
                No premium payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <PaymentRow
                key={payment.id}
                payment={payment}
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

export default PaymentTable;