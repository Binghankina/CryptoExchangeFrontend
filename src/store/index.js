import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import publicModule from "./modules/public";
import exchange from "./modules/exchange";
import websocket from "./modules/websocket";
import wsPlugin from "./wsPlugin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    public: publicModule,
    websocket,
    exchange
  },
  plugins: [wsPlugin()]
});
