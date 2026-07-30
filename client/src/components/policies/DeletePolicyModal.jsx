import { toast } from "react-toastify";
import { deletePolicy } from "../../services/policyService";

const DeletePolicyModal = ({
  isOpen,
  onClose,
  policy,
  onSuccess,
}) => {
  if (!isOpen || !policy) return null;

  const handleDelete = async () => {
    try {
      const response = await deletePolicy(policy.id);

      if (response.success) {
        toast.success("Policy deleted successfully");

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
            "Failed to delete policy"
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        <div className="px-6 py-5 border-b">

          <h2 className="text-2xl font-bold text-red-600">
            Delete Policy
          </h2>

        </div>

        <div className="p-6">

          <p className="text-slate-700">
            Are you sure you want to delete this policy?
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

          <p className="mt-5 text-sm text-red-600">
            This action cannot be undone.
          </p>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete Policy
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeletePolicyModal;