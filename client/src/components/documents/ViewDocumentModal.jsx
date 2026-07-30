const ViewDocumentModal = ({
  isOpen,
  onClose,
  document,
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-2xl font-bold">
          Document Details
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              Document Name
            </p>

            <p className="font-medium">
              {document.documentName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Document Type
            </p>

            <p className="font-medium">
              {document.documentType}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-medium">
              {document.customer
                ? `${document.customer.firstName} ${document.customer.lastName}`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              File Name
            </p>

            <p className="font-medium">
              {document.fileName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              File Size
            </p>

            <p className="font-medium">
              {document.fileSize
                ? `${(document.fileSize / 1024).toFixed(2)} KB`
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              MIME Type
            </p>

            <p className="font-medium">
              {document.mimeType}
            </p>
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default ViewDocumentModal;