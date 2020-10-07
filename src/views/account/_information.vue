<template>
  <div class="setting-main information">
    <div class="setting-head">{{ $t("usercenter.account_information.title") }}</div>
    <div class="setting-body">
      <table class="table">
        <tr
          v-for="(data, index) in $store.getters['user/getAccountInformation']"
          :key="index"
          class="row"
        >
          <td class="name" v-text="data.name"/>
          <td class="desc" v-text="data.desc"/>
          <td v-if="data.type === 'text'" class="value" v-text="data.value"/>
          <td v-else class="action">
            <a
              v-text="data.action.text"
              @click="onClick(data.action.runner)"
            />
          </td>
        </tr>
      </table>
    </div>
    <!-- <modal-phone ref="phone"/> -->
  </div>
</template>

<script>
// import _modal_phone from "@/layouts/account/_modal_phone.vue"
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  components: {
    // "modal-phone": _modal_phone
  }
}
</script>
