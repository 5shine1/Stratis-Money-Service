import axios from "axios";
import { BACKEND_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("stratis-auth-token");
}

axiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default axiosInstance;

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
