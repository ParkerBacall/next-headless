'use client'
import { useState } from "react";
import Link from "next/link";
import CartTrigger from "./cart/cartTrigger";
import CartModal from "./cart/cartModal";

const Navbar = () => {
  return (
    <>
      <nav className="mt-10">
        <h1 className="font-bold mb-3 text-3xl text-center">
          Shopify + Next.js 14 !
        </h1>

        <ul className="text-center">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <CartTrigger />
          </li>
        </ul>
      </nav>
      <CartModal />
    </>
  );
};

export default Navbar;
