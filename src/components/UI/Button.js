import { Component } from "react";

import styles from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        className={`${styles["button"]} ${this.props.className}`}
        onClick={this.props.onClick}
        disabled={this.props.disabled || false}
        id={this.props.id}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
