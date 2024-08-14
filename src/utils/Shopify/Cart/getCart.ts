import { gql } from "@/utils/gql";

const getCart = async (id: string | undefined): Promise<any> => {
  const variables = {
    id,
  };

  const res = await fetch(process.env.STOREFRONT_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.STOREFRONT_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ($id: ID!) {
          cart(id: $id) {
            cost {
              subtotalAmount {
                amount
              }
            }
            totalQuantity
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  cost {
                    subtotalAmount {
                      amount
                    }
                  }
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      image {
                        url(transform: { maxWidth: 100 })
                      }
                      product {
                        title
                      }
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`
          Failed to fetch data
          Status: ${res.status}
          Response: ${text}
        `);
  }
  const response = await res.json();
  const cart = response.data.cart;
  return cart
};

export default getCart;
