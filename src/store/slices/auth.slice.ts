import { IAuth, ROLES } from "@/@types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuth = {
  userId: "",
  email: "",
  name: "",
  accessToken: "",
  refreshToken: "",
  isAuthLoading: true,
  isVerifiedEmail: false,
  role: ROLES.GUEST,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = { ...action.payload, isAuthLoading: false };
      localStorage.setItem("stratis-auth-token", state.accessToken);
      return state;
    },
    setIsVerifiedEmail: (state, action) => {
      state = { ...state, isVerifiedEmail: action.payload };
      return state;
    },
    logout: (state) => {
      state = { ...initialState, isAuthLoading: false };
      localStorage.removeItem("stratis-auth-token");
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
