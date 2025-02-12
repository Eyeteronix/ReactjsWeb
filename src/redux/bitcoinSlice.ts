import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface BitcoinState {
  price: number | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BitcoinState = {
  price: null,
  loading: false,
  error: null,
};

// Async thunk to fetch Bitcoin price
export const fetchBitcoinPrice = createAsyncThunk(
  "bitcoin/fetchPrice",
  async () => {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );
    return parseFloat(response.data.price);
  }
);

const bitcoinSlice = createSlice({
  name: "bitcoin",
  initialState,
  reducers: {}, // No synchronous reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchBitcoinPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBitcoinPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.price = action.payload; // Update the price
      })
      .addCase(fetchBitcoinPrice.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch price";
      });
  },
});

export default bitcoinSlice.reducer;
