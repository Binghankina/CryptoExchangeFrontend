import store from "@/store";
import { isMarket } from "./index";

export const minAmount = () => {
  const market = isMarket();
  const markets = store.getters["public/getAllMarkets"];
  for (const i in markets) {
    if (markets[i].id === market) return Number(markets[i].min_amount);
  }
};
