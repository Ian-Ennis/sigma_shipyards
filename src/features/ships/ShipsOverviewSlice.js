import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export function fetchSpaceships() {
  console.log('dispatched to fetch spaceships slice')
  return function (dispatch) {
    dispatch({ type: "spaceships/spaceshipsLoading" });
    fetch(`http://localhost:3000/spaceships`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((spaceships) =>
        dispatch({
          type: "spaceships/spaceshipsLoaded",
          payload: spaceships,
        })
      );
  };
}

const initialState = {
  entities: [], //array of spaceships
  status: "idle", //loading status for fetch
};

export default function fetchShipsReducer(state = initialState, action) {
  switch (action.type) {
    case "spaceships/spaceshipsLoaded":
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    case "spaceships/spaceshipsLoading":
      return {
        ...state,
        status: "loading",
      };
    default:
      return state;
  }
}
