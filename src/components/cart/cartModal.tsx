"use client";

import React, { useTransition } from "react";
import CloseIcon from "../icons/close";
import { useModal } from "@/providers/ModalContext";
import { useCart } from "@/providers/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import TrashIcon from "../icons/trash";
import QuantityInput from "../common/quantityInput";
import placeholder from "../../../public/placeholder.png";
import { redirectToCheckout, updateItem } from "./actions";

const CartModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const { cart, updateCartItem } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (item: any) => {
    startTransition(() => {
      updateCartItem(item.merchandise.id, "delete");
    });
    updateItem(item.id, 0);
  };

  const handleQuantityUpdate = (target: string, quantity: number, item: any) => {
    const { product } = item.merchandise
    const { id } = item
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
  }
  
  const quantityInputDisabled = isPending;

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
        {cart && cart?.totalQuantity !== 0 ? (
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
                      {item.merchandise.product.featuredImage?.url ? (
                        <Image
                          src={item.merchandise.product.featuredImage.url}
                          alt={item.merchandise.product.title}
                          width="100"
                          height="100"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-[100px] h-[100px]">
                          <Image
                            src={placeholder}
                            alt={"lorem ipsum"}
                            width="50"
                            height="50"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-[5px] w-2/3">
                        <h3 className="text-lg">
                          {item.merchandise.product.title}
                        </h3>

                        <QuantityInput
                          isMinusDisabled={quantityInputDisabled}
                          isPlusDisabled={quantityInputDisabled}
                          handleQuantityUpdate={handleQuantityUpdate}
                          quantity={item.quantity}
                          item={item}
                        />
                        <p>{formatPrice(item.cost.totalAmount.amount)}</p>
                      </div>
                      <button
                        disabled={isPending}
                        onClick={() => handleDelete(item)}
                      >
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
              <button
                onClick={() => redirectToCheckout()}
                className="mt-2 w-full px-4 py-2 bg-blue-600  text-white rounded-lg"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="mt-[60px] p-1 text-lg">Cart Currently Empty </p>
        )}
      </>
    </div>
  );
};

export default CartModal;
