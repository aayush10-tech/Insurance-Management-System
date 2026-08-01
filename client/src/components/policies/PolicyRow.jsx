import {
  FaEye,
  FaEdit,
  FaBan,
  FaRedoAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  const baseClass =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

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
  const initials = `${policy.customer?.firstName?.[0] ?? ""}${
    policy.customer?.lastName?.[0] ?? ""
  }`;
    return (
    <tr className="border-b border-slate-200 even:bg-slate-50 hover:bg-blue-50 transition-all duration-200">

      {/* Policy Number */}
      <td className="px-6 py-3 align-middle font-semibold text-slate-700">
        {policy.policyNumber}
      </td>

      {/* Policy */}
      <td className="px-6 py-3 align-middle">
        <p className="font-semibold text-slate-800 whitespace-nowrap">
  {policy.policyName}
</p>
      </td>

      {/* Customer */}
      <td className="px-6 py-3 align-middle">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {policy.customer?.firstName}{" "}
              {policy.customer?.lastName}
            </p>

            <p className="text-xs text-slate-500">
              Policy Holder
            </p>
          </div>

        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-3 align-middle">
        {policy.policyType}
      </td>

      {/* Premium */}
      <td className="px-6 py-3 align-middle font-semibold text-blue-600">
        ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
      </td>

      {/* Coverage */}
      <td className="px-6 py-3 align-middle font-semibold text-emerald-600">
        ₹{Number(policy.coverageAmount).toLocaleString("en-IN")}
      </td>

      {/* Status */}
      <td className="px-6 py-3 align-middle">
        {getStatusBadge(policy.status)}
      </td>

      {/* Actions */}
      <td className="min-w-[260px] px-6 py-3 align-middle">
        <div className="flex items-center justify-center gap-3 whitespace-nowrap">

          <button
            onClick={() => onView(policy.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white"
            title="View"
          >
            <FaEye size={16} />
          </button>

          <button
            onClick={() => onEdit(policy.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-600 hover:text-white"
            title="Edit"
          >
            <FaEdit size={16} />
          </button>

          {policy.status !== "CANCELLED" && (
            <button
              onClick={() => onCancel(policy)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
              title="Cancel"
            >
              <FaBan size={16} />
            </button>
          )}

          {(policy.status === "EXPIRED" ||
            policy.status === "CANCELLED") && (
            <button
              onClick={() => onRenew(policy)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              title="Renew"
            >
              <FaRedoAlt size={16} />
            </button>
          )}

          <button
            onClick={() => onReceivePayment(policy)}
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

export default PolicyRow;