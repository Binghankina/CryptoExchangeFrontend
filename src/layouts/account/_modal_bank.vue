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
        name="bank_name"
        type="text"
        ref="bank_name"
        v-model="bank_name"
        :value="bank_name"
        :className="{ g: bank_name }"
        :placeholder="$t('usercenter.c2c.bank_name')"
        :labelNeed="true"
      />
      <auth-input
        name="address"
        type="text"
        ref="address"
        v-model="bank_address"
        :value="bank_address"
        :className="{ g: bank_address }"
        :placeholder="$t('usercenter.c2c.address')"
        :labelNeed="true"
      />
      <auth-input
        name="account_name"
        type="text"
        ref="account_name"
        v-model="account_name"
        :value="account_name"
        :className="{ g: account_name }"
        :placeholder="$t('usercenter.c2c.account_name')"
        :labelNeed="true"
      />
      <auth-input
        name="bank_num"
        type="text"
        ref="bank_num"
        v-model="bank_number"
        :value="bank_number"
        :className="{ g: bank_number }"
        :placeholder="$t('usercenter.c2c.bank_num')"
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
      <button @click="clickButton" type="submit">
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
      bank_name: "",
      bank_address: "",
      bank_number: "",
      account_name: "",
      assets_password: ""
    }
  },
  mounted() {
    this.oC2cTradingInfo = this.GLOBAL.AssetsPasswordInfo
  },
  methods: {
    clickButton () {
      new ApiClient("auth")
        .put("/resource/users/tx/msg/bank/change", {
          bank_name: this.bank_name,
          bank_user_name: this.account_name,
          bank_address: this.bank_address,
          bank_number: this.bank_number,
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
      this.account_name = "";
    },
  }
}
</script>

<style lang="sass">
</style>
