"use client";

type AddToCartProps = {
  id: string;
  createCart: any;
};

const AddToCart = async ({ id, createCart }: AddToCartProps) => {
  return (
    <button
      onClick={(event) => createCart(id, 1)}
      className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
      type="button"
    >
      Add to Cart
    </button>
  );
};
export default AddToCart;
