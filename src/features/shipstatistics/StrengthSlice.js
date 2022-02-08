import { createSlice } from "@reduxjs/toolkit"

const strengthSlice = createSlice({
    name: 'strength',
    initialState: {
        hull: 0,
        carbonCount: 0,
        grapheneCount: 0,
        neutrinoCount: 0
    },
    reducers: {
        installCarbon: state => {
            state.hull += 5
            state.carbonCount += 1
        },
        removeCarbon: state => {
            state.hull -= 5
            state.carbonCount -= 1
        },
        installGraphene: state => {
            state.hull += 15
            state.grapheneCount += 1
        },
        removeGraphene: state => {
            state.hull -= 15
            state.grapheneCount -= 1
        },
        installNeutrino: state => {
            state.hull += 50
            state.neutrinoCount += 1
        },
        removeNeutrino: state => {
            state.hull -= 50
            state.neutrinoCount -= 1
        }
    }
})

export const { installCarbon, removeCarbon, installGraphene, removeGraphene, installNeutrino, removeNeutrino} = strengthSlice.actions

export default strengthSlice.reducer