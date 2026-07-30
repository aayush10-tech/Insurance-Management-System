import { useState } from "react";
import { toast } from "react-toastify";

import ClaimForm from "./ClaimForm";

import {
  createClaim,
  updateClaim,
} from "../../services/claimService";

const ClaimModal = ({
  isOpen,
  onClose,
  initialData,
  refreshClaims,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      if (initialData) {
        await updateClaim(initialData.id, data);

        toast.success("Claim updated successfully");
      } else {
        await createClaim(data);

        toast.success("Claim created successfully");
      }

      refreshClaims();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {initialData
              ? "Edit Claim"
              : "Add Claim"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>

        </div>

        <div className="p-6">

          <ClaimForm
            initialData={initialData}
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>

      </div>

    </div>
  );
};

export default ClaimModal;