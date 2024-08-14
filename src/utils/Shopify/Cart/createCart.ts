import { gql } from "@/utils/gql";

const createCart = async (id: string, quantity: number): Promise<any> => {
  const variables = {
    quantity: quantity,
    id: id,
  };

  console.log("variables", variables)
  const res = await fetch(process.env.STOREFRONT_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.STOREFRONT_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        mutation createCart( $id: ID!, $quantity: Int!
        ) {
          cartCreate(  input: {
            lines: [
              {
                quantity: $quantity,
                merchandiseId: $id,
              }
            ]}) {
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
  const cartId = response.data.cartCreate.cart.id;
  return cartId;
};

export default createCart;
