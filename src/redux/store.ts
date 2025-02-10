import { configureStore, createSlice } from "@reduxjs/toolkit";

// Counter slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// Extract actions and reducer
export const { increment, decrement } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

// Create store
export const store = configureStore({
  reducer: {
    counter: counterReducer, // Ensure the reducer is inside an object
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
