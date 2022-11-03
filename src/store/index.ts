import {configureStore} from "@reduxjs/toolkit";
import {currencyReducer} from "./currency/currency.slice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {currencyApi} from "./currency/currency.api";

export const store = configureStore({
    reducer: {
        [currencyApi.reducerPath]: currencyApi.reducer,
        currency: currencyReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(currencyApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>