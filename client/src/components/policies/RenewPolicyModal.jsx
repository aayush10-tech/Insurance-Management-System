import { FaRedoAlt } from "react-icons/fa";

const RenewPolicyModal = ({
  isOpen,
  policy,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !policy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn">

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <FaRedoAlt className="text-indigo-600 text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Renew Policy
            </h2>

            <p className="text-sm text-slate-500">
              This will extend the policy by one year.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">

          <div>
            <p className="text-sm text-slate-500">
              Policy Number
            </p>

            <p className="font-semibold">
              {policy.policyNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Policy Name
            </p>

            <p className="font-semibold">
              {policy.policyName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Customer
            </p>

            <p className="font-semibold">
              {policy.customer?.firstName} {policy.customer?.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Expiry Date
            </p>

            <p className="font-semibold">
              {new Date(policy.endDate).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {loading ? "Renewing..." : "Renew Policy"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RenewPolicyModal;