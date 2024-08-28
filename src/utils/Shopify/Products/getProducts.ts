import type { GraphQLResponse } from "@/types";
import { gql } from "@/utils/gql";

const getProducts = async (): Promise<any> => {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: gql`
          query ProductsQuery {
            products(first: 25) {
              nodes {
                description
                featuredImage {
                  altText
                  height
                  id
                  url
                  width
                }
                handle
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
        `,
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

    return await res.json();
  };

  export default getProducts