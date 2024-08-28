import { Product } from "@/types";
import Image from "next/image";
import placeholder from "../../../public/placeholder.png";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";

type ProductCardProps = {
  product: Product;
  index: number;
};
const ProductCard = ({ product, index }: ProductCardProps) => {
  const prodId = product.id.split("/").pop();

  return (
    <li
      key={index}
      className="border border-slate-200 rounded-md overflow-hidden col-span-full md:col-span-6 lg:col-span-4 flex justify-bettween flex-col"
    >
      {product.featuredImage ? (
        <div>
          <Image
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText}
            width={product.featuredImage?.width}
            height={product.featuredImage?.height}
            className="h-96 w-full object-cover"
            placeholder="blur"
            blurDataURL={product.featuredImage?.url}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <Image
            src={placeholder}
            alt={"lorem ipsum"}
            width="100"
            height="100"
          />
        </div>
      )}
      <div className="p-5">
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

        <Link
          href={`/product/${prodId}`}
          className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
        >
          View Product
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
