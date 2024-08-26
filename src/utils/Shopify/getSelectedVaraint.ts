import type { Product, ProductVariant } from "@/types";

const getSelectedVariant =  (product: Product, value: string, name: string) => {
    return product.variants.find((variant: ProductVariant) => {
      return (
        variant.selectedOptions[0].name === name &&
        variant.selectedOptions[0].value === value
      );
    })
}

    export default getSelectedVariant;
