import axiosInstance from "@/config/axios";

export const apiLogin = async (email: string, password: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/Login", {
      email,
      password,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const apiRegister = async (email: string, password: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/Register");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
