"use client";
import { createCartAndSetCookie, addItem } from "./actions";
import { useCart } from "@/providers/CartContext";
import { useModal } from "@/providers/ModalContext";
import type { Product, ProductVariant  } from '@/types';
import { useTransition } from 'react';

type AddToCartProps = {
  id: string;
  product: Product;
  variant: ProductVariant;
};

const AddToCart = ({ id, product }: AddToCartProps) => {
  const { cart, addCartItem } = useCart();
  const { openModal } = useModal();
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    if (cart) {
      startTransition(() => {
        addCartItem(product.variants[0], product);  
      })
      addItem(id, 1);
    } else {
      createCartAndSetCookie(id, 1);
    }
    openModal()
  };

  return (
    <button
      disabled={isPending}
      onClick={handleAddToCart}
      className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
      type="button"
    >
      Add to Cart
    </button>
  );
};
export default AddToCart;
