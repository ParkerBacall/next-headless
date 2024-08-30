"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type ProductFilterProps = {
  sort: string;
};

const ProductFilters = ({ sort }: ProductFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sortValue, setSortValue] = useState(sort);
  const handleSelection = (event: any) => {
    // will use this when multiple params are active
    const queryString = searchParams.toString();
    setSortValue(event.target.value);
    if (event.target.value) {
      const updatedPath = `${pathname}?sort=${event.target.value}`;
      router.push(updatedPath);
    } else {
      router.push(pathname);
    }
    router.refresh();
  };

  return (
    <div className="p-5 mb-5 flex justify-center">
      <div>
        <label className="mr-4">Sort By:</label>
        <select
          value={sortValue}
          onChange={(event: any) => handleSelection(event)}
          className="border-2 rounded-lg"
          id="sort"
        >
          <option value="">Featured</option>
          <option value="TITLE">Name</option>
          <option value="PRICE_ASC">Price: High to Low</option>
          <option value="PRICE_DESC">Price: Low to High</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
