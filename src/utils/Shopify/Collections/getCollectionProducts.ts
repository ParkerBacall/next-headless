import type { GraphQLResponse } from "@/types";
import { gql } from "@/utils/gql";

const getCollectionProducts = async (handle: string, sortKey: string): Promise<any> => {

  let graphqlSortKey = sortKey;
  let graphqlReverse = false;


  if (sortKey?.includes('_')) {
    const sortKeyArray = sortKey.split('_')
    graphqlSortKey = sortKeyArray[0];

    if (sortKeyArray[1] === "DESC") {
      graphqlReverse = true
    }
  }

  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query getCollectionIdFromHandle($handle: String!, $sortKey:ProductCollectionSortKeys, $reverse: Boolean!) {
            collectionByHandle(handle: $handle) {
            title
            handle
              products(first: 50, sortKey: $sortKey, reverse: $reverse) {
                edges {
                  node {
                    description
                    status
                    options(first: 100) {
                      name
                      id
                      optionValues {
                        id
                        name
                      }
                    }
                    variants(first: 100) {
                      edges {
                        node {
                          id
                          title
                          availableForSale
                          selectedOptions {
                            name
                            value
                          }
                          price
                          compareAtPrice
                        }
                      }
                    }
                    images(first: 20) {
                      edges {
                        node {
                          altText
                          height
                          id
                          url
                          width
                        }
                      }
                    }
                    featuredImage {
                      altText
                      height
                      id
                      url
                      width
                    }
                    id
                    priceRangeV2 {
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                    }

                    tags
                    title
                  }
                }
              }
            }
          }
        
      `,
        variables: {
            handle,
            sortKey: graphqlSortKey,
            reverse: graphqlReverse
          },
    }),
  });

  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
        Failed to fetch data
        Status: ${res.status}
        Response: ${text}
      `);
  }

  const response = await res.json();
  const products = response.data.collectionByHandle.products.edges.map(
    (product: { node: any }) => product.node
  );
  return {products, handle: response.data.collectionByHandle.handle, title: response.data.collectionByHandle.title};
};

export default getCollectionProducts;
