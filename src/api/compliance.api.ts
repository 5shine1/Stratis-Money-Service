import axiosInstance from "@/config/axios";

export const apiStartKYB = async () => {
  try {
    const result = await axiosInstance.get("/api/Compliance/KnowYourBusiness");
    return result.data;
  } catch (error) {
    throw error;
  }
};
