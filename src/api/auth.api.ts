import axiosInstance from "@/config/axios";

export const apiLogin = async (email: string, password: string) => {
  try {
    const result = await axiosInstance.post(
      "/api/Identity/Login?useSessionCookies=true",
      {
        email,
        password,
      }
    );
    return result?.data;
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiRegister = async (email: string, password: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/Register", {
      email,
      password,
    });

    if (result?.data?.isSucceed) {
      return true;
    }
    return result?.data?.messages;
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiLoginRefresh = async () => {
  try {
    const result = await axiosInstance.post("/api/Identity/Refresh");
    return result?.data;
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiLogout = async () => {
  try {
    const result = await axiosInstance.post("/api/Identity/Logout");
    console.log(result);
    if (result?.data?.isSucceed === true) return true;
    throw "Something went wrong";
  } catch (error) {
    throw "Something went wrong.";
  }
};
