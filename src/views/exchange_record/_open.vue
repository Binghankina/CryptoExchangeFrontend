<template>
  <div class="order-main">
    <div
class="order-head" v-text="$t('orders.open.title')"
/>
    <div class="order-body">
      <div class="select">
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.market") }}:</label>
          <div class="form-control">
            <AutoComplete
              v-model="input_market"
              :value="market"
              :data="getAllMarket"
              style="width:115px"
              icon="ios-arrow-down"
              :filter-method="filterMethod"
              @on-focus="market_InputFocus"
              @on-blur="market_InputBlur"
              @on-change="input_changed = true"
              @on-select="
                $value => {
                  market = $value;
                  getData();
                }
              "
            />
          </div>
        </div>
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.type") }}:</label>
          <div class="form-control">
            <AutoComplete
              :value="type"
              :data="getTradeType"
              style="width:115px"
              icon="ios-arrow-down"
              @on-focus="$event => ($event.target.readOnly = true)"
              @on-select="
                $value => {
                  type = $value;
                  getData();
                }
              "
            />
          </div>
        </div>
        <!---->
      </div>
      <!---->
      <div class="table-content">
        <dt>
          <span v-text="$t('table.date')" />
          <span v-text="$t('table.pair')" />
          <span v-text="$t('table.type')" />
          <span v-text="$t('table.price')" />
          <span v-text="$t('table.amount')" />
          <span v-text="$t('table.executed')" />
          <span v-text="$t('table.unexecuted')" />
          <span
class="text-right action" v-text="$t('table.action')"
/>
        </dt>
        <dd :class="{ empty: !orders.data.length }">
          <p v-if="!orders.data.length">
            <span v-text="$t('orders.open.empty')" />
          </p>
          <p
            v-for="(data, index) in orders.data"
            :key="index"
            :removing="!!data.removing"
          >
            <span v-text="getDate(data.created_at)" />
            <span
              v-text="$store.getters['public/getAllTickers'][data.market].name"
            />
            <span
              :class="trendType(data.side)"
              v-text="$t('orders.type.'+data.side)" 
            />
            <span v-text="data.price" />
            <span v-text="data.origin_volume" />
            <span v-text="data.executed_volume" />
            <span v-text="data.remaining_volume" />
            <span class="text-right action">
              <Icon
                v-if="data.state === 'wait'"
                type="ios-close"
                @click="CloseOrder(data.id)"
              />
            </span>
          </p>
        </dd>
      </div>
      <!---->
      <Page
        :total="orders.max"
        :page-size="20"
        :current="orders.page"
        size="small"
        @on-change="getData"
      />
    </div>
  </div>
</template>

<script>
import {
  getDate,
  getTickerID,
  getAllMarket,
  getTradeType,
  translation,
  trendType
} from "@/helpers";
import { setTimeout } from "timers";

export default {
  data: () => ({
    market: translation("orders.all"),
    input_market: translation("orders.all"),
    input_changed: false,
    type: translation("orders.all"),
    getAllMarket: [],
    getTradeType: [],
    loading: false,
    orders: {
      data: [],
      page: 1,
      max: 0
    }
  }),
  mounted() {
    this.getAllMarket = getAllMarket();
    this.getTradeType = getTradeType();
    this.getData();
    this.$EventBus.$on("CANCEL_ORDER", id => {
      for (let i in this.orders.data) {
        if (this.orders.data[i].id === id) {
          this.orders.data[i].removing = true;
          this.orders.max--;
          setTimeout(() => {
            delete this.orders.data[i];
            this.orders.data.splice(i, 1);
          }, 500);
        }
      }
    });
  },
  methods: {
    trendType: type => trendType(type),
    getDate: date => getDate(date, true),
    market_InputFocus($event) {
      $event.target.select();
      this.input_changed = false;
    },
    market_InputBlur($event) {
      $event.target.blur();
      this.input_market = this.market;
      this.input_changed = false;
    },
    filterMethod(value, option) {
      if (!this.input_changed) return true;
      return option.toUpperCase().includes(value.toUpperCase());
    },
    vaildMarket(market) {
      if (market === "All" || market === "全部") {
        return "";
      } else {
        return getTickerID(market).toLowerCase();
      }
    },
    vaildType(type) {
      if (type === "All" || type === "全部") {
        return "";
      } else if (type === "Buy" || type === "买入") {
        return "buy";
      } else {
        return "sell";
      }
    },
    getData($page = null) {
      this.loading = true;
      const payload = {
        market: this.vaildMarket(this.market),
        state: "wait",
        limit: "20",
        type: this.vaildType(this.type),
        page: $page || 1
      };
      new ApiClient("trade")
        .get("market/orders", payload)
        .then(response => {
          this.orders.data = response.data;
          this.orders.max = Number(response.headers.total);
          this.loading = false;
        })
        .catch(error => error);
    },
    CloseOrder(id) {
      this.$store.commit("exchange/CANCEL_ORDER", id);
    }
  }
};
</script>
