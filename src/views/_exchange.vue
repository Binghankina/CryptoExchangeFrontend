<template>
  <Content class="page-exchange">
    <div class="before-layouts" :class="{ hide: isHideMarketList }">
      <market-list/>
    </div>
    <div class="left" :class="{ showMore: isHideMarketList }">
      <ticker-status :key="`a-${identifier}`"/>
      <main-chart :key="`b-${identifier}`"/>
      <mine-control :key="`c-${identifier}`"/>
    </div>
    <div class="right">
      <div id="global_list">
        <order-book :key="`d-${identifier}`"/>
        <market-trades :key="`e-${identifier}`"/>
      </div>
      <order-entry :key="`f-${identifier}`"/>
    </div>
  </Content>
</template>

<script>
import store from "@/store";
import {
  isMarket,
  isAskSymbol,
  isBidSymbol,
  getMarketLastPrice
} from "@/helpers";
import _ticker from "@/layouts/exchange/_ticker.vue";
import _market_list from "@/layouts/exchange/_market_list.vue";
import _main_chart from "@/layouts/exchange/_main_chart.vue";
import _mine_control from "@/layouts/exchange/_mine_control.vue";
import _order_book from "@/layouts/exchange/_order_book.vue";
import _market_trades from "@/layouts/exchange/_market_trades.vue";
import _order_entry from "@/layouts/exchange/_order_entry.vue";

export default {
  name: "Exchange",
  components: {
    "market-list": _market_list,
    "ticker-status": _ticker,
    "main-chart": _main_chart,
    "mine-control": _mine_control,
    "order-book": _order_book,
    "market-trades": _market_trades,
    "order-entry": _order_entry
  },
  data: () => ({
    isHideMarketList: false,
    checked: false,
    identifier: 0
  }),
  beforeCreate() {
    this.$store.dispatch("exchange/getMarketDepth");
    this.$store.dispatch("exchange/getMarketTrades");
  },
  mounted() {
    this.onLoad();
    this.$EventBus.$on("reRenderExchange", market => this.forceRerender(market))
    this.$EventBus.$on("hideMarketList", type => this.isHideMarketList = type);
  },
  destroyed() {
    this.removeLoad(isMarket());
  },
  methods: {
    async forceRerender(market) {
      this.identifier += 1;
      await this.removeLoad(market);
      await this.LoadData();
      await this.onLoad();
    },
    LoadData() {
      this.$store.dispatch("exchange/getMarketDepth");
      this.$store.dispatch("exchange/getMarketTrades");
    },
    removeLoad(market) {
      const channel = market;
      store.dispatch("websocket/unsubscribe", channel);
    },
    onLoad() {
      this.setTitle();
      const channel = isMarket();
      store.dispatch("websocket/subscribe", channel);
    },
    setTitle() {
      document.title = `${getMarketLastPrice()} - ${(
        isAskSymbol() +
        "/" +
        isBidSymbol()
      ).toUpperCase()} - ${this.$config.nameEX}`;
    }
  }
};
</script>
