import axios from "axios";
import { BACKEND_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("stratis-auth-token");
  if (token) config.headers["Authorization"] = "Bearer " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const accessToken = localStorage.getItem("stratis-auth-token");
      const refreshToken = localStorage.getItem("stratis-auth-refresh");
      return new Promise((resolve, reject) => {
        axios
          .post(`${BACKEND_URL}/api/Identity/Refresh`, { accessToken, refreshToken })
          .then(({ data }) => {
            console.log(data);
            if (!data?.isSucceed) throw "Server error";
            localStorage.setItem("stratis-auth-token", data?.data?.accessToken);
            localStorage.setItem("stratis-auth-refresh", data?.data?.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
            originalRequest.headers["Authorization"] = "Bearer " + data?.data?.accessToken;
            processQueue(null, data?.data?.accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            localStorage.removeItem("stratis-auth-token");
            localStorage.removeItem("stratis-auth-refresh");
            processQueue(err, null);
            reject(err);
            location.href = "/auth/login";
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
