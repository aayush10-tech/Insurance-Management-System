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
    const isSuccess = selectedUser
      ? await editUser(selectedUser.id, data)
      : await addUser(data);

    if (isSuccess) {
      setShowUserModal(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteConfirm = async (id) => {
    const isSuccess = await removeUser(id);

    if (isSuccess) {
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Users
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              Manage system users and their access permissions.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <UserSearch
            search={search}
            setSearch={setSearch}
            onAdd={handleAdd}
          />
        </div>

        <UserTable
          users={users}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="mt-8">
          <UserPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>

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