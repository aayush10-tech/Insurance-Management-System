import KpiCard from "./KpiCard";
import { stats } from "../../utils/dashboardData";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <KpiCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatsGrid;