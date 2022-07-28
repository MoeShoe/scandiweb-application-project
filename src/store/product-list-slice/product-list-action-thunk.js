import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";
import { productListActions } from "./product-list-slice";

const fetchProductList = (category) => async (dispatch) => {
  try {
    const query = gql`
        {
            category(input: {title :"${category}"}) {
                products {
                    name
                    id
                    prices {
          currency {
            label
            symbol
          }
          amount
        }
    }
}
}  
`;

    const data = await request(API_ENDPOINT, query);

    dispatch(
      productListActions.setProductList({
        category,
        products: data.category.products,
      })
    );
  } catch (err) {
    /* very basic error handling without reflecting error state to 
    the UI because it wasn't required in the assignment */
    console.error(err.message);
  }
};

export default fetchProductList;
