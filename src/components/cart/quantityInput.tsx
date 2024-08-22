'use client'

import React, { useTransition } from "react";
import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";
import { useCart } from "@/providers/CartContext";
import { updateItem } from "./actions";
import { Product } from "@/types";

type QuantityInputProps = {
  quantity: number;
  id: string;
  product: Product;
};

const QuantityInput = ({ quantity, id, product }: QuantityInputProps) => {
  const [isPending, startTransition] = useTransition()

  const { updateCartItem } = useCart();
  const handleClick = (target: string) => {
    if (target === 'plus') {
      startTransition(() => {
        updateCartItem(product.variants[0].id, 'plus')
      })
      updateItem(id, quantity + 1);
    } else {
      startTransition(() => {
        updateCartItem(product.variants[0].id, 'minus')
      })
      updateItem(id, quantity - 1);
    }
  };

  return (
    <div className="flex justify-around border-solid border-2 border-gray-400 rounded-lg w-[80px] h-[35px] items-center">
      <button
        onClick={() => handleClick("minus")}
        disabled={isPending}
        className={`${isPending && 'text-gray-400'} h-full border-solid border-r-2 border-gray-400 pr-[5px]`}
      >
        <MinusIcon className="w-[16px] h-[16x]" />
      </button>
      <span>{quantity}</span>
      <button
        disabled={isPending}
        onClick={() => handleClick("plus")}
        className={`${isPending && 'text-gray-400'} h-full border-solid border-l-2 border-gray-400 pl-[5px]`}
      >
        <PlusIcon className="w-[16px] h-[16x]" />
      </button>
    </div>
  );
};

export default QuantityInput;
