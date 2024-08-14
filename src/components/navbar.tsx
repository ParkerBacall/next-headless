import Link from "next/link";
import CartCount from "./cart/cartCount";
import getCart from "@/utils/Shopify/Cart/getCart";

const Navbar = () => {

  return (
    <nav className="mt-10">
      <h1 className="font-bold mb-3 text-3xl text-center">
        Shopify + Next.js 14 !
      </h1>

      <ul className="text-center">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <CartCount/>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
