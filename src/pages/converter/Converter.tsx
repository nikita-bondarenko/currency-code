import React, { useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {useConvertCurrency} from "../../hooks/useConvertCurrency";
import {CurrenciesVariables} from "../../types/currencies";

const Converter = () => {

    const [text, setText] = useState('')
    const { ratesToUSD } = useAppSelector(state => state.currency)
    const [result, setResult] = useState(0)
    const [convert] = useConvertCurrency()

    const getResult = () => {
        const [value, currencyFrom, pronounce, currencyTo] = text.trim().split(' ').filter(item => !!item.length)
        const rateFrom = ratesToUSD.find(item => item.name === currencyFrom.toUpperCase())
        const rateTo = ratesToUSD.find(item => item.name === currencyTo.toUpperCase())

        if (!!Number(value) && rateFrom && rateTo && pronounce === 'in') {
            const result = convert({value: Number(value), from: rateFrom.name, to: rateTo.name})
            result &&  setResult(result)
        } else {
            setResult(0)
        }

    }

    return (
        <main>
            <form onSubmit={(e) => (e.preventDefault(), getResult())} action="">
                <input value={text} onChange={(e) => setText(e.target.value)} type="text"/>

                <button type="submit" > Конвертировать</button>
            </form>
            <div>
                {!!result && <h2>Результат: {result}</h2>}
            </div>

            <div>
                <h3>Пример запроса: 15 usd in rub</h3>
            </div>
            <div>
                <h3>Поддерживаемые валюты:</h3>
                <ul>
                    {Object.values(CurrenciesVariables).map(item => <li key={item} >{item}</li>) }
                </ul>
            </div>
        </main>
    );
};

export default Converter;