<template>
  <div id="orders_history" class="ivu-card-body ex_table">
    <dt>
      <span class="text-left date" v-text="$t('table.date')" />
      <!--<span class="text-left type" v-text="$t('table.type')"/>-->
      <span class="text-center side" v-text="$t('table.side')" />
      <span class="text-center price">{{ $t("table.price") }} ({{ isBid }})</span>
      <span class="text-right amount">{{ $t("table.amount") }} ({{ isAsk }})</span>
      <span class="text-right filled">{{ $t("table.filled") }}</span>
      <span class="text-right total">{{ $t("table.total") }} ({{ isBid }})</span>
      <span class="text-right action" />
    </dt>
    <modal-exchange v-if="!$store.getters['user/isLoggedIn']" background="transparent" />
    <dd v-else-if="$store.getters['exchange/getControlOrderArray'].length" class="all">
      <p v-for="data of $store.getters['exchange/getControlOrderArray']" :key="data.id">
        <span class="text-left date" v-text="getDate(data.created_at)" />
        <!--<span class="text-left type" v-text="data.ord_type" />-->
        <span class="text-center side" :class="getTrend(data.side)" v-text="$t('orders.type.'+data.side)" />
        <span class="text-center price" v-text="data.price" />
        <span class="text-right amount" v-text="data.origin_volume" />
        <span
          class="text-right filled"
          v-text="(100 - (data.remaining_volume / data.origin_volume) * 100).toFixed(2)"
        />
        <span class="text-right total" v-text="getTotal(data.price, data.origin_volume)" />
        <span class="text-right action">
          <Icon
            v-if="data.state === 'wait'"
            type="md-close"
            @click="$store.dispatch('exchange/CANCEL_ORDER', data.id)"
          />
        </span>
      </p>
    </dd>
    <modal-empty v-else :first="$t('orders.history.empty')" />
    <Spin size="large" fix v-if="checkLoading" />
  </div>
</template>

<script>
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  created() {
    if (this.$store.getters["user/isLoggedIn"])
      this.$store.dispatch("exchange/getOrdersHistory");
  }
};
</script>
