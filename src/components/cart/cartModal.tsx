"use client";

import React from "react";
import CloseIcon from "../icons/close";
import { closeDrawer } from "../overlay/overlayActions";
import { useModal } from "@/providers/ModalContext";
import { useCart } from "@/providers/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

const CartModal = () => {
  const { isModalOpen, setModalOpen } = useModal();
  const { cart } = useCart();

  const handleClose = () => {
    setModalOpen(!isModalOpen);
    closeDrawer();
  };

  return (
    <div
      className={`modal shadow-md px-5 py-10 w-[400px] h-full fixed z-[3] bg-white absolute right-0 invisible flex flex-col justify-between`}
      style={{
        transform: isModalOpen ? "" : "translateX(100%)",
      }}
    >
      <button className="absolute top-10 right-10" onClick={handleClose}>
        <CloseIcon />
      </button>
      <>
        {cart ? (
          <>
            <h2 className="text-xl p-1">Your Cart</h2>
            <ul>
              {cart.lines.edges.map((item: any) => {
                return(<li>
                    <Image src={item.node.merchandise.image.url} alt={item.node.merchandise.product.title} width="100" height="100"/>
                    {item.node.merchandise.product.title + ' '} 
                    {item.node.quantity}
                </li>

                );
              })}
            </ul>
            <div className="w-full">
              <p className="p-1">
                Total Cost: {formatPrice(cart.cost.subtotalAmount.amount)}
              </p>
              <button className="mt-2 w-full px-4 py-2 bg-blue-600  text-white rounded-lg">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <p>no items in cart </p>
        )}
      </>
    </div>
  );
};

export default CartModal;
