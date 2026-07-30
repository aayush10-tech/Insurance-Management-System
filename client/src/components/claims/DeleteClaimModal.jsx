import { useState } from "react";
import { toast } from "react-toastify";

import { deleteClaim } from "../../services/claimService";

const DeleteClaimModal = ({
  isOpen,
  onClose,
  claim,
  refreshClaims,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !claim) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteClaim(claim.id);

      toast.success("Claim deleted successfully");

      refreshClaims();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete claim"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-red-600">
            Delete Claim
          </h2>
        </div>

        <div className="p-6">

          <p className="text-gray-700">
            Are you sure you want to delete this claim?
          </p>

          <div className="mt-4 rounded-lg bg-gray-100 p-4">

            <p>
              <strong>Claim Number:</strong>{" "}
              {claim.claimNumber}
            </p>

            <p>
              <strong>Policy:</strong>{" "}
              {claim.policy?.policyNumber || "-"}
            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteClaimModal;