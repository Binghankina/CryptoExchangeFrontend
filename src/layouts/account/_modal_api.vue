<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="api-modal"
    footer-hide
    width="400"
  >
    <need-security
      v-if="!$store.state.user.otp"
      @closeModal="closeModal"
      @changeModal="changeModal"
    />
    <div v-else-if="step === 1">
      <img src="@/assets/img/example_modal_logo.jpg" class="logo-modal" />
      <div class="title">Create ApiKey</div>
      <div class="desc">Enter the authentication code from the app below.</div>
      <form @submit.prevent="createApi_Keys">
        <auth-input
          name="totp_code"
          ref="totp_code"
          v-model="totp_code"
          :value="totp_code"
          :className="{ g: totp_code }"
          placeholder="2FA Code"
          :labelNeed="true"
          maxlength="6"
          type="number"
        />
        <button type="submit" :disabled="!(totp_code.length === 6)">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
          {{ $t('auth.confirm') }}
        </button>
      </form>
    </div>
    <div v-else>
      <div class="info-warning">
        <Icon type="ios-warning-outline" />
        <p>
          <span>API Key Created</span>
          <br />This information will be shown only once and cannot be retrieved once lost. Please store it properly.
        </p>
      </div>
      <form @submit.prevent="remove">
        <auth-input
          name="access_key"
          ref="access_key"
          v-model="value.kid"
          :value="value.kid"
          :className="{ g: value.kid }"
          placeholder="Access Key"
          maxlength="6"
          type="number"
          :labelNeed="true"
          :disabled="true"
        />
        <auth-input
          name="secret_key"
          ref="secret_key"
          v-model="value.secret"
          :value="value.secret"
          :className="{ g: value.secret }"
          placeholder="Secret Key"
          type="number"
          :labelNeed="true"
          :disabled="true"
        />
        <button type="submit" v-text="$t('auth.confirm')" />
      </form>
    </div>
  </Modal>
</template>

<script>
import { runMessage, runNotice } from "@/helpers";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    totp_code: "",
    step: 1,
    value: {
      kid: "",
      secret: ""
    }
  }),
  methods: {
    resetInput() {
      this.secret_key = this.access_key = this.totp_code = "";
      this.resetStep();
    },
    async createApi_Keys() {
      this.modal.loading_button = true;
      const algorithm = "HS256";
      const { totp_code } = this;
      try {
        const { kid, secret } = await this.$store.dispatch(
          "user/CREATE_API_KEYS",
          {
            algorithm,
            totp_code
          }
        ); // {"kid":"334cff30a7d5e171","algorithm":"HS256","scope":[],"state":"active","secret":"b698e0027d182311099ea42637bd890e","created_at":"2019-07-15T16:11:36Z","updated_at":"2019-07-15T16:11:36Z"}
        this.resetInput();
        this.modal.loading_button = false;
        this.value = { kid, secret };
        this.step++;
      } catch (error) {
        this.modal.loading_button = false;
        return error;
      }
    }
  }
};
</script>
