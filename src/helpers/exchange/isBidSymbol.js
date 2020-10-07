import store from "@/store";

export const isBidSymbol = () => {
  const hash = store.state.public.market.split("_"); //ETH_USD
  return hash[1].toLowerCase(); //usd
};
