import { Component } from "react";

import styles from "./ProductForm.module.css";
import Button from "../UI/Button";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    // state that tracks selected attributes
    this.state = {
      selectedAttributes: [], // { id, selectedAttribute }[]
    };
  }

  componentDidUpdate(_, prevState) {
    /* populates the selected attributes list when the component first loads,
     it selects the first value on each attribute by default */
    if (
      this.props.formData?.attributes?.length &&
      this.props.formData?.attributes?.length !==
        prevState.selectedAttributes.length
    ) {
      this.setState({
        selectedAttributes: [
          ...this.props.formData?.attributes?.map((attr) => ({
            id: attr.id,
            //  by default the first attributes is selected
            selectedAttribute: attr.items.at(0),
          })),
        ],
      });
    }
  }

  attributeSelectClickHandler(attrData) {
    const attrIndex = this.state.selectedAttributes.findIndex(
      (attr) => attr.id === attrData.attrId
    );

    // creates a copy of our state
    const newAttrState = this.state.selectedAttributes.slice(); // a shallow one will suffice, our state isn't nested deeply

    // new desired state
    newAttrState[attrIndex] = {
      id: attrData.attrId,
      selectedAttribute: attrData.item,
    };

    // set the new state
    this.setState({ selectedAttributes: newAttrState });
  }

  addProductClickHandler() {
    this.props.addProductHandler(this.state.selectedAttributes);
  }

  render() {
    const { brand, name, attributes, prices, description, inStock } =
      this.props.formData;

    return (
      <div className={styles["description-list-container"]}>
        {/* Name and Brand */}
        <div className={styles["brand"]}>{brand}</div>
        <div className={styles["name"]}>{name}</div>

        {/* Attributes */}
        <div className={styles["attributes-main-container"]}>
          {/* Attribute title */}
          {attributes?.map((attr) => (
            <div className={styles["attribute-container"]} key={attr.id}>
              <div className={styles["detail-title"]}>
                {attr.name.toUpperCase()}:
              </div>
              {/* Attribute select */}
              <div className={styles["attribute-select-container"]}>
                {/* if Attribute type text */}
                {attr.type === "text" &&
                  attr.items.map((itm) => (
                    <div
                      className={`${styles["text-attr-select"]} ${
                        itm.id ===
                        this.state.selectedAttributes.find(
                          (at) => at.id === attr.id
                        )?.selectedAttribute?.id
                          ? styles["text-attr-selected"]
                          : ""
                      }`}
                      onClick={this.attributeSelectClickHandler.bind(this, {
                        attrId: attr.id,
                        item: itm,
                      })}
                      key={itm.id}
                    >
                      {itm.displayValue}
                    </div>
                  ))}

                {/* if Attribute type swatch */}
                {attr.type === "swatch" &&
                  attr.items.map((itm) => (
                    <div
                      className={`${styles["swatch-attr-select"]} ${
                        itm.id ===
                        this.state.selectedAttributes.find(
                          (at) => at.id === attr.id
                        )?.selectedAttribute?.id
                          ? styles["swatch-attr-selected"]
                          : ""
                      }`}
                      // style prop used for non constant css value
                      style={{ backgroundColor: itm.value }}
                      onClick={this.attributeSelectClickHandler.bind(this, {
                        attrId: attr.id,
                        item: itm,
                      })}
                      key={itm.id}
                    ></div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className={styles["price-container"]}>
          <div className={styles["detail-title"]}>PRICE:</div>
          <div className={styles["price"]}>
            {`${this.props.currentCurrency.symbol}${
              prices?.find(
                (cur) => cur.currency.label === this.props.currentCurrency.label
              )?.amount
            }`}
          </div>
        </div>

        {/* Buttons */}
        {/* if product available */}
        {inStock && (
          <Button
            className={styles["button"]}
            onClick={this.addProductClickHandler.bind(this)}
          >
            ADD TO CART
          </Button>
        )}

        {/* if product out of stock */}
        {!inStock && (
          <Button
            className={`${styles["button"]} ${styles["out-of-stock-button"]}`}
          >
            OUT OF STOCK
          </Button>
        )}

        {/* Product description */}
        <div
          className={`${styles["description-container"]} inserted-product-description`}
          /* really only dangerous when inserting from an unknown source */
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
    );
  }
}

export default ProductForm;
