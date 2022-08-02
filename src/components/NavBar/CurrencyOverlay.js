import { Component } from "react";

import styles from "./CurrencyOverlay.module.css";

class CurrencyToolTip extends Component {
  render() {
    return (
      <div className={styles["currency-overlay-container"]} id="overlay">
        {/* Renders the list of available currencies that were fetched from the backend */}
        {this.props.listOfCurrencies.map((cur) => (
          <div
            className={styles["currency-select"]}
            onClick={() => {
              this.props.onCurrencyClick(cur);
            }}
            key={cur.label}
          >{`${cur.symbol} ${cur.label}`}</div>
        ))}
      </div>
    );
  }
}

export default CurrencyToolTip;
