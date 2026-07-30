import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data = [] }) => {
  const totalRevenue = data.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Monthly Premium Collection
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Premium payments collected throughout the year
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Total Premium Collected
          </p>

          <h3 className="text-3xl font-bold text-blue-600">
            ₹{totalRevenue.toLocaleString()}
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString()}`,
              "Premium",
            ]}
            labelFormatter={(label) => `Month: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#premiumGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;