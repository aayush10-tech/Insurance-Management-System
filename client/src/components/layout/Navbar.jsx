import { FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="flex h-full items-center justify-between px-6 lg:px-8">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back,{" "}
            <span className="font-semibold text-slate-700">
              {user?.fullName?.split(" ")[0] || "User"}
            </span>
            👋
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <FaBell className="text-slate-600" />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                {user?.fullName}
              </h3>

              <p className="text-xs uppercase tracking-wider text-slate-500">
                {user?.role}
              </p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;