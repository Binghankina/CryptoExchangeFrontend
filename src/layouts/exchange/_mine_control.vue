<template>
  <div id="mine_control" class="ivu-card">
    <div class="ivu-card-head">
      <ul>
        <li
          v-for="(data, index) in type"
          :key="index"
          class="type_control"
          :class="{ selected: type_control === data ? true : false }"
          @click="changeTypeControl(data)"
          v-text="translation('card_head.' + data)"
        />
      </ul>
    </div>
    <orders-open v-if="type_control === 'open_orders'"/>
    <orders-history v-if="type_control === 'history_orders'"/>
    <trades-history v-if="type_control === 'history_trades'"/>
  </div>
</template>

<script>
import { translation } from "@/helpers";
import OrdersOpen from "@/layouts/exchange/control/orders_open.vue";
import OrdersHistory from "@/layouts/exchange/control/orders_history.vue";
import TradesHistory from "@/layouts/exchange/control/trades_history.vue";

export default {
  components: {
    "orders-open": OrdersOpen,
    "orders-history": OrdersHistory,
    "trades-history": TradesHistory
  },
  data: () => ({
    type: ["open_orders", "history_orders", "history_trades"],
    type_control: "open_orders"
  }),
  methods: {
    changeTypeControl(type) {
      this.type_control = type;
      this.$store.commit("exchange/CHANGE_MINE_CONTROL", type);
    },
    translation: (message, data = {}) => translation("exchange." + message, data)
  }
};
</script>
