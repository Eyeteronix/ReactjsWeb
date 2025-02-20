import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetches BTC price for the last 24 hours (1-hour intervals)
export const fetchBtcPrice = createAsyncThunk("btcPrice/fetchPrice", async () => {
  const response = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=25");
  const data = await response.json();

  // Extract timestamp and closing price
  const prices = data.map((item: any) => ({
    date: new Date(item[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }), // Hourly time
    price: parseFloat(item[4]), // Closing price
  }));

  return prices;
});

const btcPriceSlice = createSlice({
  name: "btcPrice",
  initialState: {
    prices: [] as { date: string; price: number }[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBtcPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBtcPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload.slice(-24); // Keep only the last 24 hours
      })
      .addCase(fetchBtcPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch price";
      });
  },
});

export default btcPriceSlice.reducer;
