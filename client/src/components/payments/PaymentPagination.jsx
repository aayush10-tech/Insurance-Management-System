const PaymentPagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">

      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      <span className="font-medium text-slate-700">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || totalPages === 0}
        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>

    </div>
  );
};

export default PaymentPagination;