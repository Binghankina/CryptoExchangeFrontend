<template>
  <div id="order_book" class="ivu-card">
    <div class="ivu-card-head">
      <div class="ch">
        <div
          :class="{ change_book: true, active: whShow === 'all-ask' }"
          @click="changeShow('all-ask')"
        >
          <img src="@/assets/img/book_asks.svg">
        </div>
        <div
          :class="{ change_book: true, active: whShow === 'normal' }"
          @click="changeShow('normal')"
        >
          <img src="@/assets/img/book_avg.svg">
        </div>
        <div
          :class="{ change_book: true, active: whShow === 'all-bid' }"
          @click="changeShow('all-bid')"
        >
          <img src="@/assets/img/book_bids.svg">
        </div>
      </div>
    </div>
    <div class="ivu-card-body ex_table">
      <dt>
        <span class="text-left">{{ $t("table.price") }} ({{ isBid }})</span>
        <span class="text-right">{{ $t("table.amount") }} ({{ isAsk }})</span>
        <span class="text-right">{{ $t("table.sum") }} ({{ isBid }})</span>
      </dt>
      <dd :class="whShow">
        <div class="list ask">
          <Spin size="large" fix v-if="!$store.state.exchange.depth.getted"/>
          <asks-depth/>
        </div>
        <div class="ticker-book">
          <div class="now-price" :class="getLastTrend()">
            {{ getLastPrice() }}     
          </div>
        </div>
        <div class="list bid">
          <Spin size="large" fix v-if="!$store.state.exchange.depth.getted"/>
          <bids-depth/>
        </div>
      </dd>
    </div>
  </div>
</template>

<script>
import {
  isMarket,
  getMarketLastPrice,
  getMarketLastUSD,
  getTickerPriceUSD,
  getMarketPriceChange,
  isBidSymbol,
  isAskSymbol,
  trendType,
  amountPrecision,
  pricePrecision
} from "@/helpers";
import _asks_depth from "@/layouts/exchange/orderbook/_asks_depth.vue";
import _bids_depth from "@/layouts/exchange/orderbook/_bids_depth.vue";

export default {
  name: "OrderBook",
  data() {
    return {
      market: null,
      isBid: "",
      isAsk: "",
      whShow: "normal"
    };
  },
  mounted() {
    this.market = isMarket();
    this.isBid = isBidSymbol().toUpperCase();
    this.isAsk = isAskSymbol().toUpperCase();
  },
  methods: {
    getLastTrend: () => (getMarketPriceChange() >= 0 ? "text-up" : "text-down"),
    getLastPrice: () => getMarketLastPrice(),
    getPrice_USD: () => getMarketLastUSD(),
    getChange() {
      const ticker = this.$store.getters["public/getAllTickers"][name];
      if (ticker) return ticker.price_change_percent;
      else return "-.--%";
    },
    changeShow(wh) {
      this.whShow = wh;
    }
  },
  components: {
    "asks-depth": _asks_depth,
    "bids-depth": _bids_depth
  }
};
</script>