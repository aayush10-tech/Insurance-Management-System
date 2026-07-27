import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CustomerRow = ({
  customer,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-slate-50 transition">

      <td className="px-6 py-4 font-medium">
        {customer.firstName} {customer.lastName}
      </td>

      <td className="px-6 py-4">
        {customer.email}
      </td>

      <td className="px-6 py-4">
        {customer.phone}
      </td>

      <td className="px-6 py-4">
        {customer.city}
      </td>

      <td className="px-6 py-4">
        {customer.gender}
      </td>

      <td className="px-6 py-4">
        ₹{Number(customer.annualIncome).toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">

          <button
            onClick={() => onView(customer.id)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View Customer"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(customer.id)}
            className="text-green-600 hover:text-green-800 transition"
            title="Edit Customer"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(customer)}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete Customer"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default CustomerRow;