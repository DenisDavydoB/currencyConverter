import "./CurrencyConverter.css";
import React, { useState, useEffect } from "react";

function CurrencyConverter() {
  const currencySourceUrl = "https://www.cbr-xml-daily.ru/daily_json.js";

  const [isLoaded, setIsLoaded] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [currentRateAndState, setCurrentRateAndState] = useState({
    fromRateValue: 1,
    fromValue: 0,
    toRateValue: 1,
    toValue: 0,
  });

  useEffect(() => {
    fetch(currencySourceUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let currencyValute = [
          {
            ID: "",
            NumCode: "",
            CharCode: "RUB",
            Nominal: 1,
            Name: "Российский рубль",
            Value: 1,
            Previous: 1,
          },
        ];

        for (const [key, value] of Object.entries(result.Valute)) {
          currencyValute.push(value);
        }
        setIsLoaded(true);
        setCurrency(currencyValute);
      });
  }, []);

  function toCurrancyValueCalc(valueAndRates) {
    valueAndRates.toValue = Number(
      (
        (valueAndRates.fromRateValue / valueAndRates.toRateValue) *
        valueAndRates.fromValue
      ).toFixed(2)
    );

    setCurrentRateAndState({ ...valueAndRates });
  }

  function handleInputOrSelectChange(event) {
    let tmp = currentRateAndState;

    tmp[event.target.name] = Number(event.target.value);

    Number(event.target.value) < 0
      ? (tmp[event.target.name] = 0)
      : (tmp[event.target.name] = Number(event.target.value));

    toCurrancyValueCalc(tmp);
  }

  function handleFromToSwap(event) {
    event.preventDefault();

    let tmp = { ...currentRateAndState };

    tmp.fromValue = currentRateAndState.toValue;
    tmp.fromRateValue = currentRateAndState.toRateValue;
    tmp.toValue = currentRateAndState.fromValue;
    tmp.toRateValue = currentRateAndState.fromRateValue;

    toCurrancyValueCalc(tmp);
  }

  const valuteNameOptionItem = currency.map((item, key) => (
    <option key={key} value={item.Value} title={item.Name}>
      {item.CharCode}
    </option>
  ));

  return (
    <div className="container">
      <h3>Конвертер валют</h3>
      <form>
        <div className="currency">
          <select
            name="fromRateValue"
            value={currentRateAndState.fromRateValue}
            onChange={handleInputOrSelectChange}
          >
            {valuteNameOptionItem}
          </select>
          <p>в</p>
          <select
            name="toRateValue"
            value={currentRateAndState.toRateValue}
            onChange={handleInputOrSelectChange}
          >
            {valuteNameOptionItem}
          </select>
        </div>

        <div className="currency">
          <input
            value={currentRateAndState.fromValue}
            name="fromValue"
            type="number"
            placeholder="0"
            onChange={handleInputOrSelectChange}
          />
          <p>=</p>
          <input
            value={currentRateAndState.toValue}
            name="toValue"
            type="number"
            placeholder="0"
            readOnly="readnly"
            onChange={handleInputOrSelectChange}
          />
        </div>

        <div className="currency">
          <button onClick={handleFromToSwap}>
            <h5>Поменять местами</h5>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CurrencyConverter;
