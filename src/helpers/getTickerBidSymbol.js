import store from "@/store";

export const getTickerBidSymbol = ticker => {
  const tickers = store.getters["public/getAllTickers"];
  return tickers[ticker].quote_unit;
};
