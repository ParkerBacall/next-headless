export const formatPrice = (price: string | number) =>
    Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(parseInt(price.toString(), 10));