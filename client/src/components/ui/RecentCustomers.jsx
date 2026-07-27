const RecentCustomers = ({ customers = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent Customers
        </h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No customers found.
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {customer.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {customer.email}
                </p>
              </div>

              <span className="text-sm text-slate-500">
                {customer.phone}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentCustomers;