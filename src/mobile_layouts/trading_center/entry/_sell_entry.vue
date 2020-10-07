<template>
  <div class="left-part-div">
    <p class="title-p" v-text="translation('entry.sell', { currency: isAsk })"></p>
    <p class="title-p" v-for="(data, index) in findAsk"
      :key="index">{{ $t('table.available') }}: {{ (data.balance*1).toFixed(8) }} {{ isAsk }}</p>
    <label growing-ignore="true" :class="{ active: onFocusPrice }">
      <input
        name="price"
        @blur="onFocusPrice = false"
        @input="onPriceInput"
        @focus="onPriceInput"
        v-model="price"
        autocomplete="off"
        maxlength="14"
        :placeholder="$t('exchange.entry.price')"
        type="text"
      >
    </label>
    <label growing-ignore="true" :class="{ active: onFocusPrice }">
      <input
        name="amount"
        @blur="onFocusAmount = false"
        @input="onAmountInput"
        @focus="onAmountInput"
        v-model="amount"
        autocomplete="off"
        maxlength="14"
        :placeholder="$t('exchange.entry.amount')"
        type="text"
      >
    </label>
    <p class="percentage-p">
      <checker v-model="sSellSelectPercentage" default-item-class="checker" selected-item-class="checker-selected">
        <checker-item value="0.25">25%</checker-item>
        <checker-item value="0.5">50%</checker-item>
        <checker-item value="0.75">75%</checker-item>
        <checker-item value="1">100%</checker-item>
      </checker>
    </p>
    <p class="max-2-p">
      <span class="title-span">{{ $t('table.total') }}</span>
      <span class="num-span">{{ getTotal }} {{ isBid }}</span>
    </p>
    <button class="button sell" :disabled="disabled_button" @click="createOrder('sell')" v-click-effect>{{ $t('orders.type.sell') }}</button>
  </div>
</template>

<script>
import {
  isMarket,
  pricePrecision,
  amountPrecision,
  isAskSymbol,
  isBidSymbol,
  getMarketLastPrice,
  getTickerPriceUSD,
  minAmount,
  translation,
  inputOnlyNumber
} from "@/helpers";
import Mixins from "./helpers"
import { Checker, CheckerItem } from 'vux'
export default {
  mixins: [Mixins],
  components: {
    Checker, CheckerItem
  },
  data () {
    return {
      sSellSelectPercentage: ''
    }
  },
  watch: {
    sSellSelectPercentage (n, o) {
      this.setAmount(n)
    }
  },
  methods: {
    balance() {
      const balances = this.$store.getters["user/getBalance"];
      for (var i in balances) {
        if (balances[i].currency.toUpperCase() === this.isAsk) {
          return balances[i].balance;
        }
      }
    },
    setAmount(chance) {
      if (chance === 1) {
        this.amount = this.balance();
        this.onlyNumberAmount();
      } else {
        this.amount = (this.balance() * chance).toFixed(amountPrecision());
      }
    },

    onPriceInput(focus = true) {
      const lastPrice = getMarketLastPrice() >= 0 ? getMarketLastPrice() : 0;
      this.onFocusPrice = focus;
    },
    onAmountInput(focus = true) {
      this.onFocusAmount = focus;
      if (this.amount === "") {
        this.AmountError = false;
      } else if (this.amount < minAmount()) {
        this.AmountError = true; //Amount Nhỏ quá :(
      } else {
        this.AmountError = false;
      }
      if (this.amount * 1 > this.balance()) {
        this.amount = this.balance();
      }
    }
  }
};
</script>
<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.left-part-div
  position: relative
  width: 46%
  margin: 0 2%
  float: left
  font-size: px2rem(12px)
  line-height: px2rem(20px)
  span
    font-size: px2rem(12px)
  .title-p
    margin-top: px2rem(10px)
  .remaining-p
    margin-top: px2rem(10px)
    font-size: px2rem(10px)
    color: #ccc
  .remaining-num-p
    font-size: px2rem(10px)
  input
    margin-top: px2rem(8px)
    width: 90%
    outline: none
    padding: px2rem(4px) px2rem(10px)
    border: 1px solid #eee
  .max-1-p
    margin-top: px2rem(8px)
  .percentage-p
    margin-top: px2rem(10px)
    color: #888
    .checker
      font-size: px2rem(12px)
      text-align: center
      width: 21%
      border: 1px solid #ececec
    .checker-selected
      background-color: #43578c
      color: #fff
      border: 1px solid #43578c
  .max-2-p, .price-p
    margin-top: px2rem(16px)
    overflow: auto
    .title-span
      color: #888
      float: left
    .num-span
      float: right
  .button
    position: absolute
    left: 50%
    margin-left: px2rem(-50px)
    width: px2rem(100px)
    height: px2rem(40px)
    border: none
    border-radius: px2rem(10px)
    margin-top: px2rem(10px)
    color: #fff
    font-size: px2rem(16px)
  .buy
    background-color: #0bad48
  .sell
    background-color: #ff4622
</style>
