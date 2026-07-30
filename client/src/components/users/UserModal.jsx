import UserForm from "./UserForm";

const UserModal = ({
  open,
  onClose,
  initialData,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {initialData ? "Edit User" : "Add User"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <UserForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default UserModal;