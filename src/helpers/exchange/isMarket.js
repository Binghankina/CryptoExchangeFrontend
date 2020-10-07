import store from "@/store";

export const isMarket = () => {
  const hash = store.state.public.market.split("_"); //ETH_USD
  return hash.join("").toLowerCase(); //ethusd
};
