import { ReactNode } from "react";

export type GraphQLResponse = {
  data: {
    products: {
      nodes: Product[];
    };
  };
  extensions: ShopifyExtension;
};

export type ShopifyExtension = {
  cost: {
    actualQueryCost: number;
    requestedQueryCost: number;
    throttleStatus: {
      currentlyAvailable: number;
      maximumAvailable: number;
      restoreRate: number;
    };
  };
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};
export type Edge<T> = {
  node: T;
};

export type ShopifyProduct = {
  data: {
    product: {
      description: string;
      status: string; 
      options: any[]
      featuredImage: {
        altText: string;
        height: number;
        id: string;
        url: string;
        width: number;
      };
      images: Image[]
      variants: ProductVariant[];
      handle: string;
      id: string;
      priceRangeV2: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      tags: string[];
      title: string;
    };
  };
};

export type Variant = {
  id: string;
  node: {
    id: string;
  };
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
    amountPerQuantity: Money;
    compareAtAmountPerQuantity: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};
export type Money = {
  amount: string;
  currencyCode: string;
};

export type Product = {
  tags: any;
  description: ReactNode;
  priceRangeV2: any;
  variants: ProductVariant[];
  images: Image[];
  id: string;
  options: any[];
  status: string; 
  handle: string;
  title: string;
  featuredImage: {
    altText: string;
    height: number;
    id: string;
    url: string;
    width: number;
  };
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  compareAtPrice: any;
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};