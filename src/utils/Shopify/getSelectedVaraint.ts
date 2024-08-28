import type { Product, ProductVariant } from "@/types";

const getSelectedVariant = (product: Product, selectedOptions: any) => {
  return product.variants.find((variant: ProductVariant) => {
    const selectedOptionMap: { [name: string]: string } = {};
    const variantSelectedOptionMap: { [name: string]: string } = {};

    selectedOptions.forEach(
      ({ name, value }: { name: string; value: string }) => {
        selectedOptionMap[name] = value;
      }
    );

    variant.selectedOptions.forEach(
      ({ name, value }: { name: string; value: string }) => {
        variantSelectedOptionMap[name] = value;
      }
    );

    return selectedOptions.every(({ name }: { name: string }) => {
      return selectedOptionMap[name] === variantSelectedOptionMap[name];
    });
  });
};

export default getSelectedVariant;
