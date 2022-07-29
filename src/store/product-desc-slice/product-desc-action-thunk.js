import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";
import { productDescActions } from "./product-desc-slice";

const getProductDescription = (productId) => async (dispatch) => {
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

    console.log(data);

    dispatch(productDescActions.setProductDesc(data));
  } catch (err) {
    console.error(err.message);
  }
};

export { getProductDescription };
