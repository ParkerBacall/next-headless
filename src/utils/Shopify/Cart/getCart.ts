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
              totalAmount {
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
                    totalAmount {
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
                        featuredImage {
                          url(transform: { maxWidth: 100 })
                        }
                        title
                        variants(first: 250) {
                          edges {
                            node {
                              id
                              title
                              availableForSale
                              selectedOptions {
                                name
                                value
                              }
                              price {
                                amount
                                currencyCode
                              }
                            }
                          }
                        }
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
  if (!response.data) {
    return null;
  }
  const cartData = response.data.cart;
  const cartLineItems = cartData.lines.edges.map((item: any) => {
    return {
      ...item.node,
      merchandise: {
        ...item.node.merchandise,
        product: {
          ...item.node.merchandise.product,
          variants: item.node.merchandise.product.variants.edges.map(
            (variant: any) => variant.node
          ),
        },
      },
    };
  });

  return {
    checkoutUrl: cartData.checkoutUrl,
    cost: cartData.cost,
    lines: cartLineItems,
    totalQuantity: cartData.totalQuantity,
  };
};

export default getCart;
