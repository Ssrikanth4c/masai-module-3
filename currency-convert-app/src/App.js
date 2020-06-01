import React from "react";
import "./styles.css";
import axios from "axios";
import CurrencyConversion from "./components/CurrencyConversion";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyOptions: [],
      fromCurrency: "",
      toCurrency: "",
      exchangeRate: "",
      fromAmount: 0,
      toAmount: 0
    };
  }

  componentDidMount = () => {
    axios.get(BASE_URL).then(response => {
      console.log(response.data.rates);
      const firstOption = Object.keys(response.data.rates)[0];
      console.log(firstOption);
      this.setState({
        currencyOptions: [
          response.data.base,
          ...Object.keys(response.data.rates)
        ],
        fromCurrency: response.data.base,
        toCurrency: firstOption,
        exchangeRate: response.data.rates[firstOption]
      });
    });
  };

  ChangeHandle = (value, type) => {
    if (type === "FROM") {
      this.setState(
        {
          fromCurrency: value
        },
        () => {
          axios
            .get(
              `${BASE_URL}?base=${this.state.fromCurrency}&symbols=${
                this.state.toCurrency
              }`
            )
            .then(response =>
              this.setState(
                {
                  exchangeRate: response.data.rates[this.state.toCurrency]
                },
                () => this.amountChangeHandler(this.state.fromAmount, "FROM")
              )
            );
        }
      );
    } else {
      this.setState(
        {
          toCurrency: value
        },
        () => {
          axios
            .get(
              `${BASE_URL}?base=${this.state.fromCurrency}&symbols=${
                this.state.toCurrency
              }`
            )
            .then(response =>
              this.setState(
                {
                  exchangeRate: response.data.rates[this.state.toCurrency]
                },
                () => this.amountChangeHandler(this.state.toAmount, "TO")
              )
            );
        }
      );
    }
  };

  amountChangeHandler = (amt, type) => {
    if (type === "FROM") {
      this.setState({
        fromAmount: amt,
        toAmount: amt * this.state.exchangeRate
      });
    } else {
      this.setState({
        toAmount: amt,
        fromAmount: amt / this.state.exchangeRate
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="display-4 text-info text-center">Currency Convert</h1>
        <hr />
        <CurrencyConversion
          className="text-center"
          currencyOptions={this.state.currencyOptions}
          selectedCurrencySymbols={this.state.fromCurrency}
          ChangeHandle={e => this.ChangeHandle(e.target.value, "FROM")}
          amount={this.state.fromAmount}
          amountChangeHandler={e =>
            this.amountChangeHandler(e.target.value, "FROM")
          }
        />
        <div className="font-weight-bold text-center display-4">=</div>
        <CurrencyConversion
          className="text-center"
          currencyOptions={this.state.currencyOptions}
          selectedCurrencySymbols={this.state.toCurrency}
          ChangeHandle={e => this.ChangeHandle(e.target.value, "TO")}
          amount={this.state.toAmount}
          amountChangeHandler={e =>
            this.amountChangeHandler(e.target.value, "TO")
          }
        />
      </React.Fragment>
    );
  }
}
export default App;
