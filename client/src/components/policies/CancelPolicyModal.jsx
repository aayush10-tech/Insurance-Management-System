import { toast } from "react-toastify";
import { cancelPolicy } from "../../services/policyService";

const CancelPolicyModal = ({
  isOpen,
  onClose,
  policy,
  onSuccess,
}) => {
  if (!isOpen || !policy) return null;

  const handleCancelPolicy = async () => {
    try {
      const response = await cancelPolicy(policy.id);

      if (response.success) {
        toast.success("Policy cancelled successfully");

        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors?.length) {
        toast.error(error.response.data.errors[0].message);
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to cancel policy"
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="px-6 py-5 border-b">
          <h2 className="text-2xl font-bold text-orange-600">
            Cancel Policy
          </h2>
        </div>

        <div className="p-6">
          <p className="text-slate-700">
            Are you sure you want to cancel this policy?
          </p>

          <div className="mt-5 rounded-lg bg-slate-100 p-4">
            <p>
              <span className="font-semibold">
                Policy Number:
              </span>{" "}
              {policy.policyNumber}
            </p>

            <p className="mt-2">
              <span className="font-semibold">
                Policy Name:
              </span>{" "}
              {policy.policyName}
            </p>
          </div>

          <p className="mt-5 text-sm text-orange-600">
            The policy will remain in the system but its status will be changed
            to <strong>CANCELLED</strong>.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-slate-100"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleCancelPolicy}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg"
          >
            Cancel Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPolicyModal;