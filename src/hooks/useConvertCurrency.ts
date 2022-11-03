import {CurrencyType} from "../types";
import {useAppSelector} from "./redux";

interface ConverterAttrs {
    value?: number,
    from: string,
    to: CurrencyType
}

export const useConvertCurrency = () => {

    const {ratesToUSD} = useAppSelector(state => state.currency)

    const convert = ({value = 1, from, to}: ConverterAttrs) => {
    const rateFrom = ratesToUSD.find(item => item.name === from)
        const rateTo = ratesToUSD.find(item => item.name === to)
        return (!!rateFrom && !!rateTo) &&  Number((rateFrom.value / rateTo.value * value).toFixed(4))

    }

    return [convert]
}