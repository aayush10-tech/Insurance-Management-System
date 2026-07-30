import { FaSearch } from "react-icons/fa";

const PolicySearch = ({
  search,
  setSearch,
  setPage,
}) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="relative w-full md:w-96">

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <FaSearch />
      </span>

      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search by policy number, policy name, type or customer..."
        className="w-full rounded-lg border border-slate-300 py-2.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

    </div>
  );
};

export default PolicySearch;