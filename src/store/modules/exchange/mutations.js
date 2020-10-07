import {
  runNotice,
  isMarket,
  translation,
  isAskSymbol,
  isBidSymbol
} from "@/helpers";
import config from "@/config";
import { EventBus } from "@/main.js";

export default {
  ON_CANCELED_ORDER: () =>
    runNotice("success", translation("message.order.canceled")),
  ON_PLACED_ORDER: () =>
    runNotice("success", translation("message.order.created")),
  CHANGE_MINE_CONTROL(state, type) {
    state.mine_control.type = type;
    state.array = [];
  },
  ADD_MINE_ORDERS(state, payload) {
    state.mine_control.array_orders = payload;
    state.mine_control.loading = false;
  },
  ADD_MINE_TRADES(state, payload) {
    state.mine_control.array_trades = payload;
    state.mine_control.loading = false;
  },
  ADD_TRADE(state, payload) {
    let market = isMarket();
    state.trades.array.splice(99, 1);
    var data = payload[`${market}.trades`].trades[0];
    const trade = {
      created_at: data["date"] * 1000,
      id: data["tid"],
      price: data["price"],
      taker_type: data["taker_type"],
      volume: data["amount"]
    };
    state.trades.array.unshift(trade);
    document.title = `${data["price"]} - ${(
      isAskSymbol() +
      "/" +
      isBidSymbol()
    ).toUpperCase()} - ${config.nameEX}`;
  },
  UPDATE_DEPTH(state, payload) {
    const market = isMarket();
    state.depth["asks"].forEach(row => {
      state.old_depth["asks"][row[0]] = row[1];
    });
    state.depth["bids"].forEach(row => {
      state.old_depth["bids"][row[0]] = row[1];
    });
    state.depth = payload[`${market}.update`];
    state.depth.getted = true;
    EventBus.$emit("UpdateDepth", state.depth);
  },
  removeItem(state, order) {
    const index = state.mine_control.array_orders.findIndex(
      e => e.id === order.id
    );
    if (index >= 0) state.mine_control.array_orders.splice(index, 1);
  },
  addOrUpdateItem_Order(state, payload) {
    const index = state.mine_control.array_orders.findIndex(
      e => e.id === payload.id
    );
    if (index >= 0) state.mine_control.array_orders[index] = payload;
    else {
      state.mine_control.array_orders.splice(99, 1);
      state.mine_control.array_orders.unshift(payload);
    }
  },
  addOrUpdateItem_Trade(state, payload) {
    state.mine_control.array_trades.splice(99, 1);
    state.mine_control.array_trades.unshift(payload);
  },
  SET_LOADING(state) {
    state.mine_control.loading = true;
  },
  MARKET_TRADES_HISTORY: (state, payload) => {
    state.trades.array = payload;
    state.trades.getted = true;
  },
  MARKET_DEPTH(state, payload) {
    state.depth.asks = payload.asks.reverse();
    state.depth.bids = payload.bids;
    let fake_bids = [];
    let fake_asks = [];
    const length_bids = payload.bids.length < 50 ? payload.bids.length : 50;
    const length_ask = payload.asks.length < 50 ? payload.asks.length : 50;
    for (let x = 0; x < 30 - length_bids; x++) {
      fake_bids.push({});
    }
    for (let i = 0; i < 30 - length_ask; i++) {
      fake_asks.push({});
    }
    state.depth.fake_asks = fake_asks;
    state.depth.fake_bids = fake_bids;
    state.depth.getted = true;
    EventBus.$emit("UpdateDepth", payload);
  },
  REMOVE_DEPTH(state) {
    state.depth.getted = false;
    state.depth.asks = [];
    state.depth.bids = [];
    const fake_data = [];
    for (var i = 0; i < 30; i++) {
      fake_data.push({});
    }
    state.depth.fake_asks = fake_data;
    state.depth.fake_bids = fake_data;
  },
  REMOVE_TRADES_HISTORY(state) {
    state.trades.getted = false;
    state.trades.array = [];
  }
};
