
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import getProducts from "@/utils/Shopify/Products/getProducts";

const HomePage = async () => {
  const json = await getProducts();
  const { products } = json.data;
  

  return (
    <main className="container mx-auto">
    <div className="px-5">
      <h2 className="font-bold text-2xl mb-3">Our Products:</h2>
      <ul className="grid grid-cols-12 gap-4 pb-12">
        {products.nodes.map((product: any) => {
          const prodId = product.id.split("/").pop();
  
          return (
            <li
              key={product.id}
              className="border border-slate-200 rounded-md overflow-hidden col-span-full md:col-span-6 lg:col-span-4"
            >
              {product.featuredImage && (
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
        })}
      </ul>
    </div>
  </main>
  );
};

export default HomePage;
