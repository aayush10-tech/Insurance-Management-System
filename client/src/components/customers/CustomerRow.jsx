import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CustomerRow = ({
  customer,
  onView,
  onEdit,
  onDelete,
}) => {
  const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`;

  return (
    <tr className="border-b border-slate-200 even:bg-slate-50 hover:bg-blue-50 transition-all duration-200">

      {/* Name */}
      <td className="w-48 px-6 py-4 align-middle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {customer.firstName} {customer.lastName}
            </p>

            <p className="text-sm text-slate-500">
              Customer
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 align-middle text-slate-600">
        {customer.email}
      </td>

      {/* Phone */}
      <td className="px-6 py-4 align-middle text-slate-600">
        {customer.phone}
      </td>

      {/* City */}
      <td className="px-6 py-4 align-middle">
        {customer.city}
      </td>

      {/* Gender */}
      <td className="px-6 py-4 align-middle">
        {customer.gender}
      </td>

      {/* Income */}
      <td className="px-6 py-4 align-middle font-semibold text-green-600">
        ₹{Number(customer.annualIncome).toLocaleString("en-IN")}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 align-middle">
        <div className="flex items-center justify-center gap-3 w-full">

          <button
            onClick={() => onView(customer.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            <FaEye size={16} />
          </button>

          <button
            onClick={() => onEdit(customer.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
          >
            <FaEdit size={16} />
          </button>

          <button
            onClick={() => onDelete(customer)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <FaTrash size={16} />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default CustomerRow;