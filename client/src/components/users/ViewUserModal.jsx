const ViewUserModal = ({
  open,
  onClose,
  user,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="text-lg font-medium">
              {user.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="text-lg font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                user.role === "ADMIN"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {user.role}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created At
            </p>

            <p className="text-lg font-medium">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;