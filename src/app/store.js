import { configureStore } from "@reduxjs/toolkit";
import missionReducer from "../features/systems/MissionSlice";
import spaceshipsReducer from "../features/ships/ShipsSlice";

export const store = configureStore({
  reducer: {
    systems: missionReducer,
    spaceships: spaceshipsReducer
  },
});
