import axiosInstance from "./axiosInstance";

export const getPolicies = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axiosInstance.get("/policies", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data.data;
};

export const getPolicyById = async (id) => {
  const response = await axiosInstance.get(`/policies/${id}`);

  return response.data.data.policy;
};

export const createPolicy = async (data) => {
  const response = await axiosInstance.post("/policies", data);

  return response.data;
};

export const updatePolicy = async (id, data) => {
  const response = await axiosInstance.put(`/policies/${id}`, data);

  return response.data;
};

// Cancel Policy
export const cancelPolicy = async (id) => {
  const response = await axiosInstance.patch(
    `/policies/${id}/cancel`
  );

  return response.data;
};

// Renew Policy
export const renewPolicy = async (id) => {
  const response = await axiosInstance.patch(
    `/policies/${id}/renew`
  );

  return response.data;
};

// Get Expiring Policies
export const getExpiringPolicies = async (days = 30) => {
  const response = await axiosInstance.get("/policies/expiring", {
    params: {
      days,
    },
  });

  return response.data.data;
};

// Legacy Delete (keep temporarily if needed)
export const deletePolicy = async (id) => {
  const response = await axiosInstance.delete(`/policies/${id}`);

  return response.data;
};