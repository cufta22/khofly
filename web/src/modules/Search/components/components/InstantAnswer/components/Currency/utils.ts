export const convertCurrency = (
  amount: number,
  from: string,
  to: string,
  rates: { [key in string]: number }
) => {
  // Check if converting from the same currency
  if (from === to) {
    return amount;
  }

  // Convert to USD first (assuming USD is the base unit)
  const usdAmount = amount / rates[from];

  // Then convert to target currency
  return parseFloat((usdAmount * rates[to]).toFixed(2));
};
