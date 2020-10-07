<template>
  <div id="asks_entry">
    <div class="first_tb">
      <span class="title" v-text="translation('entry.sell', { currency: isAsk })"/>
      <span
        v-for="(data, index) in findAsk"
        :key="index"
        class="balance"
      >{{ $t('table.available') }}: {{ (data.balance*1).toFixed(8) }} {{ isAsk }}</span>
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
        <label growing-ignore="true" :class="{ active: onFocusPrice }">
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
      class="submit bg-sell"
      :disabled="disabled_button"
      @click="createOrder('sell')"
      v-text="translation('entry.sell')"
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
  translation,
  inputOnlyNumber
} from "@/helpers";
import Mixins from "./helpers"

export default {
  mixins: [Mixins],
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
        this.AmountError = true; //
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
