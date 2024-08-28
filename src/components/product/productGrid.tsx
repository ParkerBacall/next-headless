import { Product } from "@/types";
import ProductCard from "./productCard";
import { Suspense } from "react";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <ul className="grid grid-cols-12 gap-4 pb-12">
        {products.map((product: Product, index: number) => (
          <ProductCard product={product} index={index} key={index}/>
        ))}
      </ul>
    </Suspense>
  );
};

export default ProductGrid;
