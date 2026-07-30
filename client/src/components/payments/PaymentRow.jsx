const PaymentRow = ({
  payment,
  onView,
  onEdit,
  onDelete,
}) => {
  const customer = payment.policy?.customer;
  const policy = payment.policy;

  return (
    <tr className="border-t hover:bg-slate-50 transition">

      <td className="px-6 py-4 font-medium">
        {policy?.policyNumber || "-"}
      </td>

      <td className="px-6 py-4">
        {customer
          ? `${customer.firstName} ${customer.lastName}`
          : "-"}
      </td>

      <td className="px-6 py-4 font-semibold">
        ₹{Number(payment.amount).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
          {payment.paymentMethod}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            payment.status === "PAID"
              ? "bg-green-100 text-green-700"
              : payment.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : payment.status === "FAILED"
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {payment.status}
        </span>
      </td>

      <td className="px-6 py-4">
        {new Date(payment.paymentDate).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">

          <button
            onClick={() => onView(payment.id)}
            className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm"
          >
            View
          </button>

          <button
            onClick={() => onEdit(payment.id)}
            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(payment)}
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Delete
          </button>

        </div>
      </td>

    </tr>
  );
};

export default PaymentRow;