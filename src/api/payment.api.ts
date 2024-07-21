import axiosInstance from "@/config/axios";

export const apiGetCurrencies = async () => {
  try {
    const result = await axiosInstance.get("/api/Payment/Currencies");
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

// export const apiPaymentStart = async(paymentId:string, payer:string)=> {

// }

// ----------------------------   admin   ------------------------

export const apiAdminPaymentHistory = async () => {
  try {
    const result = await axiosInstance.get("/api/Admin/PaymentHistory");
    return result.data;
  } catch (error) {
    throw error;
  }
};
