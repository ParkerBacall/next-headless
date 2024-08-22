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
  const isDisabled = isPending || product.status !== 'ACTIVE' || !product.variants[0].availableForSale

  const handleAddToCart = () => {
    if (cart) {
      startTransition(() => {
        addCartItem(product.variants[0], product);  
      })
      addItem(id, 1);
    } else {
      startTransition(() => {
        addCartItem(product.variants[0], product);  
      })
      createCartAndSetCookie(id, 1);
    }
    openModal()
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleAddToCart}
      className={`${isDisabled ? 'border-gray-400 text-gray-400' :  'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150'}  border inline-block p-2 rounded-md`}
      type="button"
    >
      Add to Cart
    </button>
  );
};
export default AddToCart;
