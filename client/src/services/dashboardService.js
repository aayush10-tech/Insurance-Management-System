import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/dashboard/summary");
  return response.data;
};