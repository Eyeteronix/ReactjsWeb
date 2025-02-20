import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBinancePrice = createAsyncThunk("binance/fetchPrice", async () => {
  const response = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=12");
  const data = await response.json();

  // Extract timestamp and closing price
  const prices = data.map((item: any) => ({
    date: new Date(item[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }), // Convert to readable time
    price: parseFloat(item[4]), // Closing price
  }));

  return prices;
});

const binanceSlice = createSlice({
  name: "binance",
  initialState: {
    prices: [] as { date: string; price: number }[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBinancePrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBinancePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(fetchBinancePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch price";
      });
  },
});

export default binanceSlice.reducer;
