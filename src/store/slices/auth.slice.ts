import { IAuth } from "@/@types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuth = {
  email: "",
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = { ...action.payload };
      localStorage.setItem("stratis-auth", JSON.stringify(action.payload));
      return state;
    },

    logout: (state) => {
      state = initialState;
      localStorage.removeItem("stratis-auth");
      return state;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
