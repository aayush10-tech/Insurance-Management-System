import { Search } from "lucide-react";

const DocumentSearch = ({ search, setSearch }) => {
  return (
    <div className="relative w-full md:w-96">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4"
      />
    </div>
  );
};

export default DocumentSearch;