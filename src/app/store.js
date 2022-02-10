import { configureStore } from "@reduxjs/toolkit";
import fetchShipsReducer from "../features/ships/ShipsOverviewSlice";
import shipyardReducer from "../features/shipstatistics/ShipyardSlice";

export const store = configureStore({
  reducer: fetchShipsReducer,
  reducer: {
    actions: shipyardReducer,
  },
});
