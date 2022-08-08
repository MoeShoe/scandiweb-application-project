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

    // sets all available categories and currencies, so nothing is hardcoded and the app is scalable
    dispatch(
      productListActions.initializeProductList({
        categories: data.categories,
        currencies: data.currencies,
      })
    );
  } catch (err) {
    /* very basic error handling without reflecting error state to 
    the UI because it wasn't required in the assignment */
    console.error(err.message);
  }
};

const fetchProductList = () => async (dispatch) => {
  try {
    const query = gql`
      {
        category(input: { title: "all" }) {
          products {
            category
            name
            brand
            id
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            gallery
            inStock
            attributes {
              name
              type
              items {
                displayValue
                value
                id
              }
              id
            }
            description
          }
        }
      }
    `;

    const data = await request(API_ENDPOINT, query);

    // sets all available products
    dispatch(
      productListActions.setProductList({
        products: data.category.products,
      })
    );
  } catch (err) {
    console.error(err.message);
  }
};

export { fetchProductList, initializeProductPage };
