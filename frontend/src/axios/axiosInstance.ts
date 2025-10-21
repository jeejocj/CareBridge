import axios from "axios";
import { store } from "@/store/store";
import { setToken, removeToken } from "@/store/slices/tokenSlice";
import { removeUser } from "@/store/slices/authSlice";


export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true, 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().token.accessToken; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response?.status === 401 &&
      err.response?.data?.error === "Invalid Token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post('api/auth/refresh');     
        store.dispatch(setToken(refreshResponse.data.accessToken));
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError); 
        store.dispatch(removeToken());
        store.dispatch(removeUser());
        const role = store.getState().user.userData?.role;
        if (role === "ADMIN") {
          window.location.href = "api/auth/admin/login";
        } else if (role === "DOCTOR") {
          window.location.href = "api/auth//doctor/login";
        } else {
          window.location.href = "api/auth/login";
        }
      }
    }
    return Promise.reject(err);
  }
);
