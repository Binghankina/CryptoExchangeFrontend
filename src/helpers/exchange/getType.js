const buyType = ["buy", "bid"];
export const getType = type => (buyType.includes(type) ? "Buy" : "Sell");
