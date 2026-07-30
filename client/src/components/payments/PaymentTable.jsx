import PaymentRow from "./PaymentRow";

const PaymentTable = ({
  payments,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-sm text-slate-600">

            <th className="px-6 py-4">Policy No.</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Method</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Payment Date</th>
            <th className="px-6 py-4 text-center">Actions</th>

          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="py-10 text-center text-slate-500"
              >
                No payments found.
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