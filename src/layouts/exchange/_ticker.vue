<template>
  <div class="ticker-info">
    <Icon
      v-if="!isHideMarketList"
      @click="hideMarketList()"
      type="ios-arrow-round-back"
    />
    <Icon
      v-else
      @click="hideMarketList()"
      type="ios-arrow-round-forward"
    />
    <span class="ticker-name">{{ isAsk }}/{{ isBid }}</span>
    <div class="ticker-status">
      <div class="price">
        <span class="now-price" :class="getLastTrend" v-text="getLastPrice"/>
      </div>
      <dl class="change">
        <dt v-text="translation('status.change')"/>
        <dt class="value" :class="getLastTrend" v-text="getChange"/>
      </dl>
      <dl class="high">
        <dt v-text="translation('status.h_high')"/>
        <dt class="value" v-text="getHighPrice"/>
      </dl>
      <dl class="low">
        <dt v-text="translation('status.h_low')"/>
        <dt class="value" v-text="getLowPrice"/>
      </dl>
      <dl class="volume">
        <dt v-text="translation('status.h_volume')"/>
        <dt class="value" v-text="getVolume"/>
      </dl>
    </div>
  </div>
</template>

<script>
import {
  isMarket,
  getMarketLastPrice,
  getMarketLastUSD,
  getMarketPriceChange,
  getMarketLowPrice,
  getOverrides,
  getStudiesOverrides,
  amountPrecision,
  pricePrecision,
  isBidSymbol,
  isAskSymbol,
  translation
} from "@/helpers";
import _market_list from "@/layouts/exchange/_market_list.vue";

export default {
  name: "ticker",
  data() {
    return {
      isAsk: null,
      isBid: null,
      isHideMarketList: false
    };
  },
  created() {
    this.isAsk = isAskSymbol().toUpperCase();
    this.isBid = isBidSymbol().toUpperCase();
  },
  computed: {
    getLastTrend: () => (getMarketPriceChange() >= 0 ? "text-up" : "text-down"),
    getChange() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return ticker.price_change_percent;
    },
    getLastPrice: () => getMarketLastPrice(),
    getPrice_USD: () => getMarketLastUSD(),
    getHighPrice() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return getMarketLastPrice() > Number(ticker.high)
        ? getMarketLastPrice()
        : Number(ticker.high).toFixed(pricePrecision());
    },
    getLowPrice() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return getMarketLastPrice() < Number(ticker.low)
        ? getMarketLastPrice()
        : Number(ticker.low).toFixed(pricePrecision());
    },
    getVolume() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return (
        Number(Number(ticker.volume).toFixed(pricePrecision())).toLocaleString() +
        " " +
        isBidSymbol().toUpperCase()
      );
    }
  },
  methods: {
    hideMarketList() {
      this.isHideMarketList = !this.isHideMarketList;
      this.$EventBus.$emit("hideMarketList", this.isHideMarketList);
    },
    changeTheme(theme) {
      this.$store.state.exchange.theme = theme;
      localStorage.setItem("exchangeTheme", theme);

      const n_theme = theme === "night" ? "light" : "dark";
      this.$EventBus.$emit("onChangeThemes", n_theme);
      /** 
        Change Themes on tradingview
      **/
      let tvWidget = window.tvWidget;
      if (theme == "light") {
        tvWidget.applyOverrides(getOverrides("light"));
        tvWidget.applyStudiesOverrides(getStudiesOverrides("light"));
        tvWidget.addCustomCSSFile("/charting_library/static/light.css");
      } else {
        tvWidget.applyOverrides(getOverrides("night"));
        tvWidget.applyStudiesOverrides(getStudiesOverrides("night"));
        tvWidget.addCustomCSSFile("/charting_library/static/night.css");
      }
    },
    translation: (message, data = {}) =>
      translation("exchange." + message, data)
  },
  components: {
    "market-list": _market_list
  }
};
</script>
