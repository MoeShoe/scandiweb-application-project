import { request, gql } from "graphql-request";

import { API_ENDPOINT } from "../../constants/constants";

import { productListActions } from "./product-list-slice";

// a helpful promise used to prevent API calls from going in the wrong order
let pageHasBeenInitialized;
new Promise((res) => {
  pageHasBeenInitialized = res;
});

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
        categories: data.categories.map((cat) => ({
          ...cat,
          hasBeenFetched: false, // helps to check whether a category has been fetched before or not to avoid unnecessary API calls
        })),
        currencies: data.currencies,
      })
    );

    // fulfills the page initilization promise
    pageHasBeenInitialized();
  } catch (err) {
    /* very basic error handling without reflecting error state to 
    the UI because it wasn't required in the assignment */
    console.error(err.message);
  }
};

const fetchProductList = (category) => async (dispatch) => {
  try {
    // waits for the page to be initialized before doing any other API calls
    await pageHasBeenInitialized;

    // constructs the template literal for the query from the inputted array
    const queryTemplateLiteral = category.subCategories.reduce(
      (acc, cat) =>
        acc.concat(`
          {
            ${cat} : category(input: { title: "${cat}" }) {
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
          }`),
      ""
    );

    const query = gql`
      ${queryTemplateLiteral}
    `;

    const data = await request(API_ENDPOINT, query);

    // sets all available products
    dispatch(
      productListActions.addToProductList({
        category: category.mainCategory,
        /* implemented in this manner to improve scalablity.
         in case we had 3 categories or more instead, this would still work */
        products: Object.values(data).reduce(
          (acc, cat) => [...acc, ...cat.products],
          []
        ),
      })
    );
  } catch (err) {
    console.error(err.message);
  }
};

export { fetchProductList, initializeProductPage };
