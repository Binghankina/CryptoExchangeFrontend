<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="2fa-modal"
    footer-hide
    width="400"
  >
    <a class="ivu-modal-action" @click="step--" v-show="step > 1">
      <Icon type="ios-arrow-round-back"/>
    </a>
    <img src="@/assets/img/Google_Authenticator.png" class="logo-modal">
    <div v-if="step === 1" class="step">
      <div
        class="desc"
        v-text="translation(`modal_2fa[${step.toString()}].desc`)"
      />
    </div>
    <div v-else-if="step === 2" class="step">
      <div
        class="title"
        v-text="translation(`modal_2fa[${step.toString()}].title`)"
      />
      <div class="box">
        <qrcode :value="code.url" :size="110" level="L"/>
        <div class="info-qr">
          <p
            class="info"
            v-text="translation(`modal_2fa[${step.toString()}].info`)"
          />
          <p class="secret">{{ translation(`modal_2fa[${step}].key`) }}: {{ code.secret }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="step === 3" class="step">
      <div
        class="title"
        v-text="translation(`modal_2fa[${step.toString()}].title`)"
      />
      <div
        class="desc"
        v-text="translation(`modal_2fa[${step.toString()}].desc`)"
      />
      <form @submit.prevent="enable2FA">
        <auth-input
          name="password"
          type="password"
          ref="password"
          v-model="password"
          :value="password"
          :className="{ g: password }"
          :placeholder="$t('placeholder.password')"
          :labelNeed="true"
        />
        <auth-input
          name="otp_code"
          ref="otp_code"
          v-model="otp_code"
          :value="otp_code"
          :className="{ g: otp_code }"
          :placeholder="$t('placeholder.2fa_code')"
          :labelNeed="true"
        />
        <button type="submit" :disabled="!(otp_code.length === 6)">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button"/>
          {{ $t('auth.confirm') }}
        </button>
      </form>
    </div>
    <button v-if="step < 3" @click="step++" v-text="translation('next')"/>
    <div class="later-footer" v-if="step === 2">
      <span @click="modal.enabled = false" v-text="translation('later')"/>
    </div>
  </Modal>
</template>

<script>
import { removeURLParam, getURLParam } from "@/helpers";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    step: 1,
    otp_code: "",
    password: "",
    code: {
      secret: "",
      url: ""
    }
  }),
  methods: {
    resetInput() {
      this.password = "";
      this.otp_code = "";
      this.resetStep();
    },
    async getQRCode() {
      try {
        const { data } = await new ApiClient("auth").post("resource/otp/generate_qrcode");
        let url = data.data.url;
        url = removeURLParam(url, "algorithm");
        url = removeURLParam(url, "digits");
        this.code = {
          secret: getURLParam(url, "secret"),
          url
        };
      } catch (error) {
        return error;
      }
    },
    onChangeShow() {
      if (!this.code.secret) this.getQRCode();
      this.resetInput();
    },
    async enable2FA() {
      this.modal.loading_button = true;
      const { password, otp_code } = this;
      try {
        await new ApiClient("auth").post("resource/otp/enable", { password, otp_code });
        this.modal.loading_button = this.modal.enabled = false;
        this.$store.commit("user/ENABLE_OTP");
      } catch ({ response }) {
        this.modal.loading_button = false;
        const message = response.data.errors[0].replace("resource.otp.", "");
        if (message === "password_not_correct")
          this.$refs.password.addError(message);
        else if (message === "otp_invalid")
          this.$refs.otp_code.addError(message);
      }
    }
  }
};
</script>