import { Component } from "react";

class Layout extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(57, 55, 72, 0.22)",
        }}
      ></div>
    );
  }
}

export default Layout;
