import {
  FaEye,
  FaEdit,
  FaBan,
  FaMoneyBillWave,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold";

  switch (status) {
    case "PAID":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Paid
        </span>
      );

    case "PENDING":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
          Pending
        </span>
      );

    case "FAILED":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          Failed
        </span>
      );

    default:
      return (
        <span className={`${base} bg-slate-100 text-slate-700`}>
          {status}
        </span>
      );
  }
};

const getMethodBadge = (method) => {
  switch (method) {
    case "UPI":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          📱 UPI
        </span>
      );

    case "NET_BANKING":
      return (
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          🏦 Net Banking
        </span>
      );

    case "CREDIT_CARD":
      return (
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          💳 Credit Card
        </span>
      );

    case "DEBIT_CARD":
      return (
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          💳 Debit Card
        </span>
      );

    case "CASH":
      return (
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          💵 Cash
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {method}
        </span>
      );
  }
};

const PaymentRow = ({
  payment,
  onView,
  onEdit,
  onDelete,
}) => {
  const customer = payment.policy?.customer;
  const policy = payment.policy;

  const initials = `${customer?.firstName?.[0] ?? ""}${
    customer?.lastName?.[0] ?? ""
  }`;

  return (
    <tr className="border-b border-slate-200 even:bg-slate-50 hover:bg-blue-50 transition-all duration-200">

      <td className="px-6 py-4 font-semibold text-slate-700">
        {policy?.policyNumber || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {customer
                ? `${customer.firstName} ${customer.lastName}`
                : "-"}
            </p>

            <p className="text-xs text-slate-500">
              Policy Holder
            </p>
          </div>

        </div>
      </td>

      <td className="px-6 py-4 font-bold text-slate-800">
        ₹{Number(payment.amount).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4">
        {getMethodBadge(payment.paymentMethod)}
      </td>

      <td className="px-6 py-4">
        {getStatusBadge(payment.status)}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {new Date(payment.paymentDate).toLocaleDateString("en-IN")}
      </td>

      <td className="w-[180px] px-6 py-4">
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={() => onView(payment.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white"
            title="View"
          >
            <FaEye size={16} />
          </button>

          <button
            onClick={() => onEdit(payment.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-600 hover:text-white"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>

          <button
            onClick={() => onDelete(payment)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
            title="Delete"
          >
            <FaBan size={16} />
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
            title="Receive Payment"
          >
            <FaMoneyBillWave size={16} />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default PaymentRow;