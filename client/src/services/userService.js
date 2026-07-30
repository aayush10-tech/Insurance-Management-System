import axiosInstance from "./axiosInstance";

// Get All Users
export const getUsers = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axiosInstance.get("/users", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data.data;
};

// Get User By ID
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data.data;
};

// Create User
export const createUser = async (data) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

// Update User
export const updateUser = async (id, data) => {
  const response = await axiosInstance.put(`/users/${id}`, data);
  return response.data;
};

// Delete User
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};