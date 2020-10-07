const buyType = ["buy", "bid"];
export const trendType = taker_type =>
  buyType.includes(taker_type) ? "text-up" : "text-down";
