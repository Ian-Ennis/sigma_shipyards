import { createSlice } from "@reduxjs/toolkit"

const rangeSlice = createSlice({
    name: 'range',
    initialState: {
        distance: 0
    },
    reducers: {
        getNuclear: state => {
            state.distance += 3
        },
        ridNuclear: state => {
            state.distance -= 3
        },
        getFusion: state => {
            state.distance += 7
        },
        ridFusion: state => {
            state.distance -= 7
        },
        getAntimatter: state => {
            state.distance += 10
        },
        ridAntimatter: state => {
            state.distance -= 10
        }
    }
})

export const { getNuclear, ridNuclear, getFusion, ridFusion, getAntimatter, ridAntimatter} = slice.actions

export default rangeSlice.reducer