import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomerGrowthChart = ({ data = [] }) => {
  const totalCustomers = data.reduce(
    (sum, item) => sum + Number(item.customers || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Customer Growth
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Monthly customer registrations
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Total Registered
          </p>

          <h3 className="text-3xl font-bold text-emerald-600">
            {totalCustomers}
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => [value, "Customers"]}
            labelFormatter={(label) => `Month: ${label}`}
          />

          <Line
            type="monotone"
            dataKey="customers"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerGrowthChart;