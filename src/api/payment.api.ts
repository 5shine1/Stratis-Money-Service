import axiosInstance from "@/config/axios";

export const apiGetCurrencies = async (isFiat = true) => {
  try {
    const result = await axiosInstance.get(`/api/Payment/Currencies?fiat=${isFiat}`);
    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const apiGenerate = async (
  amount: number,
  currencySymbol: string,
  description: string,
  payer: string,
  customerName: string,
  customerAddress: string,
  customerDateOfBirth: string,
  customerPlaceOfBirth: string,
  paymentLinkCulture:string
) => {
  try {
    const result = await axiosInstance.post("/api/Payment/Generate", {
      amount,
      currencySymbol,
      description,
      payer,
      customerName,
      customerAddress,
      customerDateOfBirth,
      customerPlaceOfBirth,
      paymentLinkCulture,
    });
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

export const apiMakePayment = async (paymentId: string, paymentCurrencySymbol: string, paymentChainId: number) => {
  try {
    const result = await axiosInstance.post(`api/Payment/MakePayment`, {
      paymentId,
      paymentCurrencySymbol,
      paymentChainId,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiPaymentStatus = async (paymentId: string) => {
  try {
    const result = await axiosInstance.get(`api/Payment/Status?paymentId=${paymentId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiWithdrawHistory = async () => {
  try {
    const result = await axiosInstance.get(`api/Payment/WithdrawalHistory`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const apiRequestWithdraw = async (currency: string, amount: number) => {
  try {
    const result = await axiosInstance.post(`api/Payment/Withdrawal`, { currency, amount });
    if (!result.data.isSucceed) throw "Something went wrong";
  } catch (error) {
    throw error;
  }
};
export const apiCancelPayment = async (id: string) => {
  try {
    const result = await axiosInstance.get(`api/Payment/Cancel?paymentId=${id}`);
    if (!result.data) throw "Error";
    return result.data;
  } catch (error) {
    throw error;
  }
};
