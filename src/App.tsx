import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Converter from "./pages/converter/Converter";
import Currencies from "./pages/currencies/Currencies";
import {useGetCurrenciesQuery} from "./store/currency/currency.api";

function App() {

    useGetCurrenciesQuery()

    return (
        <div className="App">
            <div>
                <Link to={"/"}>Конвертер</Link>
                <Link to={"/currencies"}>Курсы валют</Link>
            </div>
            <Routes>
                <Route path={"/"} element={<Converter></Converter>}></Route>
                <Route path={"/currencies"} element={<Currencies></Currencies>}></Route>
            </Routes>
        </div>
    );
}

export default App;
