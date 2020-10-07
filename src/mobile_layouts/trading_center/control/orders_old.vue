<template>
  <div id="orders_history" class="table-div">
    <dt>
      <span class="text-center side" v-text="$t('table.side')" />
      <span class="text-center price">{{ $t("table.price") }}</span>
      <span class="text-center amount">{{ $t("table.amount") }}</span>
      <span class="text-center filled">{{ $t("table.filled") }}</span>
    </dt>
    <modal-exchange v-if="!$store.getters['user/isLoggedIn']" background="transparent" />
    <dd v-else-if="$store.getters['exchange/getControlOrderArray'].length" class="all">
      <p v-for="data of $store.getters['exchange/getControlOrderArray']" :key="data.id">
        <span class="text-center side" :class="getTrend(data.side)" v-text="$t('orders.type.'+data.side)" />
        <span class="text-center price" v-text="data.price" />
        <span class="text-center amount" v-text="data.origin_volume" />
        <span
          class="text-center filled"
          v-text="(100 - (data.remaining_volume / data.origin_volume) * 100).toFixed(2)"
        />
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
<style lang="sass">
.table-div 
  .empty
    .center
      margin-top: 50%
      display: block
      margin-left: auto
      margin-right: auto
    .first, .second
      text-align: center 
</style>
