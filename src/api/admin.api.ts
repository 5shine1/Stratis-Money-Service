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

export const apiAdminPaymentHistoryByUser = async (userId: string) => {
  try {
    const result = await axiosInstance.get(`/api/Admin/PaymentHistory/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminUserDetail = async (userId: string) => {
  try {
    const result = await axiosInstance.post(`/api/Admin/UserInfo/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminPaymentHistoryDetail = async (id: string) => {
  try {
    const result = await axiosInstance.get(`/api/Admin/Payment/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminDeleteOrder = async (id: string) => {
  try {
    const result = await axiosInstance.delete(`/api/Admin/Payment/Delete/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const apiActivateUser = async (userId: string, status: boolean) => {
  try {
    const result = await axiosInstance.post(`/api/Admin/KybManualReview?userId=${userId}`, status);
    return result.data;
  } catch (error) {
    throw error;
  }
};
