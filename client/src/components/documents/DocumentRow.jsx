import {
  Eye,
  Pencil,
  Trash2,
  Download,
  FileText,
} from "lucide-react";

const DocumentRow = ({
  index,
  document,
  onView,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const customer = document.customer
    ? `${document.customer.firstName} ${document.customer.lastName}`
    : "Unknown Customer";

  const initials = customer
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <tr className="border-t border-gray-100 hover:bg-blue-50 transition-all duration-200">
      {/* Index */}
      <td className="px-6 py-5 text-gray-700 font-medium">
        {index + 1}
      </td>

      {/* Document */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {document.documentName}
            </h3>

            <p className="text-sm text-gray-500">
              Insurance Document
            </p>
          </div>
        </div>
      </td>

      {/* Type */}
      <td className="px-6 py-5">
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
          {document.documentType}
        </span>
      </td>

      {/* Customer */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {customer}
            </h3>

            <p className="text-sm text-gray-500">
              Policy Holder
            </p>
          </div>
        </div>
      </td>

      {/* File */}
      <td className="px-6 py-5">
        <span className="inline-flex items-center px-3 py-2 rounded-xl bg-blue-50 text-blue-700 font-medium text-sm">
          {document.fileName}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center justify-center gap-3 whitespace-nowrap">
          <button
            onClick={() => onView(document)}
            className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            title="View"
          >
            <Eye size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onEdit(document)}
            className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all"
            title="Edit"
          >
            <Pencil size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onDownload(document.id)}
            className="w-11 h-11 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all"
            title="Download"
          >
            <Download size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onDelete(document)}
            className="w-11 h-11 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
            title="Delete"
          >
            <Trash2 size={18} className="mx-auto" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;