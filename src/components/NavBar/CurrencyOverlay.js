import { Component } from "react";

import styles from "./CurrencyOverlay.module.css";

class CurrencyToolTip extends Component {
  render() {
    return (
      <div className={styles["tooltip-container"]} data-isoverlay>
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
