import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

const PolicyPagination = ({
  page,
  setPage,
  totalPages,
  totalPolicies,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

      <div className="text-sm text-slate-600">
        Total Policies:
        <span className="font-semibold ml-1">
          {totalPolicies}
        </span>
      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-3 py-2 rounded-lg border disabled:opacity-50 hover:bg-slate-100"
        >
          <FaAngleDoubleLeft />
        </button>

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 rounded-lg border disabled:opacity-50 hover:bg-slate-100"
        >
          <FaAngleLeft />
        </button>

        <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
          {page}
        </span>

        <span className="text-slate-500">
          of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-2 rounded-lg border disabled:opacity-50 hover:bg-slate-100"
        >
          <FaAngleRight />
        </button>

        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-2 rounded-lg border disabled:opacity-50 hover:bg-slate-100"
        >
          <FaAngleDoubleRight />
        </button>

      </div>

    </div>
  );
};

export default PolicyPagination;