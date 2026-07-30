import { Search, Plus } from "lucide-react";

const UserSearch = ({
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute text-gray-400 left-3 top-3"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <Plus size={18} />
        Add User
      </button>
    </div>
  );
};

export default UserSearch;