import Link from "next/link";
import CartTrigger from "./cart/cartTrigger";
import CartModal from "./cart/cartModal";
import getCollections from "@/utils/Shopify/getCollections";

const Navbar = async () => {
  const collections = await getCollections();

  return (
    <>
      <nav className="mt-[60px] lg:mt-10">
        <h1 className="font-bold mb-3 text-3xl text-center">
          Shopify + Next.js 14 !
        </h1>

        <ul className="text-center">
          <li>
            {collections.map((collection: any, index: number) => (
              <Link
                key={index}
                href={collection.handle === 'frontpage' ? "/" : "/collection/" + collection.handle}
                className="p-2 text-blue-600 hover:underline"
              >
                {collection.title}
              </Link>
            ))}
            <CartTrigger />
          </li>
        </ul>
      </nav>
      <CartModal />
    </>
  );
};

export default Navbar;
