import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bankAccountHolder: "",
  bankIban: "",
  bankBic: "",
  kycEnabled: true,
  acceptNonStablecoinPayments: true,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setSettings } = settingSlice.actions;

export default settingSlice.reducer;
