import { createSlice } from "@reduxjs/toolkit"

const strengthSlice = createSlice({
    name: 'strength',
    initialState: {
        hull: 0
    },
    reducers: {
        getCarbon: state => {
            state.hull += 5
        },
        ridCarbon: state => {
            state.hull -= 5
        },
        getGraphene: state => {
            state.hull += 15
        },
        ridGraphene: state => {
            state.hull -= 15
        },
        getNeutrino: state => {
            state.hull += 50
        },
        ridNeutrino: state => {
            state.hull -= 50
        }
    }
})

export const { getCarbon, ridCarbon, getGraphene, ridGraphene, getNeutrino, ridNeutrino} = slice.actions

export default strengthSlice.reducer