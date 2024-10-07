import { configureStore } from "@reduxjs/toolkit";
import allSlice from "./slices/all/all";
import signup from "./slices/signup/signup";

export const store = configureStore({
  reducer: {
    all: allSlice,
    signup: signup,
  },
});

export type StoreT = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
