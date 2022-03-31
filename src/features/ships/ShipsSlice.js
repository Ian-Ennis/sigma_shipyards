import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSpaceships = createAsyncThunk(
  "spaceships/fetchSpaceships",
  async () => {
    const response = await fetch(`http://localhost:3000/spaceships`, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => res.json());

    return response;
  }
);

export const newShip = createAsyncThunk("ships/saveShip", async (ship) => {

  const spaceship_name = ship;
  const response = await fetch(`http://localhost:3000/spaceships/`, {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => res.json());
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
    const neutrinoCount = selectedShip.neutrinoCount;

    const response = await fetch(
      `http://localhost:3000/spaceships/${selectedShip.id}`,
      {
        method: "PATCH",
        headers: {
          Accepts: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
          neutrinoCount,
        }),
      }
    ).then((res) => res.json())
     .then(data => {
      window.confirm(`${spaceship_name} saved!`)
    })
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
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
  name: "spaceships" /* <name> is used as a prefix for generated action types */,
  initialState,
  reducers: {
    chooseShip: (state, action) => {
      console.log(
        action
      ); /*  <-- Reducer obect with functions. createSlice() (Redux Toolkit) allows        */
      state.chosenShip =
        action.payload; /*  us to write logic to change state within these functions, rather than using   */
    } /*  a switch/case statement. Action creators are automatically generated and correspond to each. */,
    buyNuclear: (state) => {
      /* // code can be written in a way that seems to mutate state directly (Immer,    */
      state.chosenShip.credits -= 150000;/* comes with createSlice(). Spread operators no longer neccessary)                    */
    },
    sellNuclear: (state) => {
      state.chosenShip.credits += 150000;
    },
    buyFusion: (state) => {
      state.chosenShip.credits -= 250000;
    },
    sellFusion: (state) => {
      state.chosenShip.credits += 250000;
    },
    buyAntimatter: (state) => {
      state.chosenShip.credits -= 400000;
    },
    sellAntimatter: (state) => {
      state.chosenShip.credits += 400000;
    },
    buyCarbon: (state) => {
      state.chosenShip.credits -= 20000;
    },
    sellCarbon: (state) => {
      state.chosenShip.credits += 20000;
    },
    buyGraphene: (state) => {
      state.chosenShip.credits -= 90000;
    },
    sellGraphene: (state) => {
      state.chosenShip.credits += 90000;
    },
    buyNeutrino: (state) => {
      state.chosenShip.credits -= 300000;
    },
    sellNeutrino: (state) => {
      state.chosenShip.credits += 300000;
    },
    installNuclear: (state) => {
      state.chosenShip.range += 3;
      state.chosenShip.nuclearCount += 1;
    },
    removeNuclear: (state) => {
      state.chosenShip.range -= 3;
      state.chosenShip.nuclearCount -= 1;
    },
    installFusion: (state) => {
      state.chosenShip.range += 7;
      state.chosenShip.fusionCount += 1;
    },
    removeFusion: (state) => {
      state.chosenShip.range -= 7;
      state.chosenShip.fusionCount -= 1;
    },
    installAntimatter: (state) => {
      state.chosenShip.range += 10;
      state.chosenShip.antimatterCount += 1;
    },
    removeAntimatter: (state) => {
      state.chosenShip.range -= 10;
      state.chosenShip.antimatterCount -= 1;
    },
    installCarbon: (state) => {
      state.chosenShip.strength += 5;
      state.chosenShip.carbonCount += 1;
    },
    removeCarbon: (state) => {
      state.chosenShip.strength -= 5;
      state.chosenShip.carbonCount -= 1;
    },
    installGraphene: (state) => {
      state.chosenShip.strength += 15;
      state.chosenShip.grapheneCount += 1;
    },
    removeGraphene: (state) => {
      state.chosenShip.strength -= 15;
      state.chosenShip.grapheneCount -= 1;
    },
    installNeutrino: (state) => {
      state.chosenShip.strength += 50;
      state.chosenShip.neutrinoCount += 1;
    },
    removeNeutrino: (state) => {
      state.chosenShip.strength -= 50;
      state.chosenShip.neutrinoCount -= 1;
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

// here we export each action creator to make it accessible to useDispatch() in ANY component
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
  buyNeutrino,
  sellNeutrino,
  installNuclear,
  removeNuclear,
  installFusion,
  removeFusion,
  installAntimatter,
  removeAntimatter,
  installCarbon,
  removeCarbon,
  installGraphene,
  removeGraphene,
  installNeutrino,
  removeNeutrino,
} = spaceshipsSlice.actions;

// here we export the entire reducer function
export default spaceshipsSlice.reducer;

// differences between regular redux, and RTK:
// Instead of writing case/switch statements, createSlice() handles that for us. When we invoke useDispatch(), the reducer function checks to see if any of it's action creators correspond to the name being called. The action.type from regular redux corresponds to the name of the action creator itself. Example: useDispatch(spaceshipAdded()).
