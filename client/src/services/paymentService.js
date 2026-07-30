import axiosInstance from "./axiosInstance";

// Get all payments
export const getPayments = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  paymentMethod = ""
) => {
  const response = await axiosInstance.get("/payments", {
    params: {
      page,
      limit,
      search,
      status,
      paymentMethod,
    },
  });

  return response.data.data;
};

// Get payment by ID
export const getPaymentById = async (id) => {
  const response = await axiosInstance.get(`/payments/${id}`);
  return response.data.data;
};

// Create payment
export const createPayment = async (data) => {
  const response = await axiosInstance.post("/payments", data);
  return response.data;
};

// Update payment
export const updatePayment = async (id, data) => {
  const response = await axiosInstance.put(`/payments/${id}`, data);
  return response.data;
};

// Delete payment
export const deletePayment = async (id) => {
  const response = await axiosInstance.delete(`/payments/${id}`);
  return response.data;
};