const CustomerPagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      >
        Previous
      </button>

      <span className="font-medium text-slate-700">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
      >
        Next
      </button>
    </div>
  );
};

export default CustomerPagination;