export default {
  getAllMarkets: state => state.markets,
  getAllSparkline: state => state.sparklines,
  getAllTickers: state => state.tickers,
  getAllCurrencies: state => state.currencies,
  getAllFavorites: state => state.favorites,
  getGlobalPrice: state => state.global_price
};
