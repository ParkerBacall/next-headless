"use client";

import React from "react";
import CloseIcon from "../icons/close";
import { useModal } from "@/providers/ModalContext";
import { useCart } from "@/providers/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

const CartModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { cart } = useCart();

  return (
    <div
      className={`modal shadow-md px-5 py-10 w-full lg:w-[400px] h-full fixed z-[3] bg-white absolute right-0 invisible flex flex-col justify-between`}
      style={{
        transform: isModalOpen ? "" : "translateX(100%)",
      }}
    >
      <button className="absolute top-10 right-10" onClick={closeModal}>
        <CloseIcon />
      </button>
      <>
        {cart ? (
          <>
            <h2 className="text-xl p-1">Your Cart</h2>
            <ul>
              {cart.lines.map((item: any, index: number) => {
                return (
                  <li key={index}>
                    <Image
                      src={item.merchandise.image.url}
                      alt={item.merchandise.product.title}
                      width="100"
                      height="100"
                    />
                    {item.merchandise.product.title + " "}
                    {item.quantity}
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
