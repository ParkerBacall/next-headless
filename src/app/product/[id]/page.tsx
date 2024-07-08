"use server";
import type { ShopifyProduct, GraphQLResponse } from "@/types";
import { gql } from "@/utils/gql";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import AddToCart from "@/components/addToCart";
import { Suspense } from "react";

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

  return res.json();
};


const createCart = async(
  id: string,
  quantity: string
): Promise<GraphQLResponse> => {
  "use server";
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: id,
        },
      ],
    },
  };
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              id
            }
          }
        }
      `,
      variables,
    }),
  })

    if (!res.ok) {
    console.log('hit')
    const text = await res.text(); // get the response body for more information
    console.log('text', text)
    throw new Error(`
        Failed to fetch data
        Status: ${res.status}
        Response: ${text}
      `);
  }
  
  return res.json(); 
};


type SingleProdutPageProps = {
  params: {
    id: string;
  };
};

const SingleProductPage = async ({ params }: SingleProdutPageProps) => {
  const json = await getProduct(params.id);
  const { product } = json.data;

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <div className="container mx-auto md:pb-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:basis-1/2">
            {product.featuredImage && (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                placeholder="blur"
                blurDataURL={product.featuredImage.url}
              />
            )}
          </div>

          <div className="p-5 md:basis-1/2">
            {product.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-yellow-400 font-bold py-1 px-3 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}

            <h3 className="font-medium mt-3 text-3xl">{product.title}</h3>

            <h4>
              {formatPrice(product.priceRangeV2.minVariantPrice.amount)}{" "}
              {product.priceRangeV2.minVariantPrice.currencyCode}
            </h4>

            <p className="mt-2 mb-4">{product.description}</p>
            <AddToCart id={product.id} createCart={createCart}/>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SingleProductPage;
