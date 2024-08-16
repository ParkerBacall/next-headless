"use client";
import React from "react";
import { useCart } from "@/providers/CartContext";
import CartIcon from "../icons/cart";
import { openDrawer } from "../overlay/overlayActions";
import { useModal } from "@/providers/ModalContext";

const CartTrigger = () => {
  const { cart } = useCart();
  const { isModalOpen, setModalOpen } = useModal();

  const handleClick = () => {
    setModalOpen(!isModalOpen);
    openDrawer();
  };

  return (
    <button className="absolute right-20 top-10 flex" onClick={handleClick}>
      <CartIcon />
      {cart?.totalQuantity}
    </button>
  );
};

export default CartTrigger;
