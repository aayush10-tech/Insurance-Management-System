import axiosInstance from "./axiosInstance";

export const getClaims = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const response = await axiosInstance.get("/claims", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data.data;
};

export const getClaimById = async (id) => {
  const response = await axiosInstance.get(`/claims/${id}`);

  return response.data.data;
};

export const createClaim = async (data) => {
  const response = await axiosInstance.post("/claims", data);

  return response.data;
};

export const updateClaim = async (id, data) => {
  const response = await axiosInstance.put(`/claims/${id}`, data);

  return response.data;
};

export const deleteClaim = async (id) => {
  const response = await axiosInstance.delete(`/claims/${id}`);

  return response.data;
};