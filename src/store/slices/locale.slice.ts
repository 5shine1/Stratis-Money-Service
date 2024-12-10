import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: localStorage.getItem("stratis-locale") || "EN",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      localStorage.setItem("stratis-locale", state.locale);
      return state;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
