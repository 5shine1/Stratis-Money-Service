import axiosInstance from "@/config/axios";

export const apiAdminPaymentHistory = async () => {
  try {
    const result = await axiosInstance.get("/api/Admin/PaymentHistory");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminUsers = async () => {
  try {
    const result = await axiosInstance.post("/api/Admin/UserInfo");
    return result.data;
  } catch (error) {
    throw error;
  }
};
