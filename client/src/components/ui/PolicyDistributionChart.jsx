import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

const PolicyDistributionChart = ({ data = [] }) => {
  const totalPolicies = data.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Policy Distribution
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Distribution of insurance policies by type
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Total Policies
          </p>

          <h3 className="text-3xl font-bold text-indigo-600">
            {totalPolicies}
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [value, "Policies"]}
          />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PolicyDistributionChart;