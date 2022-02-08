import { createSlice } from "@reduxjs/toolkit"

const rangeSlice = createSlice({
    name: 'range',
    initialState: {
        distance: 0,
        nuclearCount: 0,
        fusionCount: 0,
        antimatterCount: 0
    },
    reducers: {
        installNuclear: state => {
            state.distance += 3
            state.nuclearCount += 1
        },
        removeNuclear: state => {
            state.distance -= 3
            state.nuclearCount -= 1
        },
        installFusion: state => {
            state.distance += 7
            state.fusionCount += 1
        },
        removeFusion: state => {
            state.distance -= 7
            state.fusionCount -= 1
        },
        installAntimatter: state => {
            state.distance += 10
            state.antimatterCount += 1
        },
        removeAntimatter: state => {
            state.distance -= 10
            state.antimatterCount -= 1
        }
    }
})

export const { installNuclear, removeNuclear, installFusion, removeFusion, installAntimatter, removeAntimatter} = rangeSlice.actions

export default rangeSlice.reducer