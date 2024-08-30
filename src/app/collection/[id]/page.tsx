import ProductFilters from "@/components/collections/productFilters";
import ProductGrid from "@/components/collections/productGrid";
import { useSearchParams } from "next/navigation";

import getCollectionProducts from "@/utils/Shopify/Collections/getCollectionProducts";

type SingleProdutPageProps = {
  searchParams: {
    sort: string;
  };
  params: {
    id: string;
  };
};

const collectionPage = async ({
  searchParams,
  params,
}: SingleProdutPageProps) => {
  const { id } = params;
  const { sort } = searchParams;

  const { title, products } = await getCollectionProducts(
    id,
    sort?.toUpperCase()
  );

  return (
    <main className="container mx-auto">
      <div className="px-5">
        <h1 className="m-5 text-4xl text-center"> {title} </h1>
        <ProductFilters sort={sort?.toUpperCase()} />
        <ProductGrid products={products} />{" "}
      </div>
    </main>
  );
};

export default collectionPage;
