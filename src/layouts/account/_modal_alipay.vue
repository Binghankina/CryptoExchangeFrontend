<template lang="html">
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="password-modal"
    footer-hide
    width="400"
  >
    <div class="form">
      <auth-input
        name="real_name"
        type="text"
        ref="real_name"
        v-model="real_name"
        :value="real_name"
        :className="{ g: real_name }"
        :placeholder="$t('usercenter.c2c.real_name')"
        :labelNeed="true"
      />
      <auth-input
        name="alipay_account"
        type="text"
        ref="alipay_account"
        v-model="alipay_account"
        :value="alipay_account"
        :className="{ g: alipay_account }"
        :placeholder="$t('usercenter.c2c.alipay_account')"
        :labelNeed="true"
      />
      <auth-input
        name="assets_password"
        type="password"
        ref="assets_password"
        v-model="assets_password"
        :value="assets_password"
        :className="{ g: assets_password }"
        :placeholder="$t('usercenter.c2c.assets_password')"
        :labelNeed="true"
      />
      <button @click="clickButton">
        <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
        {{$t('usercenter.c2c.add')}}
      </button>
    </div>
  </Modal>
</template>

<script>
import Helpers from "./helpers";
import { validPassword, runMessage, runNotice } from "@/helpers";
export default {
  mixins: [Helpers],
  props: ['data'],
  data () {
    return {
      oC2cTradingInfo: {},
      alipay_account: "",
      real_name: "",
      assets_password: ""
    }
  },
  mounted() {
    console.log(this.$store)
    // this.oC2cTradingInfo = this.GLOBAL.AssetsPasswordInfo
  },
  methods: {
    clickButton () {
      new ApiClient("auth")
        .put("/resource/users/tx/msg/alipay/change", {
          alipay: this.alipay_account,
          alipay_name: this.real_name,
          tx_pw: this.assets_password
        }).then((res) => {
          console.log(res)
          this.$Message.success('设置成功');
          this.$store.dispatch("user/getTxInfo");
          setTimeout(() => {
            this.remove()
          }, 2000)
        })
    },
    resetInput() {
      this.alipay_account = this.real_name = this.assets_password = "";
    }
  }
}
</script>

<style lang="sass">
</style>
