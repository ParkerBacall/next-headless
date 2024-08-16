"use client";
import { createCartAndSetCookie, addItem } from "./actions";
import { useCart } from "@/providers/CartContext";
import { useModal } from "@/providers/ModalContext";
import { openDrawer } from "../overlay/overlayActions";


type AddToCartProps = {
  id: string;
};

const AddToCart = ({ id }: AddToCartProps) => {
  const { cart } = useCart();
  const { isModalOpen, setModalOpen } = useModal();

  const handleAddToCart = () => {
    if (cart) {
      addItem(id);
    } else {
      createCartAndSetCookie(id, 1);
    }
    setModalOpen(true)
    openDrawer()
  };

  return (
    <button
      onClick={handleAddToCart}
      className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
      type="button"
    >
      Add to Cart
    </button>
  );
};
export default AddToCart;
