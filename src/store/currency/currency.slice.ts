import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Rate} from "./currency.api";



interface State {
    ratesToUSD: Rate[]
}

const initialState: State = {
    ratesToUSD: []
}

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setRates(state, { payload } : PayloadAction<Rate[]>) {
            state.ratesToUSD = payload
        }
    }
})

export const currencyReducer = currencySlice.reducer
export const currencyActions = currencySlice.actions