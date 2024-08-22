import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import AddToCart from "@/components/cart/addToCart";
import { Suspense } from "react";
import getProduct from "@/utils/Shopify/Products/getProduct";
import placeholder from "../../../../public/placeholder.png";

type SingleProdutPageProps = {
  params: {
    id: string;
  };
};

const SingleProductPage = async ({ params }: SingleProdutPageProps) => {
  const json = await getProduct(params.id);
  const product = json.data.product;

  return (
    <Suspense fallback={<div>Loading... </div>}>
      <div className="container mx-auto md:pb-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:basis-1/2">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                placeholder="blur"
                blurDataURL={product.featuredImage.url}
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <Image
                  src={placeholder}
                  alt={"lorem ipsum"}
                  width="100"
                  height="100"
                />
              </div>
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
            <AddToCart
              product={product}
              variant={product.variants[0]}
              id={product.variants[0].id}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SingleProductPage;
