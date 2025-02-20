import { configureStore } from "@reduxjs/toolkit";
import bitcoinReducer from "./bitcoinSlice";
import binanceReducer from "./binanceSlice";
import btcPriceReducer from "./btcPriceSlice";
export const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer,
    binance: binanceReducer,
    btcPrice: btcPriceReducer,
     // Add your bitcoin reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
