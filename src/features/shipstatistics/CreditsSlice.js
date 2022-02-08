import { createSlice } from "@reduxjs/toolkit"

const creditSlice = createSlice({
    name: 'credits',
    initialState: {
        balance: 1000000
    },
    reducers: {
        buyNuclear: state => {
            state.balance -= 150000
        },
        sellNuclear: state => {
            state.balance += 150000
        },
        buyFusion: state => {
            state.balance -= 250000
        },
        sellFusion: state => {
            state.balance += 250000
        },
        buyAntimatter: state => {
            state.balance -= 400000
        },
        sellAntimatter: state => {
            state.balance += 400000
        },
        buyCarbonFiber: state => {
            state.balance -= 20000
        },
        sellCarbonFiber: state => {
            state.balance += 20000
        },
        buyGraphene: state => {
            state.balance -= 90000
        },
        sellGraphene: state => {
            state.balance += 90000
        },
        buyNeutrino: state => {
            state.balance -= 300000
        },
        sellNeutrino: state => {
            state.balance += 300000
        }
    }
})

export const { buyNuclear, sellNuclear, buyFusion, sellFusion, buyAntimatter, sellAntimatter, buyCarbonFiber, sellCarbonFiber, buyGraphene, sellGraphene, buyNeutrino, sellNeutrino} = slice.actions

export default creditSlice.reducer