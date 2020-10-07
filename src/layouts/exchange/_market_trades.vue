<template>
  <div id="market_trade" class="ivu-card">
    <div class="ivu-card-head">{{ $t("exchange.card_head.market_trades") }}</div>
    <div class="ivu-card-body ex_table">
      <dt>
        <span class="text-left">{{ $t("table.price") }} ({{ isBid }})</span>
        <span class="text-right">{{ $t("table.amount") }} ({{ isAsk }})</span>
        <span class="text-right">{{ $t("table.time") }}</span>
      </dt>
      <dd v-if="noData" class="empty">
        <div class="text-center">No Data</div>
      </dd>
      <Spin size="large" fix v-if="!this.$store.state.exchange.trades.getted"/>
      <transition-group v-else class="trades" name="list" tag="dd" enter-active-class="animated fadeIn">
        <p v-for="data in this.$store.state.exchange.trades.array.slice(0, 100)" :key="data.id">
          <span :class="`text-left ${getTrendType(data.taker_type)}`">{{ getPrice(data.price) }}</span>
          <span class="text-right">{{ getAmount(data.volume) }}</span>
          <span class="text-right">{{ fixTime(data.created_at) }}</span>
        </p>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {
  isMarket,
  isBidSymbol,
  isAskSymbol,
  trendType,
  amountPrecision,
  pricePrecision
} from "@/helpers";

export default {
  name: "MarketTrades",
  data() {
    return {
      isBid: "",
      isAsk: ""
    };
  },
  created() {
    this.getBid();
    this.getAsk();
  },
  computed: {
    noData() {
      const { getted, array } = this.$store.state.exchange.trades;
      return getted && !array.length;
    }
  },
  methods: {
    getTrendType: taker_type => trendType(taker_type),
    getBid() {
      return (this.isBid = isBidSymbol().toUpperCase());
    },
    getAsk() {
      return (this.isAsk = isAskSymbol().toUpperCase());
    },
    getPrice(price) {
      return Number(price).toFixed(pricePrecision());
    },
    getAmount(amount) {
      return Number(amount).toFixed(amountPrecision());
    },
    fixTime(created_at) {
      const date = new Date(created_at);
      return (
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2)
      );
    }
  }
};
</script>
