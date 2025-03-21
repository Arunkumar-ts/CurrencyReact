import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export const App = () => {
    const [amount , setAmount] = useState(1);
    const [fromCurrency ,setFromCurrency] = useState("USD");
    const [toCurrency , setToCurrency] = useState("INR");
    const [convertedAmount ,setConvertedAmount] = useState(null);
    const [exchangeValue ,setExchangeValue] = useState(null);

    useEffect(()=>{
        const getExchangeRate= async ()=>{
            try{
                let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const res = await axios.get(url);
                setExchangeValue(res.data.rates[toCurrency]);
            }catch(e){
                console.log("Error occured when fetching ",e);
            }
        };
        getExchangeRate();
    },[fromCurrency,toCurrency]);

    useEffect(()=>{
        if(exchangeValue !== null){
            setConvertedAmount((amount*exchangeValue).toFixed(2));
        }
    },[amount,exchangeValue]);

  return (
    <>
        <div className="currrency-converter">
            <div className="box"></div>
            <div className="data">
                <h1>Currency converter</h1>
                <label htmlFor="amount">Amount:</label>
                <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                <div className="fromCountry">
                    <label htmlFor="fromCurruncy">From Currency:</label>
                    <select value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
                        <Options />
                    </select>
                </div>
                <div className="toCountry">
                    <label htmlFor="toCurruncy">From Currency:</label>
                    <select value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                        <Options />
                    </select>
                </div>
                <div className="result">
                    <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
                </div>
            </div>
        </div>
    </>
  )
}

function Options(){
    return(
        <>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
        </>
    );
}