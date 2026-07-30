const UserPagination = ({
  page,
  setPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Previous
      </button>

      <span className="font-medium text-gray-700">
        Page {page} of {Math.max(totalPages, 1)}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages || totalPages === 0}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default UserPagination;