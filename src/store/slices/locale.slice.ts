import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "EN",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      return state;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
