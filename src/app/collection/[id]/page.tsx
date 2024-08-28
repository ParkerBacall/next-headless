import getCollectionProducts from "@/utils/Shopify/getCollectionProducts";
import ProductGrid from "@/components/product/productGrid";

type SingleProdutPageProps = {
  params: {
    id: string;
  };
};

const collectionPage = async ({ params }: SingleProdutPageProps) => {
  const {products, title} = await getCollectionProducts(params.id);
  return (
    <main className="container mx-auto">
      <div className="px-5">
        <h1 className="m-8 text-4xl text-center"> {title} </h1>
        <ProductGrid products={products} />
      </div>
    </main>
  );
};

export default collectionPage;
