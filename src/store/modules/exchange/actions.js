import { isMarket } from "@/helpers";

export default {
  async CANCEL_ORDER({ commit }, id) {
    try {
      await new ApiClient("trade").post(`/market/orders/${id}/cancel`);
      commit("ON_CANCELED_ORDER");
    } catch (error) {
      return error;
    }
  },
  async getOrdersOpen({ commit }) {
    commit("SET_LOADING");
    try {
      const { data } = await new ApiClient("trade").get("market/orders", {
        market: isMarket(),
        state: "wait"
      });
      commit("ADD_MINE_ORDERS", data);
    } catch (error) {
      return error;
    }
  },
  async getOrdersHistory({ commit }) {
    commit("SET_LOADING");
    try {
      const { data } = await new ApiClient("trade").get("market/orders", {
        market: isMarket()
      });
      commit("ADD_MINE_ORDERS", data);
    } catch (error) {
      return error;
    }
  },
  async getTradesHistory({ commit }) {
    commit("SET_LOADING");
    try {
      const { data } = await new ApiClient("trade").get("market/trades", {
        market: isMarket()
      });
      commit("ADD_MINE_TRADES", data);
    } catch (error) {
      return error;
    }
  },
  async getMarketDepth({ commit }) {
    commit("REMOVE_DEPTH");
    try {
      const url = "public/markets/" + isMarket() + "/depth";
      const { data } = await new ApiClient("trade").get(url, { limit: 50 });
      commit("MARKET_DEPTH", data);
    } catch (error) {
      return error;
    }
  },
  async getMarketTrades({ commit }) {
    commit("REMOVE_TRADES_HISTORY");
    try {
      const url = "public/markets/" + isMarket() + "/trades";
      const { data } = await new ApiClient("trade").get(url, { limit: 100 });
      commit("MARKET_TRADES_HISTORY", data);
    } catch (error) {
      return error;
    }
  },
  async PlaceOrder({ commit }, payload) {
    try {
      await new ApiClient("trade").post("market/orders", payload);
      if (!window.stress) commit("ON_PLACED_ORDER");
    } catch (error) {
      return error;
    }
  },
  handling({ commit }, payload) {
    const market = isMarket();
    if (payload[market + ".update"]) {
      commit("UPDATE_DEPTH", payload);
    } else if (payload[market + ".trades"]) {
      commit("ADD_TRADE", payload);
    }
  },
  privateHandling({ state, commit }, payload) {
    const market = isMarket();
    const { trade, order } = payload;
    if (state.mine_control.loading) return;
    if (
      order &&
      order.market === market &&
      state.mine_control.type === "orders_open"
    ) {
      switch (order.state) {
        case "pending":
          return commit("addOrUpdateItem_Order", order);
        case "wait":
          return commit("addOrUpdateItem_Order", order);
        case "cancel":
          return commit("removeItem", order);
        case "done":
          return commit("removeItem", order);
      }
    } else if (
      order &&
      order.market === market &&
      state.mine_control.type === "history_orders"
    ) {
      commit("addOrUpdateItem_Order", order);
    } else if (
      trade &&
      trade.market === market &&
      state.mine_control.type === "history_trades"
    ) {
      commit("addOrUpdateItem_Trade", trade);
    }
  }
};
