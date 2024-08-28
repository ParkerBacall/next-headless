import type { GraphQLResponse } from "@/types";
import { gql } from "@/utils/gql";

const getCollectionProducts = async (handle: string): Promise<any> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query getCollectionIdFromHandle($handle: String!) {
            collectionByHandle(handle: $handle) {
            title
              products(first: 50) {
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
            handle: handle,
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
  console.log('response', response)
  const products = response.data.collectionByHandle.products.edges.map(
    (product: { node: any }) => product.node
  );
  return {products, title: response.data.collectionByHandle.title};
};

export default getCollectionProducts;
