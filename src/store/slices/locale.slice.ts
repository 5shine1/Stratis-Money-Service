import { LOCALES } from "@/config/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "EN",
};

if (typeof window !== "undefined") {
  try {
    const storageData = localStorage.getItem("stratis-locale");
    if (storageData) initialState.locale = storageData;
    else {
      const locationData = navigator.language?.slice(0, 2)?.toUpperCase() || "EN";
      const localItem = LOCALES.find((item) => item.code === locationData);
      if (localItem) initialState.locale = locationData;
    }
  } catch (error) {}
}

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("stratis-locale", state.locale);
      }
      return state;
    },
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
