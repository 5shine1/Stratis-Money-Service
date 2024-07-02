import { ICurrency } from "@/@types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencies: [] as ICurrency[],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currencies = action.payload;
      return state;
    },
  },
});

export const { setCurrency } = paymentSlice.actions;

export default paymentSlice.reducer;
