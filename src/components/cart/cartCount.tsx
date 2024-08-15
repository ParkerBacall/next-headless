"use client";
import React from "react";
import { useCart } from "@/providers/CartContext";
const CartCount = () => {
  const {cart} = useCart()

  return <div>{cart?.totalQuantity}</div>;
};

export default CartCount;
