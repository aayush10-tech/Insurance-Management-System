const ViewPaymentModal = ({
  isOpen,
  payment,
  onClose,
}) => {
  if (!isOpen || !payment) return null;

  const customer = payment.policy?.customer;
  const policy = payment.policy;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">

        <div className="flex justify-between items-center border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            Payment Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-600"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <Info
            label="Policy Number"
            value={policy?.policyNumber}
          />

          <Info
            label="Customer"
            value={
              customer
                ? `${customer.firstName} ${customer.lastName}`
                : "-"
            }
          />

          <Info
            label="Amount"
            value={`₹${Number(payment.amount).toLocaleString("en-IN")}`}
          />

          <Info
            label="Payment Method"
            value={payment.paymentMethod}
          />

          <Info
            label="Status"
            value={payment.status}
          />

          <Info
            label="Transaction ID"
            value={payment.transactionId || "-"}
          />

          <Info
            label="Payment Date"
            value={new Date(
              payment.paymentDate
            ).toLocaleDateString()}
          />

          <div className="md:col-span-2">
            <label className="font-semibold block mb-2">
              Remarks
            </label>

            <div className="border rounded-lg p-3 bg-slate-50">
              {payment.remarks || "-"}
            </div>
          </div>

        </div>

        <div className="flex justify-end p-6 border-t">

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

const Info = ({ label, value }) => (
  <div>
    <label className="font-semibold block mb-2">
      {label}
    </label>

    <div className="border rounded-lg p-3 bg-slate-50">
      {value}
    </div>
  </div>
);

export default ViewPaymentModal;