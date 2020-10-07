<template>
  <div id="order_entry" class="ivu-card">
    <div class="ivu-card-head">
      <ul>
        <li class="selected" v-text="translation('card_head.limit_order')"/>
      </ul>
    </div>
    <div class="ivu-card-body">
      <bids-entry/>
      <asks-entry/>
      <modal-exchange v-if="!$store.getters['user/isLoggedIn']"/>
    </div>
  </div>
</template>

<script>
import { translation } from "@/helpers";
import _asks_entry from "@/layouts/exchange/entry/_asks_entry.vue";
import _bids_entry from "@/layouts/exchange/entry/_bids_entry.vue";
import _modal from "@/components/exchange/_modal.vue";

export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    translation: (message, data = {}) => translation("exchange." + message, data)
  },
  components: {
    "asks-entry": _asks_entry,
    "bids-entry": _bids_entry,
    "modal-exchange": _modal
  }
};
</script>
