import { configureStore } from "@reduxjs/toolkit";
import bitcoinReducer from "./bitcoinSlice";

export const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer, // Add your bitcoin reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
