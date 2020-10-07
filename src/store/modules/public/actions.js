export default {
  handling({ commit }, payload) {
    if (payload["global.tickers"] != null) {
      commit("TICKERS", payload["global.tickers"]);
    }
  },
  async getTimeStamp() {
    try {
      await new ApiClient("trade").get("public/timestamp");
    } catch (error) {
      return error;
    }
  },
  async getGlobalPrice({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("public/globalprice");
      commit("GLOBAL_PRICE", data);
    } catch (error) {
      return error;
    }
  },
  async getMarkets({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("public/markets");
      commit("MARKETS", data);
    } catch (error) {
      return error;
    }
  },
  async getCurrencies({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("public/currencies");
      commit("CURRENCIES", data);
    } catch (error) {
      return error;
    }
  },
  async getTickers({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get(
        "public/markets/tickers"
      );
      commit("TICKERS", data);
    } catch (error) {
      return error;
    }
  },
  async getSparkLines({ commit }) {
    try {
      const { data } = await new ApiClient("trade").get("public/sparkline");
      commit("SPARKLINES", data);
    } catch (error) {
      return error;
    }
  },
  changeFavorites: ({ commit }, ticker) => commit("UPDATE_FAVORITES", ticker)
};
