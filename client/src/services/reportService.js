import axiosInstance from "./axiosInstance";

// Get Dashboard Report
export const getDashboardReport = async () => {
  const response = await axiosInstance.get("/reports/dashboard");
  return response.data.data;
};