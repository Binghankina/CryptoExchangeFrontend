<template>
  <div id="trades_history" class="ivu-card-body ex_table">
    <dt>
      <span class="text-left date" v-text="$t('table.date')"/>
      <!--<span class="text-left type" v-text="$t('table.type')"/>-->
      <span class="text-center side" v-text="$t('table.side')"/>
      <span class="text-center price">{{ $t("table.price") }} ({{ isBid }})</span>
      <span class="text-right amount">{{ $t("table.amount") }} ({{ isAsk }})</span>
      <span class="text-right total">{{ $t("table.total") }} ({{ isBid }})</span>
    </dt>
    <modal-exchange v-if="!$store.getters['user/isLoggedIn']" background="transparent" />
    <dd v-else-if="$store.getters['exchange/getControlTradeArray'].length" class="all">
      <p v-for="data of $store.getters['exchange/getControlTradeArray']" :key="data.id">
        <span class="text-left date" v-text="getDate(data.created_at)" />
        <!--<span class="text-left type" v-text="'limit'" />-->
        <span class="text-center side" :class="getTrend(data.side)" v-text="$t('orders.type.'+data.side)" />
        <span class="text-center price" v-text="data.price" />
        <span class="text-right amount" v-text="data.volume" />
        <span class="text-right amount" v-text="getTotal(data.price, data.volume)" />
      </p>
    </dd>
    <modal-empty v-else :first="$t('orders.transaction.empty')"/>
    <Spin size="large" fix v-if="checkLoading"/>
  </div>
</template>

<script>
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  created() {
    if (this.$store.getters["user/isLoggedIn"])
      this.$store.dispatch("exchange/getTradesHistory");
  }
};
</script>
