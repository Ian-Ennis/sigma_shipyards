import { configureStore } from '@reduxjs/toolkit';
import creditsReducer from "../features/shipstatistics/CreditsSlice"
import rangeReducer from "../features/shipstatistics/RangeSlice"
import strengthReducer from "../features/shipstatistics/StrengthSlice"

export const store = configureStore({
  reducer: {
    credits: creditsReducer,
    range: rangeReducer,
    strength: strengthReducer
  }
});
