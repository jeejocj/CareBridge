import { axiosInstance } from "@/axios/axiosInstance";

export const registerUser = (email: string) => {
  return axiosInstance.post("/api/auth/signup", { email });
};

export const verifyUserOtp = async (data: {otp: string; userData: { fullName: string; email: string; password: string; role: string };}) => {
  return await axiosInstance.post("/api/auth/verify", data);
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  return await axiosInstance.post("/api/auth/login", credentials);
};


