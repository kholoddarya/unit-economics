export function useUnitEconomics() {
  const categories = computed(() =>
    wbData.rows.map((row) => ({
      label: row.parentCategory,
      value: row.parentCategory,
      // Для USelectMenu в Nuxt UI v4
      _id: row.parentCategory,
    })),
  );

  const calculate = (input: CalculationInput): CalculationResult => {
    const categoryData = wbData.rows.find(
      (row) => row.parentCategory === input.category,
    );
    const commissionRate = categoryData
      ? input.scheme === "fbw"
        ? categoryData.fbw
        : categoryData.fbs
      : 15;

    const revenue = input.price;
    const commission = revenue * (commissionRate / 100);
    const tax = revenue * (input.taxRate / 100);

    const totalExpenses =
      input.costPrice +
      commission +
      tax +
      input.logisticsCost +
      input.advertisingCost;
    const profit = revenue - totalExpenses;

    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const roi = input.costPrice > 0 ? (profit / input.costPrice) * 100 : 0;

    return {
      revenue,
      commission,
      tax,
      logistics: input.logisticsCost,
      advertising: input.advertisingCost,
      totalExpenses,
      profit,
      margin,
      roi,
      isProfitable: profit > 0,
    };
  };

  return {
    categories,
    calculate,
  };
}
