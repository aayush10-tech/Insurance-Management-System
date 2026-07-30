import DocumentRow from "./DocumentRow";

const DocumentTable = ({
  documents,
  onView,
  onEdit,
  onDelete,
  onDownload,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
              #
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
              Document Name
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
              Type
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
              Customer
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
              File
            </th>

            <th className="px-6 py-3 text-center text-xs font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {documents.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No documents found.
              </td>
            </tr>
          ) : (
            documents.map((document, index) => (
              <DocumentRow
                key={document.id}
                index={index}
                document={document}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;