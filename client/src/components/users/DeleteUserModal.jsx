const DeleteUserModal = ({
  open,
  onClose,
  user,
  onConfirm,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold text-red-600">
          Delete User
        </h2>

        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this user?
        </p>

        <div className="p-4 mb-6 bg-gray-100 rounded-lg">
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(user.id)}
            className="px-5 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;