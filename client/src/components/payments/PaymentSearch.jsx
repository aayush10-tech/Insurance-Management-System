const PaymentSearch = ({
  search,
  setSearch,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search */}
        <div className="lg:w-[55%]">
          <input
            type="text"
            placeholder="Search by customer, policy number or transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 lg:w-44"
        >
          <option value="">All Status</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>

        {/* Method */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 lg:w-44"
        >
          <option value="">All Methods</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="NET_BANKING">Net Banking</option>
          <option value="CASH">Cash</option>
        </select>

      </div>
    </div>
  );
};

export default PaymentSearch;