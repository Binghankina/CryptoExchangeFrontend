<template>
  <div class="left-part-div">
    <p class="title-p" v-text="translation('entry.buy', { currency: isAsk })"></p>
    <p class="title-p" v-for="(data, index) in findBid"
      :key="index">{{ $t('table.available') }}: {{ (data.balance*1).toFixed(8) }} {{ isBid }}</p>
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
      <checker v-model="sBuySelectPercentage" default-item-class="checker" selected-item-class="checker-selected">
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
    <button class="button buy" @click="createOrder('buy')" v-click-effect :disabled="disabled_button">{{ $t('orders.type.buy') }}</button>
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
  translation
} from "@/helpers";
import Mixins from "./helpers";
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker, CheckerItem
  },
  mixins: [Mixins],
  data () {
    return {
      sBuySelectPercentage: ''
    }
  },
  watch: {
    sBuySelectPercentage (n, o) {
      this.setAmount(n)
    }
  },
  methods: {
    balance() {
      const balances = this.$store.getters["user/getBalance"];
      for (var i in balances) {
        if (balances[i].currency.toUpperCase() === this.isBid) {
          return balances[i].balance;
        }
      }
    },
    setAmount(chance) {
      if (chance === 1) {
        if (this.price) {
          this.amount = this.balance() / this.price;
          this.onlyNumberAmount();
        } else {
          this.price = this.$store.state.exchange.depth["asks"]
            .slice(0, 30)
            .reverse()[0][0];
          this.amount = this.balance() / this.price;
          this.onlyNumberAmount();
        }
      } else {
        if (this.price) {
          this.amount = ((this.balance() * chance) / this.price).toFixed(
            pricePrecision()
          );
        } else {
          this.price = this.$store.state.exchange.depth["asks"]
            .slice(0, 30)
            .reverse()[0][0];
          this.amount = ((this.balance() * chance) / this.price).toFixed(
            pricePrecision()
          );
        }
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
      if (this.price != "") {
        if (this.amount * this.price > this.balance()) {
          const mamount = String(this.balance() / this.price).split(".");
          if (mamount.length > 1) {
            const ramount = mamount[1].slice(0, amountPrecision());
            this.amount = mamount[0] + "." + ramount;
          } else {
            this.amount = mamount[0];
          }
        }
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
