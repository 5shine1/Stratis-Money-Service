import { IAuth, ROLES } from "@/@types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuth = {
  userId: "",
  email: "",
  name: "",
  isAuthLoading: true,
  isVerifiedEmail: false,
  isKnowYourBusinessCompleted: false,
  isKnowYourBusinessPassed: false,
  role: ROLES.GUEST,
  country: "",
  mobileNumber: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = { ...action.payload, isAuthLoading: false };
      return state;
    },
    setIsVerifiedEmail: (state, action) => {
      state = { ...state, isVerifiedEmail: action.payload };
      return state;
    },
    logout: (state) => {
      state = { ...initialState, isAuthLoading: false };
      localStorage.removeItem("stratis-auth-token");
      localStorage.removeItem("stratis-auth-refresh");
      return state;
    },
    setAuthLoading: (state) => {
      state = { ...state, isAuthLoading: false };
      return state;
    },
  },
});

export const { setAuth, logout, setAuthLoading, setIsVerifiedEmail } = authSlice.actions;

export default authSlice.reducer;
