import { Component } from "react";

import styles from "./ProductImages.module.css";

class ProductImages extends Component {
  render() {
    return (
      <>
        <div className={styles["images-container"]}>
          {this.props.imagesList?.map((img, i) => (
            <div className={styles["image-select-container"]}>
              <img src={img} alt={`product ${i}`} key={i} />
            </div>
          ))}
        </div>
        <div className={styles["main-image-container"]}>
          <img src={this.props.imagesList?.at(0)} alt="product" />
        </div>
      </>
    );
  }
}

export default ProductImages;
