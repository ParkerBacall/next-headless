import type { GraphQLResponse } from "@/types";
import { gql } from "@/utils/gql";

const getCollections = async (): Promise<any> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query CollectionsQuery {
          collections(first: 10) {
            edges {
              node {
                id
                handle
                title
                products(first: 50) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
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

  const response = await res.json();
  const collections = response.data.collections.edges.map(
    (collection: { node: any }) => collection.node
  );
  return collections;
};

export default getCollections;
