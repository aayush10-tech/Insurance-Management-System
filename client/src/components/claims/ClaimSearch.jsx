import { FaSearch } from "react-icons/fa";

const ClaimSearch = ({
  search,
  setSearch,
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">

      <div className="relative w-full md:w-96">

        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search by Claim Number or Policy Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
  );
};

export default ClaimSearch;