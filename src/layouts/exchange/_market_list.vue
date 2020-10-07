<template>
  <div id="market_list">
    <div class="input-box">
      <input v-model="search" :placeholder="$t('table.search')" maxlength="9" type="text" />
      <Icon type="ios-search-outline" />
    </div>
    <div class="markets">
      <div
        v-for="(data, index) in $config.list_bid1"
        :key="index"
        @click="changeSelect(data)"
        :class="{ selected: isSelected === data }"
        v-text="data"
      />
      <div class="dropdown-markets">
        <div
          class="name"
          @click="changeSelect(isSelectedDrop || isSelected === isSelectedDrop ? isSelectedDrop : $config.list_bid2[0], true)"
          :class="{ selected: isSelected === isSelectedDrop }"
          v-text="isSelectedDrop || $config.list_bid2[0]"
        />
        <Dropdown
          trigger="click"
          placement="bottom-end"
          @on-click="(name) => changeSelect(name, true)"
          @on-visible-change="dropdownShowing = !dropdownShowing"
        >
          <div :class="{ active: dropdownShowing }">
            <Icon type="md-arrow-dropdown" />
          </div>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(data, i) in $config.list_bid2" :key="i" :name="data">{{ data }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        class="favorites"
        @click="changeSelect('Favorite')"
        :class="{ selected: isSelected === 'Favorite'.toUpperCase() }"
      >
        <Icon type="ios-star" />
      </div>
    </div>
    <div class="ex_table table_sorter">
      <dt>
        <span
          v-for="(data, index) in sorts"
          :key="index"
          class="text-left"
          v-on:click="changeSort(data.name)"
        >
          <span class="market" v-text="$t('table.' + data.name)" />
          <span class="market sorter">
            <i
              class="ivu-icon ivu-icon-md-arrow-dropup"
              :class="{ active: sortBy === data.sortBy && !sortReverse }"
            ></i>
            <i
              class="ivu-icon ivu-icon-md-arrow-dropdown"
              :class="{ active: sortBy === data.sortBy && sortReverse }"
            ></i>
          </span>
        </span>
      </dt>
      <div class="list-item">
        <div
          v-for="(data, index) in filteredTickers"
          :key="index"
          v-on:click="MarketReload(data.name)"
          :class="{ selected: isActive(data.base_unit+data.quote_unit) }"
        >
          <div>
            <div>
              <span v-text="(data.base_unit + ' / ' + data.quote_unit).toUpperCase()" />
              <span v-text="data.last" />
            </div>
            <div>
              <span
                class="vol"
              >Vol: {{ Number(Number(data.volume).toFixed(pricePrecision())).toLocaleString() }}</span>
              <span
                :class="getTrend(data.price_change_percent)"
                v-text="data.price_change_percent"
              />
            </div>
          </div>
          <span class="favorite">
            <Icon
              type="ios-star-outline"
              v-if="!checkFavorite(data.name)"
              @click.stop="AddOrRemoveFavorite(data.name, $event)"
            />
            <Icon type="ios-star" v-else @click.stop="AddOrRemoveFavorite(data.name, $event)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isMarket,
  isAskSymbol,
  isBidSymbol,
  pricePrecision,
  checkFavorite,
  AddOrRemoveFavorite
} from "@/helpers";

export default {
  data: () => ({
    isAsk: null,
    isBid: null,
    isSelected: "",
    isSelectedDrop: "",
    showing: false,
    search: "",
    totalRepeat: 0,
    sortBy: "",
    sortReverse: false,
    dropdownShowing: false,
    sorts: [
      { name: "market", sortBy: "market" },
      { name: "price", sortBy: "last" },
      { name: "change", sortBy: "change" }
    ]
  }),
  created() {
    this.isAsk = isAskSymbol().toUpperCase();
    this.isBid = isBidSymbol().toUpperCase();
    this.isSelected = isBidSymbol().toUpperCase();
    if (this.$config["list_bid2"].includes(this.isBid))
      this.isSelectedDrop = this.isBid;
  },
  computed: {
    filteredTickers() {
      let tickers = Object.values(this.$store.state.public.tickers);
      const Sorts = {
        market: "name",
        price: "last",
        change: "price_change_percent",
        volume: "volume"
      };
      for (var i in tickers) {
        tickers[i].name_ccy = this.getNameCurrencies(tickers[i].base_unit);
      }
      tickers = tickers.filter(ticker => {
        if (this.isSelected.toLowerCase() === "Favorite".toLowerCase()) {
          if (this.search)
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
          else return this.checkFavorite(ticker.name);
        } else if (this.search != "")
          return (
            ticker["base_unit"]
              .toLowerCase()
              .includes(this.search.toLowerCase()) &&
            this.isSelected.toLowerCase() === ticker["quote_unit"].toLowerCase()
          );
        else
          return (
            this.isSelected.toLowerCase() === ticker["quote_unit"].toLowerCase()
          );
      });

      if (!this.sortReverse) {
        for (let i in Sorts) {
          if (this.sortBy === i)
            return tickers.sort((l, h) => l[Sorts[i]] > h[Sorts[i]]);
        }
      } else {
        for (let i in Sorts) {
          if (this.sortBy === i)
            return tickers.sort((l, h) => l[Sorts[i]] > h[Sorts[i]]).reverse();
        }
      }

      return tickers;
    }
  },
  methods: {
    checkFavorite: ticker => checkFavorite(ticker),
    AddOrRemoveFavorite: ticker => AddOrRemoveFavorite(ticker),
    pricePrecision: () => pricePrecision(),
    changeSort(sort) {
      if (this.totalRepeat >= 2) {
        this.totalRepeat = 0;
        this.sortBy = "";
        this.sortReverse = false;
      } else {
        if (this.sortBy === sort || this.totalRepeat === 0) {
          this.totalRepeat += 1;
        }
        this.sortBy = sort;
        this.sortReverse = !this.sortReverse;
      }
    },
    isActive: market => market === isMarket(),
    getNameCurrencies(name) {
      const { currencies } = this.$store.state.public;
      for (var i in currencies) {
        if (currencies[i].id === name.toLowerCase()) {
          return currencies[i].name;
        }
      }
    },
    changeSelect(symbol, drop = false) {
      this.isSelected = symbol.toUpperCase();
      if (drop) this.isSelectedDrop = symbol.toUpperCase();
    },
    getTrend(change) {
      change = change.replace("%", "");
      return change >= 0 ? "text-up" : "text-down";
    },
    onChangeShow() {
      const old = this.showing;
      this.showing = !old;
      this.$EventBus.$emit("MarketListShowing", !old);
    },
    classShow() {
      return this.showing ? "selected" : "unselected";
    },
    MarketReload($market) {
      const marketArray = $market.split("/");
      const market = marketArray.join("_");
      this.$store.commit("public/SYNC_EXCHANGE", market);
    }
  }
};
</script>
