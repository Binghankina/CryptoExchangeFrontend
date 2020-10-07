<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="phone-modal"
    footer-hide
    width="400"
  >
    <a class="ivu-modal-action" @click="step--" v-show="step > 1">
      <Icon type="ios-arrow-round-back" />
    </a>
    <div v-if="step === 1">
      <img src="@/assets/img/example_modal_logo.jpg" class="logo-modal" />
      <div class="title">Phone number</div>
      <div
        class="desc"
      >Enter your phone number so we can send you an SMS with the authentication code.</div>
      <form v-if="$store.state.user.phone" @submit.prevent="sendCode">
        <div class="phone-number">
          <span>+</span>
          <auth-input
            name="phone_number"
            ref="phone_number"
            v-model="phone_number"
            :className="{ g: true }"
            placeholder="Phone number"
            :labelNeed="true"
            :value="$store.state.user.phone.number"
          />
        </div>
        <button type="submit" :disabled="!phone_number">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
          Send Code
        </button>
      </form>
    </div>
    <div v-else>
      <img src="@/assets/img/example_modal_logo.jpg" class="logo-modal" />
      <div class="title">Authentication</div>
      <div
        class="desc"
      >Please enter the SMS verification code below +{{ phone_number }} . Enter below.</div>
      <form @submit.prevent="verifyCode">
        <auth-input
          name="verification_code"
          ref="verification_code"
          v-model="verification_code"
          :className="{ g: verification_code }"
          placeholder="Verification code"
          maxlength="5"
          :labelNeed="true"
        />
        <auth-input
          v-if="$store.state.user.otp"
          name="otp_code"
          ref="otp_code"
          v-model="otp_code"
          :className="{ g: otp_code }"
          placeholder="2FA Code"
          :labelNeed="true"
          maxlength="6"
          type="number"
        />
        <button
          type="submit"
          :disabled="!(otp_code.length === 6) || !(verification_code.length === 5)"
        >
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
          Confirm
        </button>
      </form>
    </div>
  </Modal>
</template>

<script>
import { runNotice, runMessage } from "@/helpers";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    step: 1,
    phone_number: "",
    otp_code: "",
    verification_code: ""
  }),
  mounted() {
    if (this.$store.state.user.phone) this.phone_number = this.$store.state.user.phone;
  },
  methods: {
    resetInput() {
      this.otp_code = this.phone_number = "";
      this.resetStep();
      if (!this.$store.state.user.otp) return;
    },
    onChangeShow() {
      if (!this.modal.enabled) {
        this.resetInput();
        this.step = 1;
      }
    },
    sendCode() {
      this.modal.loading_button = true;
      const { phone_number } = this;
      new ApiClient("auth")
        .post(
          `resource/phones${this.$store.state.user.phone ? "/send_code" : ""}`,
          { phone_number: "+" + phone_number }
        )
        .then(() => {
          this.step++;
          this.modal.loading_button = false;
          runNotice("success", "Code was sent successfully");
        })
        .catch(error => (this.modal.loading_button = false));
    },
    verifyCode() {
      this.modal.loading_button = true;
      const { phone_number, verification_code } = this;
      let payload = { phone_number, verification_code };
      if (this.$store.state.user.otp) payload["otp_code"] = this.otp_code;
      new ApiClient("auth")
        .post("resource/phones/verify", payload)
        .then(() => {
          this.modal.loading_button = false;
          runNotice("success", "Phone was verified successfully");
        })
        .catch(error => error);
    }
  }
};
</script>
