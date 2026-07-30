import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers(page, limit, search);

      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUsers || 0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const addUser = async (payload) => {
    try {
      await createUser(payload);

      toast.success("User created successfully.");

      fetchUsers();

      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create user."
      );

      return false;
    }
  };

  const editUser = async (id, payload) => {
    try {
      await updateUser(id, payload);

      toast.success("User updated successfully.");

      fetchUsers();

      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update user."
      );

      return false;
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);

      toast.success("User deleted successfully.");

      fetchUsers();

      return true;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete user."
      );

      return false;
    }
  };

  return {
    users,
    loading,

    page,
    setPage,

    limit,

    search,
    setSearch,

    totalPages,
    totalUsers,

    fetchUsers,

    addUser,
    editUser,
    removeUser,
  };
};

export default useUsers;