import type { ShopifyProduct } from "@/types";
import { gql } from "@/utils/gql";
const getProduct = async (id: string): Promise<ShopifyProduct> => {

    const res = await fetch(process.env.GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: gql`
          query SingleProductQuery($id: ID!) {
            product(id: $id) {
              description
              variants(first: 25) {
                edges {
                  node {
                    id
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
        `,
        variables: {
          id: `gid://shopify/Product/${id}`,
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
  
    return await res.json();
  };

  export default getProduct;