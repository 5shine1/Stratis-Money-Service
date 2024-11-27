import axiosInstance from "@/config/axios";

export const apiLogin = async (email: string, password: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/Login?useSessionCookies=true", {
      email,
      password,
    });
    return result?.data;
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiRegister = async (
  email: string,
  password: string,
  name: string,
  country: string,
  industry: string,
  activity: string,
  volume: string,
  mobileNumber: string
) => {
  try {
    const result = await axiosInstance.post("/api/Identity/Register", {
      email,
      password,
      name,
      country,
      industry,
      activity,
      volume,
      mobileNumber,
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
    if (result?.data?.isSucceed === true) return true;
    throw "Something went wrong";
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiResendVerificationEmail = async (email: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/ResendConfirmationEmail", {
      email,
    });
    if (result?.data?.isSucceed === true) return true;
    return false;
  } catch (error) {
    throw "Something went wrong.";
  }
};

export const apiConfirmEmail = async (userId: string, code: string) => {
  try {
    const result = await axiosInstance.get(`/api/Identity/ConfirmEmail?userId=${userId}&code=${code}`);
    if (result?.data?.isSucceed === true) return true;
    return false;
  } catch (error) {
    throw error;
  }
};

export const apiForgotPassword = async (email: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/ForgotPassword", { email });
    if (result?.data?.isSucceed === true) return true;
    return false;
  } catch (error) {
    throw error;
  }
};

export const apiResetPassword = async (resetCode: string, newPassword: string, email: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/ResetPassword", { email, resetCode, newPassword });
    if (result?.data?.isSucceed === true) return true;
    return false;
  } catch (error) {
    throw error;
  }
};

export const apiUserInfo = async () => {
  try {
    const result = await axiosInstance.post("/api/Identity/Info");
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetSetting = async () => {
  try {
    const result = await axiosInstance.get("/api/User/Settings");
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const apiSetSetting = async (
  userId: string,
  kycEnabled: boolean,
  bankAccountHolder: string,
  bankIban: string,
  bankBic: string,
  acceptNonStablecoinPayments?: boolean
) => {
  try {
    const result = await axiosInstance.post("/api/User/ChangeSettings", {
      businessSettings: {
        userId,
        kycEnabled,
        bankAccountHolder,
        bankIban,
        bankBic,
        acceptNonStablecoinPayments,
      },
    });
    if (!result.data) throw "Server Error";
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const apiInviteAgent = async (email: string, businessOwnerId: string) => {
  try {
    const result = await axiosInstance.post("/api/Identity/InviteAgent", { email, businessOwnerId });
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.isSucceed;
  } catch (error) {
    throw error;
  }
};

export const apiGetInviteInfo = async (code: string) => {
  try {
    const result = await axiosInstance.get(`/api/Identity/Invitation/${code}`);
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const apiCompleteInvitation = async (
  invitationId: string,
  emailAddress: string,
  name: string,
  country: string,
  mobileNumber: string,
  password: string
) => {
  try {
    const result = await axiosInstance.post("/api/Identity/CompleteInvitation", {
      invitationId,
      emailAddress,
      name,
      country,
      mobileNumber,
      password,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiRemoveAgent = async (agentUserId: string) => {
  try {
    const result = await axiosInstance.post(`/api/Identity/RemoveAgent`, { agentUserId });
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const apiActivateAgent = async (agentUserId: string) => {
  try {
    const result = await axiosInstance.post(`/api/Identity/ActivateAgent`, { agentUserId });
    if (result?.data?.isSucceed === false) throw "Something went wrong";
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};
