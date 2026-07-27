import DashboardLayout from "../../components/layout/DashboardLayout";

const ComingSoon = ({ title }) => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm border p-10">

        <h1 className="text-4xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-3 text-gray-500">
          This module is under development.
        </p>

      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;