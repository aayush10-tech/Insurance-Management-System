import axiosInstance from "./axiosInstance";

export const getCustomers = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axiosInstance.get("/customers", {
    params: {
      page,
      limit,
      search,
    },
  });

  // Return only the useful data object
  return response.data.data;
};

export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customers/${id}`);
  return response.data.data.customer;
};

export const createCustomer = async (data) => {
  const response = await axiosInstance.post("/customers", data);
  return response.data;
};

export const updateCustomer = async (id, data) => {
  const response = await axiosInstance.put(`/customers/${id}`, data);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/customers/${id}`);
  return response.data;
};