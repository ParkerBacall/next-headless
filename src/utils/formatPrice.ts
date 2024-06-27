export const formatPrice = (price: string) =>
    Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(parseInt(price, 10));