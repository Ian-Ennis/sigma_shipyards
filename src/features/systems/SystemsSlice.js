import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSystems = createAsyncThunk("systems/fetchSystems", async () => {
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
  .then(data => console.log(data))

  return response
})

const initialState = {
  entities: {},
  status: 'idle'
}

const systemsSlice = createSlice({
  name: "systems",
  initialState,
  reducers: {},
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

export default systemsSlice.reducer;
