const DocumentPagination = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`rounded-lg px-4 py-2 ${
          page === 1
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Previous
      </button>

      <span className="font-medium">
        Page {page} of {Math.max(totalPages, 1)}
      </span>

      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => setPage(page + 1)}
        className={`rounded-lg px-4 py-2 ${
          page === totalPages || totalPages === 0
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default DocumentPagination;