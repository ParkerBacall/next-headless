"use client";
import { Product, ProductVariant } from "@/types";
import getSelectedVariant from "@/utils/Shopify/getSelectedVaraint"

type VariantSelectorProps = {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: any;
};

const VariantSelector = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: VariantSelectorProps) => {
  const handleClick = (value: string, name: string) => {
    const newSelection = getSelectedVariant(product, value, name);
    setSelectedVariant(newSelection);
  };


  return (
    <div className="flex mb-4">
      {product.options.map((options: any, index: number) => {
        return (
          <div key={index} className="flex flex-col">
            <label className="mb-1">{options.name}:</label>
            <div>
              {options.optionValues.map((value: any, index: number) => {
                return (
                  <button
                    onClick={() => handleClick(value.name, options.name)}
                    className={`${
                      value.name === selectedVariant.title
                        ? "bg-blue-600 text-white "
                        : "text-blue-600 "
                    } border inline-block mr-2 p-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150`}
                    key={index}
                  >
                    {value.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;
