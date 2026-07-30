import KpiCard from "./KpiCard";

const StatsGrid = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
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