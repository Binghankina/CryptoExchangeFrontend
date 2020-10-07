<template>
  <div id="bids_entry">
    <div class="first_tb">
      <span class="title" v-text="translation('entry.buy', { currency: isAsk })"/>
      <span
        v-for="(data, index) in findBid"
        :key="index"
        class="balance"
      >{{ $t('table.available') }}: {{ (data.balance*1).toFixed(8) }} {{ isBid }}</span>
      <span
        v-if="!$store.getters['user/isLoggedIn']"
        class="balance"
      >{{ $t('table.available') }}: --</span>
    </div>
    <div class="price-box">
      <div class="no-tooltip">
        <span class="title" v-text="translation('entry.price')"/>
        <label growing-ignore="true" :class="{ active: onFocusPrice }">
          <input
            name="price"
            @blur="onFocusPrice = false"
            @input="onPriceInput"
            @focus="onPriceInput"
            v-model="price"
            autocomplete="off"
            maxlength="14"
            type="text"
          >
          <span class="currency" v-text="isBid"/>
        </label>
      </div>
    </div>

    <div class="price-box">
      <div class="no-tooltip">
        <span class="title" v-text="translation('entry.amount')"/>
        <label
          growing-ignore="true"
          :class="{ active: onFocusAmount && !AmountError, error: AmountError }"
        >
          <input
            name="amount"
            @blur="onFocusAmount = false"
            @input="onAmountInput"
            @focus="onAmountInput"
            v-model="amount"
            autocomplete="off"
            maxlength="14"
            type="text"
          >
          <span class="currency" v-text="isAsk"/>
        </label>
      </div>  
    </div>

    <div class="chance-box">
      <button v-on:click="setAmount(0.25)">25%</button>
      <button v-on:click="setAmount(0.50)">50%</button>
      <button v-on:click="setAmount(0.75)">75%</button>
      <button v-on:click="setAmount(1)">100%</button>
    </div>

    <div class="total">
      <em>{{ translation('entry.total') }}:</em>
      {{ getTotal }} {{ isBid }}
    </div>

    <Button
      class="submit bg-buy"
      :disabled="disabled_button"
      @click="createOrder('buy')"
      v-text="translation('entry.buy')"
    />
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

export default {
  mixins: [Mixins],
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
