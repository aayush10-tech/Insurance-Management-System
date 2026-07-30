const ClaimPagination = ({
  page,
  setPage,
  totalPages,
  totalClaims,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

      <div className="text-sm text-gray-600">
        Total Claims:
        <span className="font-semibold ml-1">
          {totalClaims}
        </span>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border transition ${
            page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded-lg border transition ${
            page >= totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default ClaimPagination;