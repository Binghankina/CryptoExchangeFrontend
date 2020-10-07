<template>
  <div id="main_chart" class="ivu-card">
    <div class="ivu-card-head">
      {{ $t("exchange.card_head.chart") }}
      <div class="switch">
        <button
          :class="{ selected: whChart === 'tradingview' }"
          v-on:click="whChart = 'tradingview'"
        >{{ $t("exchange.card_head.candle") }}</button>
        <button :class="{ selected: whChart === 'depth' }" v-on:click="whChart = 'depth'">{{ $t("exchange.card_head.depth") }}</button>
      </div>
    </div>
    <div class="ivu-card-body">
      <trading-view :showing="whChart === 'tradingview'"/>
      <depth-chart :showing="whChart === 'depth'"/>
      <div class="tv-mask" :class="{ show: isShowing }"></div>
    </div>
  </div>
</template>

<script>
import _tradingview from "@/layouts/exchange/chart/_tradingview.vue";
import _depth from "@/layouts/exchange/chart/_depth.vue";

export default {
  name: "MainChart",
  data: () => ({
    isShowing: false,
    whChart: "tradingview"
  }),
  mounted() {
    this.$EventBus.$on(
      "MarketListShowing",
      showing => (this.isShowing = showing)
    );
  },
  components: {
    "trading-view": _tradingview,
    "depth-chart": _depth
  }
};
</script>
