"use client";
import { useState } from "react";
import { Product, ProductVariant } from "@/types";
import getSelectedVariant from "@/utils/Shopify/getSelectedVaraint";

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

  const initialSelectedOptions = product.options.map(( option: any) => {
    return { 'name': option.name, 'value': option.optionValues[0].name }
  })
  const [selectedOptions, setSelectedOptions ] = useState(initialSelectedOptions)

  const handleClick = (name: string, value: string) => {
    const newSelectedOptions = selectedOptions.map((option: any) => {
      if (option.name === name) {
        return {'name': name, 'value': value}
      } else {
        return {'name': option.name, 'value': option.value}
      }
    })

    const newSelection = getSelectedVariant(product, newSelectedOptions);
    setSelectedOptions(newSelectedOptions)
    setSelectedVariant(newSelection);
  };
  return (
    <div className="flex flex-col">
      {product.options.map(
        (options: any, index: number) =>
          options.optionValues.length > 1 && (
            <div key={index} className="flex flex-col mb-4">
              <label className="mb-1">{options.name}:</label>
              <div>
                {options.optionValues.map((value: any, index: number) => (
                  <button
                    onClick={() => handleClick(options.name, value.name)}
                    className={`${
                      selectedVariant?.title.split(' / ').includes(value.name)
                        ? "bg-blue-600 text-white "
                        : "text-blue-600 "
                    } border inline-block mr-2 p-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150`}
                    key={index}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default VariantSelector;
