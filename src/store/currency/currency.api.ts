import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ID} from "../../config";
import {currencyActions} from './currency.slice'

export interface Rate {
    name: string,
    value: number
}

export const currencyApi = createApi({
    reducerPath: "currency/api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://openexchangerates.org/api/'
    }),
    endpoints: build => ({
        getCurrencies: build.query<any, void>({
            query: () => ({
                url: 'latest.json',
                params: {
                    base: "USD",
                    app_id: APP_ID
                }
            }),
            async onQueryStarted(prop, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    const result = Object.entries(data.rates).map(([name, value]): Rate => {

                        return {
                            name,
                            value: Number((1 / Number(value)).toFixed(4))
                        }
                    }) || []
                    dispatch(currencyActions.setRates(result))
                } catch (err) {
                    console.log(err)
                }
            },
        })
    })
})

export const { useGetCurrenciesQuery} = currencyApi

