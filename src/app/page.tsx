import getProducts from "@/utils/Shopify/Products/getProducts";
import ProductGrid from "@/components/collections/productGrid";

const HomePage = async () => {
  const json = await getProducts();
  const { products } = json.data;

  return (
    <main className="container mx-auto">
      <div className="px-5">
        <h2 className="font-bold text-2xl mb-3">Our Products:</h2>
        <ProductGrid products={products.nodes} />
      </div>
    </main>
  );
};

export default HomePage;
