import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const getStatusBadge = (status) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
          Pending
        </span>
      );

    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
          Approved
        </span>
      );

    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          Rejected
        </span>
      );

    default:
      return (
        <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {status}
        </span>
      );
  }
};

const getInitials = (first = "", last = "") =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

const ClaimRow = ({
  claim,
  onView,
  onEdit,
  onDelete,
}) => {
  const customer = claim.policy?.customer;

  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">

      {/* Claim Number */}
      <td className="px-6 py-5 font-semibold text-slate-700">
        {claim.claimNumber}
      </td>

      {/* Policy */}
      <td className="px-6 py-5 font-medium text-slate-700">
        {claim.policy?.policyNumber || "-"}
      </td>

      {/* Customer */}
      <td className="px-6 py-5">
        {customer ? (
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {getInitials(customer.firstName, customer.lastName)}
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                {customer.firstName} {customer.lastName}
              </p>

              <p className="text-sm text-slate-500">
                Claimant
              </p>
            </div>
          </div>
        ) : (
          "-"
        )}
      </td>

      {/* Amount */}
      <td className="px-6 py-5 text-lg font-bold text-blue-600">
        ₹{Number(claim.claimAmount).toLocaleString("en-IN")}
      </td>

      {/* Date */}
      <td className="px-6 py-5 text-slate-600">
        {new Date(claim.incidentDate).toLocaleDateString("en-IN")}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        {getStatusBadge(claim.status)}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">

          <button
            onClick={() => onView(claim.id)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition hover:bg-blue-600 hover:text-white"
            title="View"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(claim.id)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 transition hover:bg-green-600 hover:text-white"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(claim)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
            title="Delete"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default ClaimRow;