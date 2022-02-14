import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSpaceships = createAsyncThunk("spaceships/fetchSpaceships", async () => {
  console.log('in new fetch')
  
  const response = await fetch(`http://localhost:3000/spaceships`, {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
  .then((res) => res.json())

  return response
})

const initialState = {
  entities: {},
  status: 'idle'
}

const spaceshipsSlice = createSlice({
  name: "spaceships",
  initialState,
  // reducers obect with more functions (action creators are automatically generated and correspond to each, with the use of createSlice() (RTK))
  reducers: {
    addSpaceship(state, action) {
      // mutated state, permitted with RTK (rather than using the spread operator)
      const spaceship = action.payload
      state.entities[spaceship.id] = spaceship
    },
    deleteSpaceship(state, action) {
      delete state.entities[action.payload]
    }

  },
  extraReducers: {
    [fetchSpaceships.pending](state) {
      state.status = "loading";
    },
    [fetchSpaceships.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [fetchSpaceships.rejected](state) {
      state.status = "most recent fetch rejected";
    }
  },
});

// here we export each action creator to make it accessible to useDispatch() in ANY component
export const { addSpaceship, deleteSpaceship } = spaceshipsSlice.actions;

// here we export the entire reducer function
export default spaceshipsSlice.reducer;

// differences between regular redux, and RTK: 
// Instead of writing case/switch statements, createSlice() handles that for us. When we invoke useDispatch(), the reducer function checks to see if any of it's action creators correspond to the name being called. The action.type from regular redux corresponds to the name of the action creator itself. Example: useDispatch(spaceshipAdded()). 





















//   console.log('dispatched to fetch spaceships slice')
//   return function (dispatch) {
//     dispatch({ type: "spaceships/spaceshipsLoading" });
//     fetch(`http://localhost:3000/spaceships`, {
//       method: "GET",
//       headers: {
//         Accepts: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((spaceships) =>{
//         dispatch({
//           type: "spaceships/spaceshipsLoaded",
//           payload: spaceships,
//         })
//       });
//   };
// }

// const initialState = {
//   entities: [], //array of spaceships
//   status: "idle", //loading status for fetch
// };

// export default function fetchShipsReducer(state = initialState, action) {
//   switch (action.type) {
//     case "spaceships/spaceshipsLoaded":
//       return {
//         ...state,
//         status: "idle",
//         entities: action.payload,
//       };
//     case "spaceships/spaceshipsLoading":
//       return {
//         ...state,
//         status: "loading",
//       };
//     default:
//       return state;
//   }
// }



// export function fetchSpaceships() {

//   console.log('dispatched to fetch spaceships slice')
//   return function (dispatch) {
//     dispatch({ type: "spaceships/spaceshipsLoading" });
//     fetch(`http://localhost:3000/spaceships`, {
//       method: "GET",
//       headers: {
//         Accepts: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((spaceships) =>{
//         dispatch({
//           type: "spaceships/spaceshipsLoaded",
//           payload: spaceships,
//         })
//       });
//   };
// }

// const initialState = {
//   entities: [], //array of spaceships
//   status: "idle", //loading status for fetch
// };

// export default function fetchShipsReducer(state = initialState, action) {
//   switch (action.type) {
//     case "spaceships/spaceshipsLoaded":
//       return {
//         ...state,
//         status: "idle",
//         entities: action.payload,
//       };
//     case "spaceships/spaceshipsLoading":
//       return {
//         ...state,
//         status: "loading",
//       };
//     default:
//       return state;
//   }
// }
