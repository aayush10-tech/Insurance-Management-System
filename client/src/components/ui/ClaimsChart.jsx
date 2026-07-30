import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e", // Approved
  "#f59e0b", // Pending
  "#ef4444", // Rejected
  "#3b82f6", // Others (Future)
];

const ClaimsChart = ({ data = [] }) => {
  const chartData = data.filter((item) => item.value > 0);

  const totalClaims = chartData.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Claims Status
        </h2>

        <p className="text-sm text-slate-500">
          Current insurance claim distribution
        </p>

        <div className="mt-2">
          <p className="text-sm text-slate-500">
            Total Claims
          </p>

          <h3 className="text-3xl font-bold text-emerald-600">
            {totalClaims}
          </h3>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [value, "Claims"]}
          />

          <Legend />
            verticalAlign="bottom"
            height={36}
          /
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClaimsChart;