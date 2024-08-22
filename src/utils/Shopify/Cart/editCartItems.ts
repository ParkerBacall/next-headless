import { gql } from "@/utils/gql";
const editCartItems = async (
  cartId: string,
  id: string,
  quantity: number
): Promise<any> => {
  const variables = {
    quantity: quantity,
    id: id,
    cartId: cartId,
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
        mutation cartLinesUpdate($cartId: ID!, $id: ID!, $quantity: Int!) {
          cartLinesUpdate(
            cartId: $cartId
            lines: [{ quantity: $quantity, id: $id }]
          ) {
            cart {
              id
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
  const updatedCart = response.data.cartLinesUpdate.cart;
  return updatedCart;
};

export default editCartItems;
