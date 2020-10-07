import store from "@/store";
import { isMarket } from "./index";

export const amountPrecision = () => {
  const market = isMarket();
  const all_market = store.state.public.markets;
  for (var i in all_market) {
    if (all_market[i].id === market) return all_market[i].amount_precision;
  }
};
