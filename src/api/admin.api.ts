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
export const apiAdminWithdrawHistory = async () => {
  try {
    const result = await axiosInstance.get(`api/Admin/WithdrawalHistory`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminWithdrawalStatus = async (id, status) => {
  try {
    const result = await axiosInstance.get(`api/Admin/WithdrawalStatus?withdrawalId=${id}&status=${status}`);
    if (result.data.success !== true) throw "Something went wrong.";
  } catch (error) {
    throw error;
  }
};

export const apiAdminRemoveAgent = async (agentUserId: string) => {
  try {
    const result = await axiosInstance.post(`/api/Admin/RemoveAgent`, { agentUserId });
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const apiAdminActivateAgent = async (agentUserId: string) => {
  try {
    const result = await axiosInstance.post(`/api/Admin/ActivateAgent`, { agentUserId });
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};
