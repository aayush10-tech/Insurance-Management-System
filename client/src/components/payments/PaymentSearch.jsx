const PaymentSearch = ({
  search,
  setSearch,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="bg-white rounded-xl shadow border p-4 flex flex-col lg:flex-row gap-4">

      {/* Search */}
      <input
        type="text"
        placeholder="Search by customer, policy number or transaction ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="PAID">Paid</option>
        <option value="FAILED">Failed</option>
      </select>

      {/* Payment Method Filter */}
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Methods</option>
        <option value="CASH">Cash</option>
        <option value="UPI">UPI</option>
        <option value="CARD">Card</option>
        <option value="NET_BANKING">Net Banking</option>
      </select>

    </div>
  );
};

export default PaymentSearch;