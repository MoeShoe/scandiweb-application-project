import { Component } from "react";

import styles from "./ProductImages.module.css";

class ProductImages extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: this.props?.imagesList?.at(0) };
  }

  imageSelectClickHandler(e) {
    this.setState({ currentImage: e.target.src });
  }

  render() {
    return (
      <>
        <div className={styles["images-container"]}>
          {this.props.imagesList?.map((img, i) => (
            <div className={styles["image-select-container"]}>
              <img
                src={img}
                alt={`product ${i}`}
                key={i}
                onClick={this.imageSelectClickHandler.bind(this)}
              />
            </div>
          ))}
        </div>
        <div className={styles["main-image-container"]}>
          <img src={this.state.currentImage} alt="product" />
        </div>
      </>
    );
  }
}

export default ProductImages;
