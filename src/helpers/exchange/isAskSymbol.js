import store from "@/store";

export const isAskSymbol = () => {
  const hash = store.state.public.market.split("_"); //ETH_USD
  return hash[0].toLowerCase(); //eth
};
