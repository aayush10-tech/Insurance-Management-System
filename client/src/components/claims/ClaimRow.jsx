import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  const baseClass =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  switch (status) {
    case "PENDING":
      return (
        <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
          🟡 Pending
        </span>
      );

    case "APPROVED":
      return (
        <span className={`${baseClass} bg-green-100 text-green-700`}>
          🟢 Approved
        </span>
      );

    case "REJECTED":
      return (
        <span className={`${baseClass} bg-red-100 text-red-700`}>
          🔴 Rejected
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

const ClaimRow = ({
  claim,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-slate-50 transition duration-200">

      <td className="px-6 py-4 font-semibold text-slate-700">
        {claim.claimNumber}
      </td>

      <td className="px-6 py-4">
        <span className="font-medium">
          {claim.policy?.policyNumber || "-"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="font-medium text-slate-800">
          {claim.policy?.customer
            ? `${claim.policy.customer.firstName} ${claim.policy.customer.lastName}`
            : "-"}
        </div>
      </td>

      <td className="px-6 py-4 font-semibold text-blue-600">
        ₹{Number(claim.claimAmount).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {new Date(claim.incidentDate).toLocaleDateString("en-IN")}
      </td>

      <td className="px-6 py-4">
        {getStatusBadge(claim.status)}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-4 text-lg">

          <button
            onClick={() => onView(claim.id)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View Claim"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(claim.id)}
            className="text-emerald-600 hover:text-emerald-800 transition"
            title="Edit Claim"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(claim)}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete Claim"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default ClaimRow;