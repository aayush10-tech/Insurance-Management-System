import { useState } from "react";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../services/customerService";

const DeleteCustomerModal = ({
  isOpen,
  customer,
  onClose,
  onSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !customer) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteCustomer(customer.id);

      if (response.success) {
        toast.success("Customer deleted successfully");

        onSuccess?.();

        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete customer"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        {/* Header */}

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-bold text-red-600">
            Delete Customer
          </h2>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-slate-700">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {customer.firstName} {customer.lastName}
            </span>
            ?
          </p>

          <p className="text-sm text-slate-500 mt-3">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg disabled:opacity-60"
          >
            {isDeleting
              ? "Deleting..."
              : "Delete Customer"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteCustomerModal;