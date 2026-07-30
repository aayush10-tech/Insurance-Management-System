import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import useUsers from "../../hooks/useUsers";

import UserSearch from "../../components/users/UserSearch";
import UserTable from "../../components/users/UserTable";
import UserPagination from "../../components/users/UserPagination";
import UserModal from "../../components/users/UserModal";
import ViewUserModal from "../../components/users/ViewUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";

const Users = () => {
  const {
    users,
    loading,

    page,
    setPage,

    search,
    setSearch,

    totalPages,

    addUser,
    editUser,
    removeUser,
  } = useUsers();

  const [showUserModal, setShowUserModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (data) => {
    let success = false;

    if (selectedUser) {
      success = await editUser(selectedUser.id, data);
    } else {
      success = await addUser(data);
    }

    if (success) {
      setShowUserModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteConfirm = async (id) => {
    const success = await removeUser(id);

    if (success) {
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Users
            </h1>

            <p className="text-gray-500">
              Manage system users.
            </p>
          </div>
        </div>

        <UserSearch
          search={search}
          setSearch={setSearch}
          onAdd={handleAdd}
        />

        <UserTable
          users={users}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <UserPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />

        <UserModal
          open={showUserModal}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          initialData={selectedUser}
          onSubmit={handleSubmit}
        />

        <ViewUserModal
          open={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />

        <DeleteUserModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onConfirm={handleDeleteConfirm}
        />

      </div>
    </DashboardLayout>
  );
};

export default Users;