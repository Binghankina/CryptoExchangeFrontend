export default {
  currencies: [],
  markets: [],
  tickers: {},
  sparklines: {},
  favorites: localStorage.getItem("favorites") || [],
  path: null,
  market: localStorage.getItem("SYMBOLS_HASH") || config.default_market(),
  global_price: {}
};
