import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const UserRow = ({
  user,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="transition border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">
        {user.fullName}
      </td>

      <td className="px-6 py-4">
        {user.email}
      </td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.role === "ADMIN"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className="px-6 py-4">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onView(user)}
            className="p-2 text-blue-600 rounded hover:bg-blue-100"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(user)}
            className="p-2 text-yellow-600 rounded hover:bg-yellow-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(user)}
            className="p-2 text-red-600 rounded hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;