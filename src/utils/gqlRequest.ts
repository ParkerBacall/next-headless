import type { ShopifyProduct } from "@/types";

export const getProduct = async (id: string, body: string): Promise<ShopifyProduct> => {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
      },
      body,
    });
}