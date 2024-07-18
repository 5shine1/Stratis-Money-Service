import axiosInstance from "@/config/axios";

export const apiStartKYB = async () => {
  try {
    const result = await axiosInstance.post("/api/Compliance/KnowYourBusiness", {});
    console.log(result);
    return result?.data;
  } catch (error) {
    throw error;
  }
};
