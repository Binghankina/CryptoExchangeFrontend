<template>
  <dd class="empty">
    <div>
      <img class="center" src="@/assets/img/icon-control.png" width="50px" height="50px">
      <div class="first" v-text="first"/>
      <div class="second" v-if="allowSecond" v-text="$t('orders.empty_second')"/>
    </div>
  </dd>
</template>

<script>
export default {
  props: ["first", "second"],
  computed: {
    allowSecond() {
      const { type } = this.$store.state.exchange.mine_control;
      return type === 'orders_open' || type === 'history_orders';
    }
  }
}
</script>
