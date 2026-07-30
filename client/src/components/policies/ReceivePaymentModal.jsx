import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaTimes } from "react-icons/fa";

const ReceivePaymentModal = ({
  isOpen,
  onClose,
  onConfirm,
  policy,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    paymentDate: "",
    paymentMethod: "CASH",
    transactionId: "",
    remarks: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "CASH",
        transactionId: "",
        remarks: "",
      });
    }
  }, [isOpen]);

  if (!isOpen || !policy) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onConfirm({
      policyId: policy.id,
      amount: Number(policy.premiumAmount),
      paymentDate: formData.paymentDate,
      paymentMethod: formData.paymentMethod,
      transactionId: formData.transactionId,
      remarks: formData.remarks,
      status: "PAID",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600 text-xl" />
            <h2 className="text-xl font-bold">
              Receive Premium Payment
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-slate-500 hover:text-red-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-slate-500">
                Policy Number
              </label>

              <div className="mt-1 border rounded-lg p-3 bg-slate-50">
                {policy.policyNumber}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">
                Customer
              </label>

              <div className="mt-1 border rounded-lg p-3 bg-slate-50">
                {policy.customer?.firstName} {policy.customer?.lastName}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">
                Premium Amount
              </label>

              <div className="mt-1 border rounded-lg p-3 bg-slate-50 font-semibold text-blue-600">
                ₹{Number(policy.premiumAmount).toLocaleString("en-IN")}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Payment Date
              </label>

              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              >
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                <option value="CARD">Card</option>
                <option value="NET_BANKING">Net Banking</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Transaction ID
              </label>

              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          <div>
            <label className="text-sm font-medium">
              Remarks
            </label>

            <textarea
              rows="3"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Enter remarks..."
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Receiving..." : "Receive Payment"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ReceivePaymentModal;