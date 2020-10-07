<template>
  <div class="setting-main history">
    <div class="setting-head">
      <span v-text="$t('usercenter.api.title')" />
      <button @click="onClick('api')">Create New</button>
    </div>
    <div class="setting-body">
      <table class="table table-head">
        <thead>
          <th class="text-left" v-text="$t('table.kid')" />
          <th class="text-center" v-text="$t('table.created')" />
          <th class="text-right" v-text="$t('table.action')" />
        </thead>
      </table>
      <div class="table-content">
        <table class="table">
          <tbody>
            <tr
              v-for="data in $store.state.user.api_keys.array"
              :key="data.kid + '-' + data.state"
              class="api-row"
            >
              <td class="text-left" v-html="data.kid" />
              <td class="text-center" v-html="getDate(data.created_at, true)" />
              <td class="text-right">
                <i-switch
                  :loading="data.loading"
                  :value="data.state.includes('active')"
                  @on-change="openModal(data.kid, data.state === 'active' ? 'disabled' : 'active', 'update')"
                >
                  <Icon type="md-checkmark" slot="open" />
                  <Icon type="md-close" slot="close" />
                </i-switch>
                <Icon type="md-close" @click="openModal(data.kid, false, 'remove')" />
              </td>
            </tr>
          </tbody>
        </table>
        <Spin size="large" fix v-if="$store.state.user.api_keys.loading" />
      </div>
      <Page
        v-if="$store.state.user.api_keys.max > 25"
        :total="$store.state.user.api_keys.max"
        :page-size="25"
        :current="$store.state.user.api_keys.page"
        size="small"
        @on-change="onPageChange"
      />
    </div>
    <modal-2fa ref="2fa" />
    <modal-api ref="api" @changeModal="onClick" />
    <modal-totp
      ref="totp"
      :payload="modal_payload"
      @onSubmit="onSubmitTotp"
      @onFailed="modalClose"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDate } from "@/helpers";
import _modal_2fa from "@/layouts/account/_modal_2fa.vue";
import _modal_api from "@/layouts/account/_modal_api.vue";
import _modal_totp from "@/layouts/modal/_modal_totp.vue";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    modal_payload: {
      kid: "",
      state: "",
      modal: ""
    }
  }),
  mounted() {
    const { array } = this.$store.state.user.api_keys;
    if (!array.length)
      this.$store.dispatch("user/GET_API_KEYS", {
        page: 1,
        limit: 25
      });
  },
  methods: {
    modalClose() {
      const { kid } = this.modal_payload;
      const index = this.getIndexApiKey(kid);
      this.$store.state.user.api_keys.array[index].loading = false;
      this.$store.state.user.api_keys.array[index].state += "_";
    },
    openModal(kid, state, modal) {
      const index = this.getIndexApiKey(kid);
      this.modal_payload = { kid, state, modal };
      this.$refs.totp.render();
      if (modal === "update")
        this.$store.state.user.api_keys.array[index].loading = true;
    },
    getIndexApiKey(kid) {
      return this.$store.state.user.api_keys.array.findIndex(e => e.kid == kid);
    },
    onSubmitTotp(payload, totp_code) {
      if (payload.modal === 'update') this.updateApiKey(payload, totp_code);
      else this.removeApiKey(payload, totp_code);
    },
    async updateApiKey(payload, totp_code) {
      const { kid, state } = payload;
      try {
        await this.$store.dispatch("user/UPDATE_API_KEYS", {
          kid,
          state_: state,
          totp_code
        });
        this.$refs.totp.remove();
      } catch (error) {
        return error;
      }
    },
    async removeApiKey(payload, totp_code) {
      const { kid } = payload;
      try {
        await this.$store.dispatch("user/DELETE_API_KEYS", {
          kid,
          totp_code
        });
        this.$refs.totp.remove();
      } catch (error) {
        return error;
      }
    },
    onPageChange($page) {
      this.$store.dispatch("user/GET_API_KEYS", {
        page: $page,
        limit: 25
      });
    },
    getDate: date => getDate(date, true)
  },
  components: {
    "modal-2fa": _modal_2fa,
    "modal-api": _modal_api,
    "modal-totp": _modal_totp
  }
};
</script>