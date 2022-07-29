import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";
import { productDescActions } from "./product-desc-slice";

const fetchProductDescription = (productId) => async (dispatch) => {
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

    dispatch(productDescActions.setProductDesc(data.product));
  } catch (err) {
    console.error(err.message);
  }
};

export { fetchProductDescription };
