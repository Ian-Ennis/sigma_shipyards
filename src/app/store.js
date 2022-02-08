import { configureStore } from '@reduxjs/toolkit';
import creditsReducer from "../features/shipstatistics/CreditsSlice"
import rangeReducer from "../features/shipstatistics/RangeSlice"

export const store = configureStore({
  reducer: {
    credits: creditsReducer,
    range: rangeReducer,
    strength: strengthReducer
  }
});
