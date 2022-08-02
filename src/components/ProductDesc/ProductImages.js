import { Component } from "react";

import styles from "./ProductImages.module.css";

class ProductImages extends Component {
  constructor(props) {
    super(props);

    //state that tracks current image
    this.state = { currentImage: this.props?.imagesList?.at(0) };
  }

  componentDidUpdate(prevProps) {
    // because imageList is initialy empty, we need this
    if (prevProps.imagesList?.at(0) !== this.props.imagesList?.at(0))
      this.setState({ currentImage: this.props?.imagesList?.at(0) });
  }

  imageSelectClickHandler(e) {
    this.setState({ currentImage: e.target.src });
  }

  render() {
    return (
      <>
        {/* Product images list */}
        <div className={styles["images-container"]}>
          {this.props.imagesList?.map((img, i) => (
            /* i know it is discouraged to use indexes as keys, but in this particular case
            it is not an issue since the product data state resets on component unmount */
            <div className={styles["image-select-container"]} key={i}>
              <img
                src={img}
                alt={`product ${i + 1}`}
                onClick={this.imageSelectClickHandler.bind(this)}
              />
            </div>
          ))}
        </div>

        {/* Main product image */}
        <div className={styles["main-image-container"]}>
          <img src={this.state.currentImage} alt="product" />
        </div>
      </>
    );
  }
}

export default ProductImages;
