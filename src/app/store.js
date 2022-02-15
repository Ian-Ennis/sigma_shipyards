import { configureStore } from "@reduxjs/toolkit";
import systemsReducer from "../features/systems/SystemsSlice";
import spaceshipsReducer from "../features/ships/ShipsSlice";

export const store = configureStore({
  reducer: {
    systems: systemsReducer,
    spaceships: spaceshipsReducer
  },
});
