import store from "@/store";
import { getTickerBidSymbol } from "./index";

export const getTickerPriceUSD = (TICKER, PRICE) => {
  const GLOBAL_PRICE = store.getters["public/getGlobalPrice"];
  const TICKERS = store.getters["public/getAllTickers"];
  const allToCheck = ["usd", "usdt", "btc", "eth", "ltc", "xrp"];
  const isBid = getTickerBidSymbol(TICKER);
  if (isBid === "usd") {
    return (PRICE * 1).toFixed(2);
  } else if (isBid === "usdt") {
    return (PRICE * GLOBAL_PRICE["USDT"].USD).toFixed(2);
  }
  for (let i in allToCheck) {
    if (TICKERS[isBid + allToCheck[i]]) {
      const TICKER_BID = TICKERS[isBid + allToCheck[i]];
      return (
        PRICE *
        TICKER_BID.last *
        GLOBAL_PRICE[allToCheck[i].toUpperCase()].USD
      ).toFixed(2);
    }
  }
};
