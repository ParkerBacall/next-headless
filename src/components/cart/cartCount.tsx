"use client";
import React, { useEffect } from "react";
import { useCart } from "@/providers/CartContext";
const CartCount = () => {
  const {cart} = useCart()

  console.log('1', cart)

  return <div>{cart?.data.cart.totalQuantity}</div>;
};

export default CartCount;
