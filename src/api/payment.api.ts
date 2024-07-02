import axiosInstance from "@/config/axios";

export const apiGetCurrencies = async () => {
  try {
    const result = await axiosInstance.get("/api/Payment/Currencies");
    return result?.data;
  } catch (error) {
    throw error;
  }
};
