import { getMarketLastPrice, isMarket } from "./index";
import { getTickerPriceUSD } from "../index";

export const getMarketLastUSD = () =>
  getTickerPriceUSD(isMarket(), getMarketLastPrice());
