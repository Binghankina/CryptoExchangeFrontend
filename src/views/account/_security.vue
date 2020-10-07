<template>
  <div class="setting-main security">
    <div class="setting-head">{{ $t("usercenter.account_security.title") }}</div>
    <div class="setting-body">
      <table class="table">
        <tr
          v-for="(data, index) in $store.getters['user/getAccountSecurity']"
          :key="index"
          class="row"
        >
          <td class="name" v-html="data.name" />
          <td class="desc" v-html="data.desc" />
          <td class="action">
            <a
              v-if="data.action.allow"
              v-html="data.action.text"
              @click="onClick(data.action.runner)"
            />
          </td>
        </tr>
        <tr class="row">
          <td class="name">
            {{$t("usercenter.account_security.rows.apsw.name")}}
          </td>
          <td class="desc">
            {{$t("usercenter.account_security.rows.apsw.desc")}}
          </td>
          <td class="action">
            <a href="#" @click="onClick('assetpassword')">
              {{$store.state.user.tx_pw ? $t("usercenter.account_security.rows.apsw.change") : $t("usercenter.account_security.rows.apsw.action") }}
            </a>
          </td>
        </tr>
      </table>
    </div>
    <modal-2fa ref="2fa" />
    <modal-password ref="password" @changeModal="onClick" />
    <modal-assets-password ref="assetpassword" />
  </div>
</template>

<script>
import { emailEncode } from "@/helpers";
import _modal_2fa from "@/layouts/account/_modal_2fa.vue";
import _modal_password from "@/layouts/account/_modal_password.vue";
import _modal_assets_password from "@/layouts/account/_modal_assets_password.vue";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    email: emailEncode(),
    password: "**********"
  }),
  mounted () {
    // this.checkAssetsPasswordInfo()
  },
  methods: {
  },
  components: {
    "modal-2fa": _modal_2fa,
    "modal-password": _modal_password,
    "modal-assets-password": _modal_assets_password
  }
};
</script>
