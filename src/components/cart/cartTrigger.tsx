"use client";
import React from "react";
import { useCart } from "@/providers/CartContext";
import CartIcon from "../icons/cart";
import { useModal } from "@/providers/ModalContext";

const CartTrigger = () => {
  const { cart } = useCart();
  const { openModal } = useModal();

  return (
    <button className="absolute right-5 lg;right-20 top-5 lg:top-10 flex" onClick={openModal}>
      <CartIcon />
      {cart?.totalQuantity !== 0 && cart?.totalQuantity}
    </button>
  );
};

export default CartTrigger;
