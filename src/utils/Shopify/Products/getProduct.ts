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

  const productData = await res.json();
  return {
    data: {
      product: {
        ...productData.data.product,
        images: productData.data.product.images.edges.map(
          (image: any) => image.node
        ),
        variants: productData.data.product.variants.edges.map(
          (variant: any) => variant.node
        ),
      },
    },
  };
};

export default getProduct;
