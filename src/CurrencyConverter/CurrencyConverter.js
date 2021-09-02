import './CurrencyConverter.css';
import React, { useState, useEffect } from 'react';



function CurrencyConverter(){

    const currencySourceUrl = 'https://www.cbr-xml-daily.ru/daily_json.js'

    const [isLoaded, setIsLoaded] = useState(false);
    const [currency, setCurrency] = useState([]);
    const [rateObject, setRateObject] = useState({  
                                                    "aRateValue": 0, 
                                                    "aValue": 0, 
                                                    "bRateValue": 0, 
                                                    "bValue": 0
                                                }
                                                );

    console.log(rateObject);
    
    useEffect(() => {

        fetch(currencySourceUrl).then((response) => {
            return response.json()
            }).then(result  => {
    
            let currencyValute = [  
                     {
                        "ID": "",
                        "NumCode": "",
                        "CharCode": "RUB",
                        "Nominal": 1,
                        "Name": "Российский рубль",
                        "Value": 1,
                        "Previous": 1
                    }]   

            for (const [key, value] of Object.entries(result.Valute)) {
                currencyValute.push(value);
            }
                setIsLoaded(true);
                setCurrency(currencyValute);
            })

    }, [])

    const valuteNameOptionItem = currency.map( (item, key) => 
            <option key={key} value={item.Value} title={item.Name}>{item.CharCode}</option>
        
    );

    function handleChange(event) {
        
        console.log(event.target.name);
      }
    
    return (
        <div className="container">
            <h3>Конвертер валют</h3>
            <form>
                <div className="currency">
                    <select name="currencyA" onChange={handleChange}>
                        {valuteNameOptionItem}
                    </select>
                    <p>в</p>
                    <select name="currency2" onChange={handleChange}>
                        {valuteNameOptionItem}
                    </select>
                </div>

                <div className="currency">
                    <input value={rateObject.aValue} name="currencyValueA" type="number" onChange={handleChange}/>
                    <p>=</p>
                    <input value={rateObject.bValue} name="currencyValueB" type="number" onChange={handleChange}/>
                </div>

                <h5>Поменять местами</h5>
            </form>
        </div>           
    )
};

export default CurrencyConverter