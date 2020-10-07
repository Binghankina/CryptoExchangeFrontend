<template>
  <div class="order-main">
    <div class="order-head" v-text="$t('orders.transaction.title')"/>
    <div class="order-body">
      <div class="select">
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.market") }}:</label>
          <div class="form-control">
            <AutoComplete
              :value="market"
              :data="getAllMarket"
              style="width:115px"
              icon="ios-arrow-down"
              v-model="input_market"
              :filter-method="filterMethod"
              @on-focus="market_InputFocus"
              @on-blur="market_InputBlur"
              @on-change="input_changed = true"
              @on-select="($value) => market = $value"
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
              @on-focus="($event) => $event.target.readOnly = true"
              @on-select="($value) => type = $value"
            />
          </div>
        </div>
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.date") }}:</label>
          <div class="form-control datepicker">
            <date-picker
              type="daterange"
              :start-date="new Date()"
              placement="bottom-start"
              :placeholder="[$t('table.start_date'), $t('table.end_date')]"
              style="width: 285px"
              @on-change="($value) => time = $value"
              readonly
            />
          </div>
        </div>
        <!---->
        <div class="form-row">
          <div class="form-control">
            <button type="submit" @click="getData()">{{$t('table.query')}}</button>
          </div>
        </div>
        <!---->
      </div>
      <!---->
      <div class="table-content">
        <dt>
          <span v-text="$t('table.date')"/>
          <span v-text="$t('table.pair')"/>
          <span v-text="$t('table.type')"/>
          <span v-text="$t('table.price')"/>
          <span v-text="$t('table.amount')"/>
          <span v-text="$t('table.total')"/>
        </dt>
        <dd :class="{ empty: !trades.data.length }">
          <p v-if="!trades.data.length">
            <span v-text="$t('orders.transaction.empty')"/>
          </p>
          <p v-for="(data, index) in trades.data" :key="index" :removing="!!data.removing">
            <span v-text="getDate(data.created_at)"/>
            <span v-text="$store.getters['public/getAllTickers'][data.market].name"/>
            <span
              :class="trendType(data.side)"
              v-text="$t('orders.type.'+data.side)" 
            />
            <span v-text="data.price"/>
            <span v-text="data.volume"/>
            <span v-text="data.volume * data.price"/>
          </p>
        </dd>
      </div>
      <!---->
      <Page
        :total="trades.max"
        :page-size="20"
        :current="trades.page"
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
import picker from "@/components/custom/datepicker";
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
    trades: {
      data: [],
      page: 1,
      max: 0
    },
    time: ["", ""]
  }),
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
        type: this.vaildType(this.type),
        time_from: !!this.time[0]
          ? new Date(this.time[0]).getTime() / 1000
          : "",
        time_to: !!this.time[1] ? new Date(this.time[1]).getTime() / 1000 : "",
        limit: "20",
        page: $page || 1
      };
      new ApiClient("trade")
        .get("market/trades", payload)
        .then(response => {
          this.trades.data = response.data;
          this.trades.max = Number(response.headers.total);
          this.loading = false;
        })
        .catch(error => error);
    }
  },
  mounted() {
    this.getAllMarket = getAllMarket();
    this.getTradeType = getTradeType();
    this.getData();
  },
  components: {
    "date-picker": picker
  }
};
</script>
