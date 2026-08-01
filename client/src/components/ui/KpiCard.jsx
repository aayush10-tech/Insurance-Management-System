import {
  FaUsers,
  FaFileContract,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";

const iconMap = {
  "Total Customers": {
    icon: <FaUsers className="text-2xl text-white" />,
    color: "from-blue-500 to-blue-600",
  },

  "Total Policies": {
    icon: <FaFileContract className="text-2xl text-white" />,
    color: "from-emerald-500 to-emerald-600",
  },

  "Active Policies": {
    icon: <FaShieldAlt className="text-2xl text-white" />,
    color: "from-green-500 to-green-600",
  },

  "Expired Policies": {
    icon: <FaClock className="text-2xl text-white" />,
    color: "from-red-500 to-red-600",
  },

  "Total Claims": {
    icon: <FaClipboardCheck className="text-2xl text-white" />,
    color: "from-orange-500 to-orange-600",
  },

  "Total Payments": {
    icon: <FaMoneyBillWave className="text-2xl text-white" />,
    color: "from-violet-500 to-violet-600",
  },

  "Approved Claims": {
    icon: <FaCheckCircle className="text-2xl text-white" />,
    color: "from-cyan-500 to-cyan-600",
  },

  "Premium Collected": {
    icon: <FaWallet className="text-2xl text-white" />,
    color: "from-indigo-500 to-indigo-600",
  },
};

const KpiCard = ({ title, value }) => {
  const config = iconMap[title] || {
    icon: <FaUsers className="text-2xl text-white" />,
    color: "from-slate-500 to-slate-600",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${config.color}`}
      />

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 break-words text-4xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {config.icon}
        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3">

        <span className="text-sm text-slate-500">
          Last Updated
        </span>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Updated
        </span>

      </div>
    </div>
  );
};

export default KpiCard;