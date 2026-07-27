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
];

const data = [
    {
        name: "Approved",
        value: 12,
    },
    {
        name: "Pending",
        value: 5,
    },
    {
        name: "Rejected",
        value: 2,
    },
];

const ClaimsChart = () => {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-full">

            <h2 className="text-xl font-semibold text-slate-800 mb-5">
                Claims Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={95}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ClaimsChart;