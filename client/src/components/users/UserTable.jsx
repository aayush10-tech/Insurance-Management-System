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
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 py-20 text-center text-gray-500">
        Loading users...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 py-20 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-gray-700">

            <th className="px-6 py-5 text-left text-sm font-bold">
              User
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Email
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Role
            </th>

            <th className="px-6 py-5 text-left text-sm font-bold">
              Created
            </th>

            <th className="px-6 py-5 text-center text-sm font-bold w-52">
              Actions
            </th>

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