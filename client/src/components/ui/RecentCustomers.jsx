const RecentCustomers = ({ customers = [] }) => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Recent Customers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest registered customers
          </p>
        </div>

        <button className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
          View All
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-slate-500">
          No customers found.
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {customer.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-slate-700">
                  {customer.phone}
                </p>

                <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentCustomers;