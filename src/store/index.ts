import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import paymentReducer from "./slices/payment.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
  },
});
