import store from "@/store";
import { isMarket, pricePrecision } from "./index";

export const getMarketLastPrice = () => {
  const ticker = store.getters["public/getAllTickers"][isMarket()];
  if (store.state.exchange.trades.array.length)
    return Number(store.state.exchange.trades.array[0].price).toFixed(
      pricePrecision()
    );
  else return Number(ticker.last).toFixed(pricePrecision());
};
