import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
