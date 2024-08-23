"use client";
import { createCartAndSetCookie, addItem } from "./actions";
import { useCart } from "@/providers/CartContext";
import { useModal } from "@/providers/ModalContext";
import type { Product, ProductVariant } from "@/types";
import { useTransition } from "react";
import { useState } from "react";
import QuantityInput from "../common/quantityInput";

type AddToCartProps = {
  id: string;
  product: Product;
  variant: ProductVariant;
};

const AddToCart = ({ id, product }: AddToCartProps) => {
  const { cart, addCartItem } = useCart();
  const { openModal } = useModal();
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const isPlusDisabled = quantity >= 9;
  const isMinusDisabled = quantity <= 1;

  const handleQuantityUpdate = (
    target: string,
    quantity: number,
  ) => {
    if (target === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const isDisabled =
    isPending ||
    product.status !== "ACTIVE" ||
    !product.variants[0].availableForSale;

  const handleAddToCart = () => {
    if (cart) {
      startTransition(() => {
        addCartItem(product.variants[0], product, quantity);
      });
      addItem(id, quantity);
    } else {
      startTransition(() => {
        addCartItem(product.variants[0], product, quantity);
      });
      createCartAndSetCookie(id, quantity);
    }
    openModal();
  };

  return (
    <>
      <QuantityInput
        isMinusDisabled={isMinusDisabled}
        isPlusDisabled={isPlusDisabled}
        handleQuantityUpdate={handleQuantityUpdate}
        quantity={quantity}
      />
      <button
        disabled={isDisabled}
        onClick={handleAddToCart}
        className={`${
          isDisabled
            ? "border-gray-400 text-gray-400"
            : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
        }  border inline-block p-2 rounded-md mt-4`}
        type="button"
      >
        Add to Cart
      </button>
    </>
  );
};
export default AddToCart;
