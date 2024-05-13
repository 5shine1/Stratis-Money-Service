import axios from "axios";
import { BACKEND_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["auth-token"] = localStorage.getItem("stratis-auth-token");
  return config;
});

export default axiosInstance;

export const getErrorMessage = (err: any) => {
  return (
    err.response?.data?.error ||
    err.response?.data?.message ||
    err.message ||
    "Server Error"
  );
};

export const fileUpload = async (file: any, path: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "upload-path": path,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
