import axiosInstance from "./axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};