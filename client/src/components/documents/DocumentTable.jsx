import DocumentRow from "./DocumentRow";

const DocumentTable = ({
  documents,
  onView,
  onEdit,
  onDelete,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-gray-700">
            <th className="px-6 py-5 text-left text-sm font-bold">#</th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Document
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Type
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Customer
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              File
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold w-56">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-gray-500"
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