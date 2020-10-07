<template>
  <div class="market-list" :class="className">
    <div class="menu-table">
      <ul>
        <li
          @click="changeSelect('Favorite')"
          :class="{ selected: isSelected.toLowerCase() === 'Favorite'.toLowerCase() }"
        >{{ $t("market_list.favorite") }}</li>
        <li
          v-for="(data, index) in [...$config.list_bid1, ...$config.list_bid2]"
          :key="index"
          @click="changeSelect(data)"
          :class="{ selected: isSelected === data }"
        >{{ $t("market_list.market", { market: data }) }}</li>
      </ul>
      <div class="search">
        <input v-model="search" :placeholder="$t('table.search')" maxlength="9" type="text" />
        <Icon type="ios-search-outline" />
      </div>
    </div>
    <div class="ex_table">
      <dt>
        <span
          v-for="(data, index) in sorts"
          :key="index"
          class="text-left"
          v-on:click="changeSort(data.sortBy)"
        >
          <span>{{ $t("table." + data.text) }}</span>
          <span class="sorter">
            <i
              class="ivu-icon ivu-icon-md-arrow-dropup"
              v-if="sortBy === data.sortBy && !sortReverse"
            ></i>
            <i
              class="ivu-icon ivu-icon-md-arrow-dropdown"
              v-if="sortBy === data.sortBy && sortReverse"
            ></i>
          </span>
        </span>
        <span class="text-right actions">{{ $t("table.action") }}</span>
      </dt>
      <dd>
        <p v-for="(data, index) in filteredTickers" :key="index" @click="MarketJoin(data.name)">
          <Icon
            type="ios-star-outline"
            v-if="!checkFavorite(data.name)"
            @click.stop="AddOrRemoveFavorite(data.name)"
          />
          <Icon type="ios-star" v-else @click.stop="AddOrRemoveFavorite(data.name)" />
          <span class="text-left">{{ data.name }}</span>
          <span class="text-left">{{ data.name_ccy }}</span>
          <span class="text-left last" :class="getTrend(data.price_change_percent)">
            {{ data.last }}
            <!-- <i
              class="price-usd"
            >≈ $ {{ getLastPriceUSD(data.base_unit + data.quote_unit, data.last) }}</i> -->
          </span>
          <span
            class="text-left"
            :class="getTrend(data.price_change_percent)"
          >{{ data.price_change_percent }}</span>
          <span class="text-left">{{ data.high }}</span>
          <span class="text-left">{{ data.low }}</span>
          <span
            class="text-left"
          >{{ Number(Number(data.volume).toFixed(pricePrecision())).toLocaleString() }}</span>
          <span class="text-right actions" @click.stop="MarketJoin(data.name)">
            <img src="@/assets/img/action_exchange.png" />
          </span>
        </p>
      </dd>
    </div>
  </div>
</template>

<script>
import {
  getTickerPriceUSD,
  pricePrecision,
  checkFavorite,
  AddOrRemoveFavorite
} from "@/helpers";
import _market_trend from "@/layouts/home/_market_trend.vue";

export default {
  props: ["className"],
  data: () => ({
    isSelected: "",
    search: "",
    sortBy: "volume",
    sortReverse: true,
    sorts: [
      { sortBy: "name", text: "pair" },
      { sortBy: "name_ccy", text: "coin" },
      { sortBy: "last", text: "last_price" },
      { sortBy: "change", text: "h_change" },
      { sortBy: "high", text: "h_high" },
      { sortBy: "low", text: "h_low" },
      { sortBy: "volume", text: "h_volume" }
    ]
  }),
  mounted() {
    this.isSelected = this.$config.list_bid1[0];
  },
  computed: {
    filteredTickers() {
      const all_tickers = this.$store.state.public.tickers;
      let tickers = Object.values(all_tickers);
      const Sorts = [
        "name",
        "name_ccy",
        "last",
        "change",
        "high",
        "low",
        "volume"
      ];

      for (var i in all_tickers) {
        all_tickers[i].name_ccy = this.getNameCurrencies(
          all_tickers[i].base_unit
        );
      }
      tickers = tickers.filter(ticker => {
        if (this.isSelected.toLowerCase() === "Favorite".toLowerCase()) {
          if (this.search) {
            return (
              (ticker["base_unit"]
                .toLowerCase()
                .includes(this.search.toLowerCase()) &&
                this.checkFavorite(ticker.name)) ||
              (ticker["name_ccy"]
                .toLowerCase()
                .includes(this.search.toLowerCase()) &&
                this.checkFavorite(ticker.name))
            );
          } else {
            return this.checkFavorite(ticker.name);
          }
        } else if (this.search) {
          return (
            (ticker["base_unit"]
              .toLowerCase()
              .includes(this.search.toLowerCase()) &&
              this.isSelected.toLowerCase() ===
                ticker["quote_unit"].toLowerCase()) ||
            (ticker["name_ccy"]
              .toLowerCase()
              .includes(this.search.toLowerCase()) &&
              this.isSelected.toLowerCase() ===
                ticker["quote_unit"].toLowerCase())
          );
        } else {
          return (
            this.isSelected.toLowerCase() === ticker["quote_unit"].toLowerCase()
          );
        }
      });
      if (!this.sortReverse) {
        for (const sortBy of Sorts) {
          if (this.sortBy === sortBy)
            return tickers.sort((l, h) => l[sortBy] > h[sortBy]);
        }
      } else {
        for (const sortBy of Sorts) {
          if (this.sortBy === sortBy)
            return tickers.sort((l, h) => l[sortBy] > h[sortBy]).reverse();
        }
      }
    }
  },
  methods: {
    pricePrecision: () => pricePrecision(),
    checkFavorite: ticker => checkFavorite(ticker),
    AddOrRemoveFavorite: ticker => AddOrRemoveFavorite(ticker),
    getLastPriceUSD: (ticker, last) => getTickerPriceUSD(ticker, last),
    getTrend(price_change_percent) {
      const chance = price_change_percent.split("%")[0];
      return chance >= 0 ? "text-up" : "text-down";
    },
    getNameCurrencies(currency) {
      const currencies = this.$store.getters["public/getAllCurrencies"];
      for (var i in currencies) {
        if (currencies[i].id === currency) {
          return currencies[i].name;
        }
      }
    },
    changeSort(sort) {
      this.sortBy = sort;
      this.sortReverse = !this.sortReverse;
    },
    changeSelect(symbol) {
      this.isSelected = symbol.toUpperCase();
    },
    MarketJoin($market) {
      const marketArray = $market.split("/");
      const market = marketArray.join("_");
      this.$store.commit("public/SYNC_EXCHANGE", market);
    }
  },
  components: {
    "market-trend": _market_trend
  }
};
</script>
