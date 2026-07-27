const KpiCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

      <div
        className={`w-14 h-14 rounded-xl ${color}`}
      />

      <p className="text-gray-500 mt-5">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
};

export default KpiCard;