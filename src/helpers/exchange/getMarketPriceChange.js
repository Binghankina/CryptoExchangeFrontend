import store from "@/store";
import { isMarket } from "./index";

export const getMarketPriceChange = () => {
  const ticker = store.getters["public/getAllTickers"][isMarket()];
  if (ticker) {
    let change = ticker.price_change_percent;
    let payload = change.replace("%", "") * 1;
    return payload;
  } else return 0;
};
