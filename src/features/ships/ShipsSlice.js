import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSpaceships = createAsyncThunk(
  "spaceships/fetchSpaceships",
  async () => {
    const response = await fetch(`http://localhost:3000/spaceships`, {
      method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    }).then((res) => res.json());

    return response;
  }
);

export const fetchPropulsion = createAsyncThunk(
  "propulsion/fetchPropulsion",
  async () => {
    const response = await fetch(`http://localhost:3000/engine_parts`, {
      method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    }).then((res) => res.json());

    return response;
  }
);

export const fetchShields = createAsyncThunk(
  "shields/fetchShields",
  async () => {
    const response = await fetch(`http://localhost:3000/hull_parts`, {
      method: "GET",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    }).then((res) => res.json());

    return response;
  }
);

export const newShip = createAsyncThunk("ships/saveShip", async (ship) => {

  const spaceship_name = ship;
  const response = await fetch(`http://localhost:3000/spaceships`, {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      spaceship_name,
    }),
  }).then(() => {
    fetch(`http://localhost:3000/spaceships`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json())
    return response;
  });
});

export const saveSpaceship = createAsyncThunk(
  "ships/saveShip",
  async (selectedShip) => {

    const spaceship_name = selectedShip.spaceship_name;
    const credits = selectedShip.credits;
    const range = selectedShip.range;
    const strength = selectedShip.strength;
    const nuclearCount = selectedShip.nuclearCount;
    const fusionCount = selectedShip.fusionCount;
    const antimatterCount = selectedShip.antimatterCount;
    const carbonCount = selectedShip.carbonCount;
    const grapheneCount = selectedShip.grapheneCount;
    const neutronCount = selectedShip.neutronCount;

    const response = await fetch(
      `http://localhost:3000/spaceships/${selectedShip.id}`,
      {
        method: "PATCH",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          spaceship_name,
          credits,
          range,
          strength,
          nuclearCount,
          fusionCount,
          antimatterCount,
          carbonCount,
          grapheneCount,
          neutronCount,
        }),
      }
    ).then((res) => res.json())
     .then(window.confirm(`${spaceship_name} saved!`))
    return response;
  }
);

export const deleteSpaceship = createAsyncThunk(
  "ships/deleteShip",
  async (selectedShip) => {
    const response = await fetch(
      `http://localhost:3000/spaceships/${selectedShip.id}`,
      {
        method: "DELETE",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json())
      return response;
  }
);

const initialState = {
  spaceships: {},
  chosenShip: {},
  propulsion: {},
  shields: {},
  fetchShipStatus: "idle",
  fetchPropulsionStatus: "idle",
  fetchShieldsStatus: "idle",
};

const spaceshipsSlice = createSlice({
  name: "spaceships",
  initialState,
  reducers: {
    chooseShip: (state, action) => {
      state.chosenShip =
        action.payload},
    buyNuclear: (state) => {
      state.chosenShip.credits -= 40000;
      state.chosenShip.range += 3;
      state.chosenShip.nuclearCount += 1;
    },
    sellNuclear: (state) => {
      state.chosenShip.credits += 40000;
      state.chosenShip.range -= 3;
      state.chosenShip.nuclearCount -= 1;
    },
    buyFusion: (state) => {
      state.chosenShip.credits -= 120000;
      state.chosenShip.range += 7;
      state.chosenShip.fusionCount += 1;
    },
    sellFusion: (state) => {
      state.chosenShip.credits += 120000;
      state.chosenShip.range -= 7;
      state.chosenShip.fusionCount -= 1;
    },
    buyAntimatter: (state) => {
      state.chosenShip.credits -= 200000;
      state.chosenShip.range += 10;
      state.chosenShip.antimatterCount += 1;
    },
    sellAntimatter: (state) => {
      state.chosenShip.credits += 200000;
      state.chosenShip.range -= 10;
      state.chosenShip.antimatterCount -= 1;
    },
    buyCarbon: (state) => {
      state.chosenShip.credits -= 10000;
      state.chosenShip.strength += 5;
      state.chosenShip.carbonCount += 1;
    },
    sellCarbon: (state) => {
      state.chosenShip.credits += 10000;
      state.chosenShip.strength -= 5;
      state.chosenShip.carbonCount -= 1;
    },
    buyGraphene: (state) => {
      state.chosenShip.credits -= 30000;
      state.chosenShip.strength += 15;
      state.chosenShip.grapheneCount += 1;
    },
    sellGraphene: (state) => {
      state.chosenShip.credits += 30000;
      state.chosenShip.strength -= 15;
      state.chosenShip.grapheneCount -= 1;
    },
    buyNeutron: (state) => {
      state.chosenShip.credits -= 75000;
      state.chosenShip.strength += 50;
      state.chosenShip.neutronCount += 1;
    },
    sellNeutron: (state) => {
      state.chosenShip.credits += 75000;
      state.chosenShip.strength -= 50;
      state.chosenShip.neutronCount -= 1;
    },
  },
  extraReducers: {
    [fetchSpaceships.pending](state) {
      state.fetchShipStatus = "loading";
    },
    [fetchSpaceships.fulfilled](state, action) {
      state.spaceships = action.payload;
      state.fetchShipStatus = "idle";
    },
    [fetchSpaceships.rejected](state) {
      state.fetchShipStatus = "most recent spaceships fetch rejected";
    },
    [fetchPropulsion.pending](state) {
      state.fetchPropulsionStatus = "loading";
    },
    [fetchPropulsion.fulfilled](state, action) {
      state.propulsion = action.payload;
      state.fetchPropulsionStatus = "idle";
    },
    [fetchPropulsion.rejected](state) {
      state.fetchPropulsionStatus = "most recent propulsion fetch rejected";
    },
    [fetchShields.pending](state) {
      state.fetchShieldsStatus = "loading";
    },
    [fetchShields.fulfilled](state, action) {
      state.shields = action.payload;
      state.fetchShieldsStatus = "idle";
    },
    [fetchShields.rejected](state) {
      state.fetchShieldsStatus = "most recent shields fetch rejected";
    },
  },
});

export const {
  chooseShip,
  buyNuclear,
  sellNuclear,
  buyFusion,
  sellFusion,
  buyAntimatter,
  sellAntimatter,
  buyCarbon,
  sellCarbon,
  buyGraphene,
  sellGraphene,
  buyNeutron,
  sellNeutron,
} = spaceshipsSlice.actions;

export default spaceshipsSlice.reducer;