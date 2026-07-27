import { FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white h-20 shadow-sm border-b px-8 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back!
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
          <FaBell />
        </button>

        <div className="text-right">
          <h3 className="font-semibold">
            {user?.fullName}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>
        </div>

      </div>

    </header>
  );
};

export default Navbar;