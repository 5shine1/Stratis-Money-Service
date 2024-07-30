import axiosInstance from "@/config/axios";

export const apiGetCurrencies = async (isFiat = true) => {
  try {
    const result = await axiosInstance.get(`/api/Payment/Currencies?fiat=${isFiat}`);
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const apiGenerate = async (amount: number, currencySymbol: string, description: string, payer: string) => {
  try {
    const result = await axiosInstance.post("/api/Payment/Generate", { amount, currencySymbol, description, payer });
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const apiPaymentHistory = async () => {
  try {
    const result = await axiosInstance.get("/api/Payment/History");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiPaymentHistoryDetail = async (id: string) => {
  try {
    const result = await axiosInstance.get(`/api/Payment/History/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiPaymentStart = async (paymentId: string) => {
  try {
    const result = await axiosInstance.post(`api/Payment/Start`, { paymentId });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiMakePayment = async (paymentId: string, paymentCurrencySymbol: string) => {
  try {
    const result = await axiosInstance.post(`api/Payment/MakePayment`, { paymentId, paymentCurrencySymbol });
    return result.data;
  } catch (error) {
    throw error;
  }
};
