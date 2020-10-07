
<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="totp-modal"
    footer-hide
    width="400"
  >
    <div>
      <img src="@/assets/img/example_modal_logo.jpg" class="logo-modal" />
      <div class="title">Create ApiKey</div>
      <div class="desc">Enter the authentication code from the app below.</div>
      <form @submit.prevent="sendData">
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
  </Modal>
</template>

<script>
import { translation } from "@/helpers";
import _AuthInput from "@/components/custom/_AuthInput.vue";

export default {
  props: {
    payload: {
      type: Object,
      required: false,
      default: {}
    },
  },
  data: () => ({
    sentData: false,
    totp_code: "",
    modal: {
      enabled: false,
      loading_button: false
    }
  }),
  methods: {
    render() {
      this.modal.enabled = true;
    },
    remove() {
      this.modal.enabled = false;
    },
    sendData() {
      this.sentData = true;
      this.$emit('onSubmit', this.payload, this.totp_code);
    },
    onChangeShow() {
      if (!this.modal.enabled) {
        this.resetInput();
        if (!this.sentData) this.$emit('onFailed');
      }
    },
    resetInput() {
      this.totp_code = "";
      this.$refs.totp_code.clear();
    }
  },
  components: {
    "auth-input": _AuthInput
  }
};
</script>
