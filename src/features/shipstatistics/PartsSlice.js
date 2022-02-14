import { createSlice } from '@reduxjs/toolkit'

const partsSlice = createSlice({
    name: 'parts',
    initialState: {
        balance: 1000000,
        distance: 0,
        nuclearCount: 0,
        fusionCount: 0,
        antimatterCount: 0,
        hull: 0,
        carbonCount: 0,
        grapheneCount: 0,
        neutrinoCount: 0
    },
    reducers: {
        // these are individual functions (action creators) that make up the reducer object, and are invoked after passing as an argument into the useDispatch() function
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
        buyCarbon: state => {
            state.balance -= 20000
        },
        sellCarbon: state => {
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
        },
        resetCredits: state => {
            state.balance = 1000000
        },
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
        },
        resetRange: state => {
            state.distance = 0
            state.nuclearCount = 0
            state.fusionCount = 0
            state.antimatterCount = 0
        },
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
        },
        resetStrength: state => {
            state.hull = 0
            state.carbonCount = 0
            state.grapheneCount = 0
            state.neutrinoCount = 0
        }   
    }
})

export const { buyNuclear, sellNuclear, buyFusion, sellFusion, buyAntimatter, sellAntimatter, buyCarbon, sellCarbon, buyGraphene, sellGraphene, buyNeutrino, sellNeutrino, resetCredits, installNuclear, removeNuclear, installFusion, removeFusion, installAntimatter, removeAntimatter, resetRange, installCarbon, removeCarbon, installGraphene, removeGraphene, installNeutrino, removeNeutrino, resetStrength} = partsSlice.actions

export default partsSlice.reducer