import {
  FaUsers,
  FaFileContract,
  FaClipboardCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

const iconMap = {
  "Total Customers": {
    icon: <FaUsers className="text-3xl text-white" />,
    bg: "bg-blue-500",
  },
  "Total Policies": {
    icon: <FaFileContract className="text-3xl text-white" />,
    bg: "bg-emerald-500",
  },
  "Total Claims": {
    icon: <FaClipboardCheck className="text-3xl text-white" />,
    bg: "bg-amber-500",
  },
  "Total Payments": {
    icon: <FaMoneyBillWave className="text-3xl text-white" />,
    bg: "bg-purple-500",
  },
};

const KpiCard = ({ title, value }) => {
  const config = iconMap[title] || {
    icon: <FaUsers className="text-3xl text-white" />,
    bg: "bg-slate-500",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl ${config.bg} flex items-center justify-center shadow-md`}
        >
          {config.icon}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-slate-500">
          Updated from latest system records
        </p>
      </div>
    </div>
  );
};

export default KpiCard;