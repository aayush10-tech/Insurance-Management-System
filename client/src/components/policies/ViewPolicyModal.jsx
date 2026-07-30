const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-medium mt-1">
      {value || "-"}
    </p>
  </div>
);

const getStatusBadge = (status) => {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
          Active
        </span>
      );

    case "EXPIRED":
      return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
          Expired
        </span>
      );

    case "CANCELLED":
      return (
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
          Cancelled
        </span>
      );

    default:
      return status;
  }
};

const ViewPolicyModal = ({
  isOpen,
  onClose,
  policy,
}) => {
  if (!isOpen || !policy) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl">

        <div className="flex justify-between items-center border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            Policy Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-600"
          >
            ×
          </button>

        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <Detail
            label="Policy Number"
            value={policy.policyNumber}
          />

          <Detail
            label="Policy Name"
            value={policy.policyName}
          />

          <Detail
            label="Customer"
            value={`${policy.customer?.firstName ?? ""} ${policy.customer?.lastName ?? ""}`}
          />

          <Detail
            label="Policy Type"
            value={policy.policyType}
          />

          <Detail
            label="Premium Amount"
            value={`₹${Number(
              policy.premiumAmount
            ).toLocaleString("en-IN")}`}
          />

          <Detail
            label="Coverage Amount"
            value={`₹${Number(
              policy.coverageAmount
            ).toLocaleString("en-IN")}`}
          />

          <Detail
            label="Payment Frequency"
            value={policy.paymentFrequency}
          />

          <Detail
            label="Start Date"
            value={new Date(
              policy.startDate
            ).toLocaleDateString("en-IN")}
          />

          <Detail
            label="End Date"
            value={new Date(
              policy.endDate
            ).toLocaleDateString("en-IN")}
          />

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <div className="mt-2">
              {getStatusBadge(policy.status)}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">
              Description
            </p>

            <p className="mt-2">
              {policy.description || "-"}
            </p>
          </div>

        </div>

        <div className="border-t px-6 py-5 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ViewPolicyModal;