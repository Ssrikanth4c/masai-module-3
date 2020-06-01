import React from "react";

export default function CurrencyConversion(props) {
  const {
    currencyOptions,
    selectedCurrency,
    currencyChangeHandler,
    amount,
    amountChangeHandler
  } = props;

  return (
    <div className="row text-center">
      <div className="col-md-6">
        <input
          type="number"
          className="input"
          value={amount}
          onChange={amountChangeHandler}
        />
        <select
          value={selectedCurrency}
          className="text-danger font-weight-bold"
          onChange={currencyChangeHandler}
        >
          {currencyOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
