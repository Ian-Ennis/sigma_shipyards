import { configureStore } from '@reduxjs/toolkit';
import creditsReducer from "../features/shipstatistics/creditsSlice"
import rangeReducer from "../features/shipstatistics/rangeSlice"
import strengthReducer from "../features/shipstatistics/strengthSlice"

export const store = configureStore({
  reducer: {
    credits: creditsReducer,
    range: rangeReducer,
    strength: strengthReducer
  }
});
