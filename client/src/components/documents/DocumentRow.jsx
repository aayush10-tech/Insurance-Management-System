import {
  Eye,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";

const DocumentRow = ({
  index,
  document,
  onView,
  onEdit,
  onDelete,
  onDownload,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">{index + 1}</td>

      <td className="px-6 py-4 font-medium">
        {document.documentName}
      </td>

      <td className="px-6 py-4">
        {document.documentType}
      </td>

      <td className="px-6 py-4">
        {document.customer
          ? `${document.customer.firstName} ${document.customer.lastName}`
          : "-"}
      </td>

      <td className="px-6 py-4">
        <span className="text-blue-600">
          {document.fileName}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onView(document)}
            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            title="View"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => onEdit(document)}
            className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-600"
            title="Edit"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDownload(document.id)}
            className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
            title="Download"
          >
            <Download size={16} />
          </button>

          <button
            onClick={() => onDelete(document)}
            className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;