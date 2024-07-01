import { IAuth } from "@/@types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuth = {
  email: "",
  accessToken: "",
  refreshToken: "",
  isAuthLoading: true,
  isVerifiedEmail: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = { ...action.payload, isAuthLoading: false };
      localStorage.setItem("stratis-auth", JSON.stringify(action.payload));
      return state;
    },
    setIsVerifiedEmail: (state, action) => {
      state = { ...state, isVerifiedEmail: action.payload };
      localStorage.setItem(
        "stratis-auth",
        JSON.stringify({
          email: state.email,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isVerifiedEmail: action.payload,
        })
      );
      return state;
    },
    logout: (state) => {
      state = { ...initialState, isAuthLoading: false };
      localStorage.removeItem("stratis-auth");
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
