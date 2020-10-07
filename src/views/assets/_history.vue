<template>
  <div class="assets-main history">
    <div class="assets-head"></div>
    <div class="assets-body">
      <div class="select">
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.coin") }}:</label>
          <div class="form-control">
            <AutoComplete
              :value="currency"
              :data="getAllCurrencies"
              style="width:115px"
              icon="ios-arrow-down"
              v-model="input_currency"
              :filter-method="filterMethod"
              @on-focus="currency_InputFocus"
              @on-blur="currency_InputBlur"
              @on-change="input_changed = true"
              @on-select="($value) => {
                currency = $value;
                input_currency = $value;
                input_changed = true;
                getData();
              }"
            />
          </div>
        </div>
        <!---->
        <div class="form-row">
          <label class="form-label">{{ $t("table.type") }}:</label>
          <div class="form-control">
            <AutoComplete
              :value="type"
              :data="[$t('action.deposit'), $t('action.withdrawal')]"
              style="width:135px"
              icon="ios-arrow-down"
              @on-focus="($event) => $event.target.readOnly = true"
              @on-select="($value) => {
                type = $value;
                getData();
              }"
            />
          </div>
        </div>
        <!---->
      </div>
      <div class="table-content">
        <dl class="head">
          <span class="status" v-text="$t('table.status')"/>
          <span class="coin" v-text="$t('table.coin')"/>
          <span class="amount" v-text="$t('table.amount')"/>
          <span class="date" v-text="$t('table.date')"/>
          <span class="infomation" v-text="$t('table.infomation')"/>
          <span class="action text-right" v-text="$t('table.action')"/>
        </dl>
        <dd :class="{ loading: loading, empty: !history.data.length }">
          <Spin size="large" fix v-if="loading"/>
          <dl v-if="!history.data.length" v-text="$t('table.u_not_have_any_transaction')"/>
          <dl
            v-for="(data, index) in history.data"
            :key="index"
            :class="{ selected: dropdown === index }"
          >
            <span
              class="status"
              v-if="checkCompleted(data.state) === 'done'"
              v-text="$t('assets.history.state.completed')"
            />
            <span
              class="status loading"
              v-else-if="checkCompleted(data.state) === 'wait'"
              v-text="$t('assets.history.state.processing', { confirmations: data.confirmations, min_confirmations: currencyArray(data.currency).min_confirmations })"
            />
            <span class="status" v-else>Failed</span>
            <span class="coin" v-text="data.currency.toUpperCase()"/>
            <span class="amount" v-text="Number(data.amount).toFixed(8)"/>
            <span class="date" v-text="getDate(data.created_at)"/>
            <span class="infomation">
              <div class="address">
                <span class="title">{{ $t("assets.address") }}:</span>
                <a
                  v-if="dropdown === index"
                  :href="currencyArray(data.currency).explorer_address.replace('#{address}', data.address)"
                  target="_blank"
                  v-text="data.address"
                />
                <span v-else v-text="data.address"/>
              </div>
              <div class="txid" :class="[dropdown === index ? 'show' : 'hide']">
                <span class="title">{{ $t("assets.txid") }}:</span>
                <a
                  :href="currencyArray(data.currency).explorer_transaction.replace('#{txid}', data.txid)"
                  target="_blank"
                  v-text="data.txid"
                />
              </div>
            </span>
            <span class="action text-right">
              <Icon
                type="ios-arrow-down"
                @click="() => {
                if (dropdown === index) dropdown = 'none';
                else dropdown = index;
              }"
              />
            </span>
          </dl>
        </dd>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, translation } from "@/helpers";
const t = (message, data) => translation(message, data);

export default {
  data: () => ({
    currency: t("orders.all"),
    type: t('action.deposit'),
    input_currency: t("orders.all"),
    input_changed: false,
    history: {
      data: [],
      page: 1,
      max: 0
    },
    dropdown: "none",
    loading: false
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getDate: date => getDate(date, true),
    currencyArray(currency) {
      const currencies = this.$store.getters["public/getAllCurrencies"];
      for (let i in currencies) {
        if (currencies[i].id === currency) return currencies[i];
      }
    },
    vaildCurrency(currency) {
      if (currency === "All" || currency === "全部") {
        return "";
      } else {
        return this.currency.toLowerCase();
      }
    },
    vaildSide(type) {
      if (type === "All" || type === "全部") {
        return "";
      } else if (type === "Deposits" || type === "充值") {
        return "deposits";
      } else {
        return "withdraws";
      }
    },
    getData($page = null) {
      this.loading = true;
      this.history.data = [];
      const payload = {
        currency: this.vaildCurrency(this.currency ),
        limit: 20,
        page: $page || 1
      };
      new ApiClient("trade")
        .get("account/"+this.vaildSide(this.type), payload)
        .then(response => {
          this.history.data = response.data;
          this.history.max = response.headers.total;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    currency_InputFocus($event) {
      $event.target.select();
      this.input_changed = false;
    },
    currency_InputBlur($event) {
      $event.target.blur();
      this.input_currency = this.market;
      this.input_changed = false;
    },
    filterMethod(value, option) {
      if (!this.input_changed) return true;
      return option.toUpperCase().includes(value.toUpperCase());
    },
    checkCompleted(state) {
      const doneValue = ["accepted", "skipped", "collected", "succeed"];
      const waitValue = ["submitted", "confirming"];
      if (doneValue.includes(state)) return "done";
      else if (waitValue.includes(state)) return "wait";
      else return "fail";
    }
  },
  computed: {
    getAllCurrencies() {
      let value = [t("orders.all")];
      const currencies = this.$store.getters["public/getAllCurrencies"];
      for (var i in currencies) {
        value.push(currencies[i].id.toUpperCase());
      }
      return value;
    }
  }
};
</script>
