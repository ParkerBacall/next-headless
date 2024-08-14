"use client";
import { createCartAndSetCookie } from "./actions";

type AddToCartProps = {
  id: string;
};

const AddToCart =  ({ id }: AddToCartProps) => {  
  return (
    <button
      onClick={() => (createCartAndSetCookie(id, 2))}
      className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
      type="button"
    >
      Add to Cart
    </button>
  );
};
export default AddToCart;
