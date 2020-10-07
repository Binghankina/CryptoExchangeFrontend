<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="withdraw-modal"
    footer-hide
    width="400"
  >
    <form @submit.prevent="onWithdraw()">
      <button type="submit">
        <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button"/>
        Confirm
      </button>
    </form>
  </Modal>
</template>

<script>
import { runNotice } from "@/helpers";
export default {
  props: ["rid", "currency", "amount"],
  data: () => ({
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
    onChangeShow() {
      if (!this.modal.enabled) this.resetInput();
    },
    async onWithdraw() {
      this.modal.loading_button = true;
      const { rid, currency, amount } = this;
      const payload = { rid, currency, amount };
      try {
        await new ApiClient("trade").post("account/withdraws", payload);
        runNotice("success", this.$t("message.withdraw.success"));
        this.modal.loading_button = false;
        this.remove();
      } catch (error) {
        this.modal.loading_button = false;
        this.resetInput();
        return error;
      }
    }
  }
};
</script>
