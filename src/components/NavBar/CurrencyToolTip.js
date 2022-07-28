import { Component } from "react";

import styles from "./CurrencyToolTip.module.css";

/* Usually, i would make a reusable UI component for a tooltip, but since the
 two tooltips in the web-app are drastically different, it makes it not as effecient */
class CurrencyToolTip extends Component {
  render() {
    return (
      <div className={styles["tooltip-container"]} data-istooltip={true}>
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
