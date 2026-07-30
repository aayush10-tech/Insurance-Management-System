const DeleteDocumentModal = ({
  isOpen,
  onClose,
  onConfirm,
  document,
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        <h2 className="mb-4 text-xl font-bold text-red-600">
          Delete Document
        </h2>

        <p className="text-gray-700">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {document.documentName}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(document.id)}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteDocumentModal;