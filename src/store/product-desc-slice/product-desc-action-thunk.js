import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";

import { productDescActions } from "./product-desc-slice";
import { cartActions } from "../cart-slice/cart-slice";

const fetchProductDescription =
  (productId, addToCart = false) =>
  async (dispatch) => {
    //addToCart arg decides whether to add product to the cart immediately after it gets fetched or not
    try {
      const query = gql`{
        product(id:"${productId}") {
            id
            name
            brand
            description
            attributes {name type items {displayValue value id} id}
            gallery
            prices {amount currency {label symbol}}
            inStock  
        }
    }`;

      const data = await request(API_ENDPOINT, query);

      /* a condition that checks whether the product exists, for example if the
     user enters a random product url like: /products/halflife3 */
      if (!data.product) {
        dispatch(productDescActions.setProductIsNotFound(true));
        return;
      }

      if (addToCart) {
        // only if product has no attributes
        dispatch(
          cartActions.addItemToCart({
            item: data.product,
            quantity: 1,
            selectedAttributes: [],
          })
        );
        return;
      }

      dispatch(productDescActions.setProductDesc(data.product));
    } catch (err) {
      console.error(err.message);
    }
  };

export { fetchProductDescription };
