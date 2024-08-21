"use client";

import React from "react";
import CloseIcon from "../icons/close";
import { useModal } from "@/providers/ModalContext";
import { useCart } from "@/providers/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import TrashIcon from "../icons/trash";
import QuantityInput from "./quantityInput";

const CartModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { cart } = useCart();

  return (
    <div
      className={`modal shadow-md px-5 py-10 w-full lg:w-[450px] h-full fixed z-[3] bg-white right-0 invisible flex flex-col justify-between`}
      style={{
        transform: isModalOpen ? "" : "translateX(100%)",
      }}
    >
      <button className="absolute top-10 right-[20px]" onClick={closeModal}>
        <CloseIcon />
      </button>
      <>
        {cart ? (
          <>
            <div>
              <h2 className="text-2xl p-1">Your Cart</h2>
              <ul className="mt-10 flex flex-col gap-10">
                {cart.lines.map((item: any, index: number) => {
                  return (
                    <li
                      className="flex relative items-start w-full"
                      key={index}
                    >
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={item.merchandise.product.title}
                        width="100"
                        height="100"
                      />
                      <div className="flex flex-col gap-[5px] w-2/3">
                        <h3 className="text-lg">
                          {item.merchandise.product.title}
                        </h3>

                        <QuantityInput quantity={item.quantity} />
                        <p>{formatPrice(item.cost.totalAmount.amount)}</p>
                      </div>
                      <button className="">
                        <TrashIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full">
              <p className="p-1">
                Total Cost: {formatPrice(cart.cost.totalAmount.amount)}
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
