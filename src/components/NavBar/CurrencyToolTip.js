import { Component } from "react";

import styles from "./CurrencyToolTip.module.css";

/* Usually, i would make a reusable UI component for a tooltip, but since the
 two tooltips in the web-app are drastically different, it makes it not as effecient */
class CurrencyToolTip extends Component {
  render() {
    return (
      <div className={styles["tooltip-container"]} data-istooltip={true}>
        this is the currency tooltip!
      </div>
    );
  }
}

export default CurrencyToolTip;
