<template>
  <ul class="feature-market" :class="className">
    <li
      v-for="(data, index) in $config.feature_market"
      :key="index"
      class="market"
      @click="MarketJoin(data)"
    >
      <span
        class="rate"
        :class="getTrend(getChange(NameToID(data)), 'bg')"
      >{{ getChange(NameToID(data)) }}</span>
      <h3 class="name">
        <span>{{ data }}</span>
        <i>{{ data.split("/")[1] }}</i>
      </h3>
      <p class="price">
        <span :class="getTrend(getChange(NameToID(data)), 'text')">{{ getLastPrice(NameToID(data)) }}</span>
        <i>≈ ${{ getLastPriceUSD(NameToID(data)) }}</i>
      </p>
      <p class="vol">
        <span>{{ $t("table.h_volume") }}</span>
        <i>{{ getVolume(NameToID(data)) }} {{ data.split("/")[1] }}</i>
      </p>
      <sparkline :data="getSparkline(NameToID(data))" v-if="getSparkline(NameToID(data))"/>
    </li>
  </ul>
</template>

<script>
import { getTickerPriceUSD, pricePrecision } from "@/helpers";
import sparkline from "@/components/home/sparkline.js";
import "@/assets/js/sparkline.min.js";

export default {
  props: ["className"],
  methods: {
    NameToID(name) {
      const nameArray = name.split("/");
      return nameArray.join("").toLowerCase();
    },
    getSparkline(ticker) {
      return this.$store.getters["public/getAllSparkline"][ticker];
    },
    getTicker(ticker) {
      return this.$store.getters["public/getAllTickers"][ticker];
    },
    getLastPrice(ticker) {
      return this.getTicker(ticker).last;
    },
    getLastPriceUSD(ticker) {
      return getTickerPriceUSD(ticker, this.getLastPrice(ticker));
    },
    getVolume(ticker) {
      return Number(
        Number(this.getTicker(ticker).volume).toFixed(pricePrecision())
      ).toLocaleString();
    },
    getTrend(price_change_percent, type) {
      const chance = price_change_percent.replace("%", "");
      if (type === "text") return chance >= 0 ? "text-up" : "text-down";
      else return chance >= 0 ? "bg-buy" : "bg-sell";
    },
    getChange(ticker) {
      return this.getTicker(ticker).price_change_percent;
    },
    MarketJoin(ticker) {
      const marketArray = ticker.split("/");
      const market = marketArray.join("_");
      //console.log(market);
      this.$store.commit("public/SYNC_EXCHANGE", market);
    }
  },
  components: {
    sparkline
  }
};
</script>