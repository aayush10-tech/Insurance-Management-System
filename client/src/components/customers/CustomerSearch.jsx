import { FaSearch } from "react-icons/fa";

const CustomerSearch = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search customers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default CustomerSearch;