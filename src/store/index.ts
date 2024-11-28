import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import paymentReducer from "./slices/payment.slice";
import settingReducer from "./slices/setting.slice";
import localeReducer from "./slices/locale.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
    setting: settingReducer,
    locale: localeReducer,
  },
});
