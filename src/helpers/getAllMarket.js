import store from "@/store";
import { translation } from "@/helpers";

const t = (message, data) => translation("orders." + message, data);

export const getAllMarket = () => {
  let symbols = [t("all")];
  const tickers = store.getters["public/getAllMarkets"];
  tickers.forEach(ticker => symbols.push(ticker.name));

  return symbols;
};
