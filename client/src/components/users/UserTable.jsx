import UserRow from "./UserRow";

const UserTable = ({
  users,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading users...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="text-white bg-blue-600">
          <tr>
            <th className="px-6 py-3 text-left">Full Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Created</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;