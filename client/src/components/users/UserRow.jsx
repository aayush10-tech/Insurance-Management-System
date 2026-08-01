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
  const initials = user.fullName
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <tr className="border-t border-gray-100 hover:bg-blue-50 transition-all duration-200">

      {/* User */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {user.fullName}
            </h3>

            <p className="text-sm text-gray-500">
              System User
            </p>
          </div>

        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-5">
        <span className="text-gray-700">
          {user.email}
        </span>
      </td>

      {/* Role */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            user.role === "ADMIN"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Created */}
      <td className="px-6 py-5 text-gray-700">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-3 whitespace-nowrap">

          <button
            onClick={() => onView(user)}
            title="View"
            className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
          >
            <Eye size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onEdit(user)}
            title="Edit"
            className="w-11 h-11 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all"
          >
            <Pencil size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onDelete(user)}
            title="Delete"
            className="w-11 h-11 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
          >
            <Trash2 size={18} className="mx-auto" />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default UserRow;