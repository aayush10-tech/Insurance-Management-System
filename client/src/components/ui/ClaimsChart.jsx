import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

const ClaimsChart = ({ data = [] }) => {
  const chartData = data.filter((item) => item.value > 0);

  const totalClaims = chartData.reduce(
    (sum, item) => sum + Number(item.value || 0),
    0
  );

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

      <div className="mb-6 flex items-start justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Claims Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of all claims by status
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Total
          </p>

          <h3 className="text-3xl font-bold text-emerald-600">
            {totalClaims}
          </h3>
        </div>

      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={3}
            stroke="white"
            strokeWidth={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 20,
            }}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ClaimsChart;