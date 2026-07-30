import { toast } from "react-toastify";
import { deletePayment } from "../../services/paymentService";

const DeletePaymentModal = ({
  isOpen,
  payment,
  onClose,
  onSuccess,
}) => {
  if (!isOpen || !payment) return null;

  const handleDelete = async () => {
    try {
      const response = await deletePayment(payment.id);

      if (response.success) {
        toast.success("Payment deleted successfully");
        onSuccess?.();
        onClose?.();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

        <div className="p-6">

          <h2 className="text-2xl font-bold mb-4">
            Delete Payment
          </h2>

          <p className="text-slate-600">
            Are you sure you want to delete this payment?
          </p>

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DeletePaymentModal;