import './CurrencyConverter.css';
import React, { useState, useEffect } from 'react';



function CurrencyConverter(){

    const currencySourceUrl = 'https://www.cbr-xml-daily.ru/daily_json.js'

    // let currencyValute = [        
    //     {
    //     "ID": "",
    //     "NumCode": "",
    //     "CharCode": "RUB",
    //     "Nominal": 1,
    //     "Name": "Российский рубль",
    //     "Value": 1,
    //     "Previous": 1
    //     }
    // ]

    const [isLoaded, setIsLoaded] = useState(false);
    const [currency, setCurrency] = useState([]);
    
    useEffect(() => {

        fetch(currencySourceUrl).then((response) => {
            return response.json()
            }).then(result  => {
    
            let currencyValute = []   

            for (const [key, value] of Object.entries(result.Valute)) {
                currencyValute.push(value);
            }
                setIsLoaded(true);
                setCurrency(currencyValute);
            })

    }, [])

    const valuteNameOptionItem = currency.map( (item, key) => 
            <option key={key} value={item.Value}>{item.CharCode}</option>
        
    );
    
    return (
        <div className="container">
            <h3>Конвертер валют</h3>
            <div className="currency">
                <select>
                    {valuteNameOptionItem}
                </select>
                <p>в</p>
                <select>
                    {valuteNameOptionItem}
                </select>
            </div>

            <div className="currency">
                <input type="number" name="name" />
                <p>=</p>
                <input type="number" name="name" />
            </div>

            <h5>Поменять местами</h5>

        </div>           
    )
};

export default CurrencyConverter