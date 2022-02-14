import { configureStore } from "@reduxjs/toolkit";
import systemsReducer from "../features/systems/SystemsSlice";
import spaceshipsReducer from "../features/ships/ShipsSlice";
import shipyardReducer from "../features/shipstatistics/PartsSlice";

export const store = configureStore({
  reducer: {
    systems: systemsReducer,
    spaceships: spaceshipsReducer,
    parts: shipyardReducer,
  },
});
