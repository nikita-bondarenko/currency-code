import React, {useEffect, useState} from 'react';
import { CurrencyType} from "../../types";
import {useAppSelector} from "../../hooks/redux";
import {Rate} from "../../store/currency/currency.api";
import {useConvertCurrency} from "../../hooks/useConvertCurrency";
import {CurrenciesVariables} from "../../types/currencies";

const possibleBaseCurrencies = ["USD", "RUB", "EUR", "KZT"]


const Currencies = () => {

    const [baseCurrency, setBaseCurrency] = useState() as [CurrencyType, Function]
    const {ratesToUSD} = useAppSelector(state => state.currency)

    const [rates, setRates] = useState([]) as [Rate[], Function]

    const [convert] = useConvertCurrency()

    useEffect(() => {
        window.navigator.language && window.navigator.language === "ru" ? setBaseCurrency(CurrenciesVariables.RUB) : setBaseCurrency(CurrenciesVariables.USD)
    }, [])

    useEffect(() => {
        if (baseCurrency === CurrenciesVariables.USD) {
            setRates(ratesToUSD)
        } else {
            const rates = ratesToUSD.map(({name,value}) =>({name, value: convert({from: name, to: baseCurrency}) }) )
            setRates(rates)
        }
    }, [baseCurrency, ratesToUSD])


    return (
        <main>
            <form>
                <span>Базовая валюта     <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} name="" id="">
                {possibleBaseCurrencies.map(currency =>
                    <option key={currency} value={currency}>{currency}</option>
                )}
            </select></span>
            </form>

            <ul>
                {rates.map(rate =>
                <li key={rate.name}> <strong> 1 {rate.name}</strong> = {rate.value} {baseCurrency}</li>
                )}
            </ul>
        </main>
    );
};

export default Currencies;