<template lang="html">
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="password-modal"
    footer-hide
    width="400"
  >
    <div class="form">
      <!--<template v-if="$store.state.user.tx_pw">
        <auth-input
          name="old_password"
          type="password"
          ref="old_password"
          v-model="old_password"
          :value="old_password"
          :className="{ g: old_password }"
          :placeholder="$t('placeholder.old_password')"
          :labelNeed="true"
        />
      </template>-->
      <auth-input
        name="new_password"
        type="password"
        ref="new_password"
        v-model="new_password"
        :value="new_password"
        :className="{ g: new_password }"
        :placeholder="$t('placeholder.new_password')"
        :labelNeed="true"
      />
      <auth-input
        name="confirm_password"
        type="password"
        ref="confirm_password"
        v-model="confirm_password"
        :value="confirm_password"
        :className="{ g: confirm_password }"
        :placeholder="$t('placeholder.repassword')"
        :labelNeed="true"
      />
      <auth-input
        name="verificationcode"
        type="password"
        ref="verificationcode"
        v-model="verificationcode"
        :value="verificationcode"
        class="verificationcode-input"
        :placeholder="$t('auth.verification_code')"
        :labelNeed="true"
      />
      <div
        class="send-verificationcode-button"
       :class="oPhoneRegisterInfo.isGattingVerification ? 'disabled-button' : ''"
        @click="sendPhoneVerification"
        v-text="oPhoneRegisterInfo.sButtonText"
      ></div>
      <button @click="clickButton" type="submit" :disabled="vaildPassword()">
        <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
        {{$t('usercenter.sure')}}
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
      //old_password: "",
      new_password: "",
      confirm_password: "",
      verificationcode: "",
      oPhoneRegisterInfo: {
        isGattingVerification: false,
        sButtonText: ''
      },
      oC2cTradingInfo: {}
    }
  },
  mounted() {
    this.oPhoneRegisterInfo.sButtonText = this.$i18n.t('auth.get_verification_code')
    // this.checkAssetsPasswordInfo()
  },
  methods: {
    sendPhoneVerification () {
      if (this.oPhoneRegisterInfo.isGattingVerification) {
        return
      }
      this.oPhoneRegisterInfo.isGattingVerification = true
      new ApiClient("auth")
        .post("/identity/users/sms/send", {
          mobile: this.$store.state.user.mobile
        })
        .then(() => {
          var _t = 60
          this.oPhoneRegisterInfo.sButtonText = _t + 's'
          this.pTimer = setInterval(() => {
            if (_t <= 0) {
              clearInterval(this.pTimer)
              this.oPhoneRegisterInfo.isGattingVerification = false
              this.oPhoneRegisterInfo.sButtonText = this.$i18n.t('auth.regain')
              return
            } else if (!this) {
              clearInterval(this.pTimer)
            }
            _t--
            this.oPhoneRegisterInfo.sButtonText = _t + 's'
          }, 1000)
        })
        .catch(error => error);
    },
    vaildPassword() {
      const {
        new_password,
        confirm_password
      } = this;
      if (!confirm_password || !new_password) return true;
      return validPassword(new_password) || validPassword(new_password, confirm_password);
    },
    resetInput() {
      //this.confirm_password = this.verificationcode = this.old_password = this.new_password = "";
      this.confirm_password = this.verificationcode = this.new_password = "";
    },
    clickButton () {
      if (this.$store.state.user.tx_pw) {
        this.changepassword()
      } else {
        this.setpassword()
      }
    },
    setpassword () {
      new ApiClient("auth")
        .put("resource/users/tx/msg/password/set", {
          password: this.new_password,
          confirm_password: this.confirm_password,
          code: this.verificationcode
        })
        .then((res) => {
          this.$Message.success('设置成功');
          this.$store.dispatch("user/getTxInfo");
          setTimeout(() => {
            this.remove()
          }, 2000)
          this.resetInput();
        })
    },
    changepassword () {
      new ApiClient("auth")
        .put("/resource/users/tx/msg/password/change", {
            new_password: this.new_password,
            confirm_password: this.confirm_password,
            //old_password: this.old_password,
            code: this.verificationcode
          }
        )
        .then((res) => {
          this.$Message.success('设置成功');
          setTimeout(() => {
            this.remove()
          }, 2000)
          this.resetInput();
        })
    }
  }
}
</script>

<style lang="sass">
  .verificationcode-input
    width: 70%
  .send-verificationcode-button
    width: 28%
    top: 11px
    position: relative
    margin: 0 0 0 2%
    border-radius: 4px
    font-size: 12px
    height: 48px
    line-height: 48px
    background: #0095D8
    color: #fff
    text-align: center
    display: inline-block
  .disabled-button
    background-color: #A9ABAC
</style>
