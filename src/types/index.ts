
export type GraphQLResponse = {
    data: {
      products: {
        nodes: ShopifyProduct[];
      };
    };
    extensions: ShopifyExtension;
  };

type ShopifyExtension = {
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
  
type ShopifyProduct = {
    description: string;
    featuredImage: {
      altText: string;
      height: number;
      id: string;
      url: string;
      width: number;
    };
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
  