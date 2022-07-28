import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";
import { productListActions } from "./product-list-slice";

// this is meant to run once the user first visits the page
const initializeProductPage = () => async (dispatch) => {
  try {
    const query = gql`
      {
        categories {
          name
        }
        currencies {
          label
          symbol
        }
      }
    `;

    const data = await request(API_ENDPOINT, query);

    dispatch(
      productListActions.initializeProductList({
        categories: data.categories,
        currencies: data.currencies,
      })
    );

    // page defaults
    dispatch(fetchProductList("all"));
    dispatch(productListActions.setCurrency({ label: "USD", symbol: "$" }));
  } catch (err) {
    /* very basic error handling without reflecting error state to 
    the UI because it wasn't required in the assignment */
    console.error(err.message);
  }
};

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
            gallery
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
    console.error(err.message);
  }
};

export { fetchProductList, initializeProductPage };
