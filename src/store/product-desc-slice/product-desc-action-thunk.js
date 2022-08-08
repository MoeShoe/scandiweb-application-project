import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";

import { productDescActions } from "./product-desc-slice";

/* this would only be used if we didn't fetch product list from before,
 in the exact case that a user called for the product by url */
const fetchProductDescription = (productId) => async (dispatch) => {
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

    dispatch(productDescActions.setProductDesc(data.product));
  } catch (err) {
    console.error(err.message);
  }
};

export { fetchProductDescription };
