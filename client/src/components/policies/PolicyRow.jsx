import {
  FaEye,
  FaEdit,
  FaBan,
  FaRedoAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  const baseClass =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case "ACTIVE":
      return (
        <span className={`${baseClass} bg-green-100 text-green-700`}>
          🟢 Active
        </span>
      );

    case "EXPIRED":
      return (
        <span className={`${baseClass} bg-red-100 text-red-700`}>
          🔴 Expired
        </span>
      );

    case "PENDING":
      return (
        <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
          🟡 Pending
        </span>
      );

    case "CANCELLED":
      return (
        <span className={`${baseClass} bg-gray-200 text-gray-700`}>
          ⚫ Cancelled
        </span>
      );

    default:
      return (
        <span className={`${baseClass} bg-slate-100 text-slate-700`}>
          {status}
        </span>
      );
  }
};

const PolicyRow = ({
  policy,
  onView,
  onEdit,
  onCancel,
  onRenew,
  onReceivePayment,
}) => {
  return (
    <tr className="border-b hover:bg-slate-50 transition duration-200">
      <td className="px-6 py-4 font-semibold text-slate-700">
        {policy.policyNumber}
      </td>

      <td className="px-6 py-4">
        <div className="font-medium text-slate-800">
          {policy.policyName}
        </div>

        <div className="text-xs text-slate-500">
          {policy.policyType}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="font-medium">
          {policy.customer?.firstName} {policy.customer?.lastName}
        </div>
      </td>

      <td className="px-6 py-4">
        {policy.policyType}
      </td>

      <td className="px-6 py-4 font-semibold text-blue-600">
        ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4 font-semibold text-emerald-600">
        ₹{Number(policy.coverageAmount).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4">
        {getStatusBadge(policy.status)}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-4 text-lg">

          <button
            onClick={() => onView(policy.id)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View Policy"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(policy.id)}
            className="text-emerald-600 hover:text-emerald-800 transition"
            title="Edit Policy"
          >
            <FaEdit />
          </button>

          {policy.status !== "CANCELLED" && (
            <button
              onClick={() => onCancel(policy)}
              className="text-red-600 hover:text-red-800 transition"
              title="Cancel Policy"
            >
              <FaBan />
            </button>
          )}

          {(policy.status === "EXPIRED" ||
            policy.status === "CANCELLED") && (
            <button
              onClick={() => onRenew(policy)}
              className="text-indigo-600 hover:text-indigo-800 transition"
              title="Renew Policy"
            >
              <FaRedoAlt />
            </button>
          )}

          <button
            onClick={() => onReceivePayment(policy)}
            className="text-green-600 hover:text-green-800 transition"
            title="Receive Premium Payment"
          >
            <FaMoneyBillWave />
          </button>

        </div>
      </td>
    </tr>
  );
};

export default PolicyRow;