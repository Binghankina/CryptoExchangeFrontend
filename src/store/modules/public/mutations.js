import { isMarket } from "@/helpers";
import { EventBus } from "@/main";
import router from "@/router";

const mutations = {
  CURRENCIES: (state, payload) => (state.currencies = payload),
  GLOBAL_PRICE: (state, payload) => (state.global_price = payload),
  MARKETS: (state, payload) => (state.markets = payload),
  TICKERS: (state, payload) => (state.tickers = payload),
  SPARKLINES: (state, payload) => (state.sparklines = payload),
  SET_ROUTER: (state, payload) => (state.path = payload),
  SET_TITLE: (state, payload) => (document.title = payload),
  UPDATE_FAVORITES(state, payload) {
    const { favorites } = state;
    const index = favorites.indexOf(payload);

    if (index >= 0) state.favorites.splice(index, 1);
    else state.favorites.push(payload);

    localStorage.setItem("favorites", state.favorites);
  },
  SYNC_EXCHANGE(state, market) {
    if (isMarket() !== market) {
      localStorage.setItem("SYMBOLS_HASH", market);
      if (state.path === "/exchange" || state.path === "/m/tradingCenter"){
        EventBus.$emit("reRenderExchange", isMarket());
      } else if (state.path.indexOf('/m/') !== -1) {
        router.push("/m/tradingCenter");
      } else {
        router.push("/exchange");
      }
      state.market = market;
    }
  },
  RECAPTCHA_MODULE() {
    if (!$("script[recaptcha]").length) {
      $("head").append(
        `<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async recaptcha defer></script>`
      );
    }
  }
};

export default mutations;
