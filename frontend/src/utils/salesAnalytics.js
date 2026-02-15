export const groupSalesByMonth = (sales) => {
  const result = {};

  sales.forEach((sale) => {
    const date = new Date(sale.createdAt);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!result[month]) {
      result[month] = {
        revenue: 0,
        quantity: 0,
      };
    }

    result[month].revenue += sale.quantity * sale.sale_price;
    result[month].quantity += sale.quantity;
  });

  return result;
};

export const groupSalesByProduct = (sales) => {
  const result = {};

  sales.forEach((sale) => {
    const name = sale.productId?.name || "Unknown";

    if (!result[name]) {
      result[name] = 0;
    }

    result[name] += sale.quantity * sale.sale_price;
  });

  return result;
};
