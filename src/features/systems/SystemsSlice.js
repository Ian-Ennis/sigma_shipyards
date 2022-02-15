import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// use of async function to allow rest of app to continue
export const fetchSystems = createAsyncThunk("systems/fetchSystems", async () => { /*async functions usually return promises*/
  console.log('in systems fetch')
  
  const response = await fetch(`http://localhost:3000/star_systems`, {
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
  chosenSystem: {},
  status: 'idle'
}

const systemsSlice = createSlice({
  name: "systems", /* <name> is used as a prefix for generated action types */
  initialState,
  reducers: {
    chooseSystem: (state, action) => {
        console.log(action)
        state.chosenSystem = action.payload
    }
  },
  extraReducers: {
    [fetchSystems.pending](state) {
      state.status = "loading";
    },
    [fetchSystems.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
    [fetchSystems.rejected](state) {
      state.status = "most recent fetch rejected";
    }
  },
});

export const { chooseSystem } = systemsSlice.actions

export default systemsSlice.reducer;
