import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileContract,
  FaMoneyBillWave,
  FaClipboardList,
  FaFolderOpen,
  FaUserShield,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <FaUsers />,
  },
  {
    name: "Policies",
    path: "/policies",
    icon: <FaFileContract />,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: <FaMoneyBillWave />,
  },
  {
    name: "Claims",
    path: "/claims",
    icon: <FaClipboardList />,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <FaFolderOpen />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUserShield />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">
      <div className="h-20 flex items-center px-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold">IMS</h1>
      </div>

      <nav className="flex-1 p-5 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl transition ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-5 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-red-600 hover:bg-red-700 transition"
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;