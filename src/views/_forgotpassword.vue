<template>
  <Content class="page-auth">
    <div class="auth-box">
      <div>
        <h3 class="title">{{ $t('auth.forgot_password') }}</h3>
        <form @submit.prevent="ForgotPassword">
          <el-select class="phone-area-select" v-model="phoneAreaNumberValue">
            <el-option
              v-for="item in phoneAreaNumberList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
          <auth-input
            class="phone-input"
            name="mobile"
            v-model="mobile"
            ref="mobile"
            :className="{ g: mobile }"
            :placeholder="$t('placeholder.mobile')"
            :labelNeed="true"
            :enableVaild="validEmail()"
            errorText=""
          />
          <auth-input
            class="verificationcode-input"
            name="verificationcode"
            type="verificationcode"
            ref="verificationcode"
            v-model="verificationcode"
            style="margin-top: 20px"
            :placeholder="$t('auth.verification_code')"
            :labelNeed="true"
          />
          <div
            class="send-verificationcode-button"
            :class="oPhoneRegisterInfo.isGattingVerification ? 'disabled-button' : ''"
            @click="sendPhoneVerification"
            v-text="oPhoneRegisterInfo.sButtonText"
          ></div>
          <auth-input
                name="password"
                type="password"
                ref="password"
                v-model="password"
                style="margin-top: 20px"
                :className="{ ierror: validPassword(), g: password }"
                :labelClass="{ berror: validPassword() }"
                :placeholder="validPassword() ? $t('auth.input_error.password') : $t('placeholder.new_password')"
                :labelNeed="true"
              />
              <auth-input
                name="repassword"
                type="password"
                ref="repassword"
                v-model="repassword"
                :className="{ ierror: validPassword(true) && repassword, g: repassword }"
                :labelClass="{ berror: validPassword(true) && repassword }"
                :placeholder="$t('placeholder.repassword')"
                :labelNeed="true"
              />
          <button
            type="submit"
          >
            <span>{{ $t('auth.reset_password') }}</span>
          </button>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import Helpers from "./helpers";
import { runNotice } from "@/helpers";
import router from "@/router";
import { setTimeout, setInterval } from "timers";
import { Tabs, TabPane, Table, TableColumn, Select, Option } from 'element-ui';
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
export default {
  mixins: [Helpers],
  data: () => ({
      sended: false,
      mobile: "",
      password: "",
      repassword: "",
      verificationcode: "",
      phoneAreaNumberValue: 86,
      oPhoneRegisterInfo: {
      isGattingVerification: false,
      sButtonText: ''
    },
    phoneAreaNumberList: [{
      value: 86,
      label: '0086'
    }, {
      value: 65,
      label: '0065'
    }],
    bPhoneCheckedValue: false,
    wait: 0,
    WaitInterval: null
  }),
  mounted() {
    this.oPhoneRegisterInfo.sButtonText = this.$i18n.t('auth.get_verification_code')
  },
  methods: {
    ForgotPassword() {
      const { mobile} = this;
      new ApiClient("auth")
        .post("/identity/users/password/reset_password", {
          mobile: this.mobile,
          password: this.password,
          password_confirm: this.repassword,
          code: this.verificationcode,
        })
        .then(() => {
          runNotice("success", "密码重置成功");
          router.push("/signin");
        })
        .catch(error => error);
    },
    sendPhoneVerification () {
      if (this.oPhoneRegisterInfo.isGattingVerification) {
        return
      }
      this.oPhoneRegisterInfo.isGattingVerification = true
      new ApiClient("auth")
        .post("/identity/users/sms/send", {
          mobile: this.mobile
        })
        .then(() => {
          var _t = 60
          this.oPhoneRegisterInfo.sButtonText = _t + 's'
          this.pTimer = setInterval(() => {
            if (!this.$i18n) {
              clearInterval(this.pTimer)
            } else if (_t <= 0) {
              clearInterval(this.pTimer)
              this.oPhoneRegisterInfo.isGattingVerification = false
              this.oPhoneRegisterInfo.sButtonText = this.$i18n.t('auth.regain')
              return
            }
            _t--
            this.oPhoneRegisterInfo.sButtonText = _t + 's'
          }, 1000)
        })
        .catch(error => error);
    },
  }
};
</script>
<style>
  .el-message-box__message {
    border-bottom: 1px solid #EEEFF3;
  }
  .countries-ul {
    display: flex;
  }
  .countries-ul li {
    flex: 1;
    border-top: 1px solid #EEEFF3;
    border-left: 1px solid #EEEFF3;
    text-align: center;
    line-height: 18px;
    padding: 4px 0;
  }
  .countries-ul li:last-child {
    border-right: 1px solid #EEEFF3;
  }
  .el-tabs__active-bar {
    background-color: #0095D8;
  }
  .phone-area-select {
    width: 110px;
  }
  .phone-area-select .el-input--suffix {
    height: 43px;
  }
  .phone-area-select .el-input__inner {
    height: 43px;
    border: 1px solid #E2E2E2;
  }
  .page-auth .auth-box > div form .ivu-input-wrapper input {
    border-color: #E2E2E2;
  }
  .phone-input {
    width: 240px;
    margin-left: 6px;
  }
  .phone-num-note {
    color: #888;
    font-size: 10px;
  }
  .phone-num-note img {
    width: 12px;
    position: relative;
    top: 2px;
  }
  .verificationcode-input {
    width: 260px;
  }
  .send-verificationcode-button {
    width: 90px;
    top: 10px;
    position: relative;
    margin: 0 0 0 6px;
    border-radius: 4px;
    font-size: 12px;
    height: 44px;
    line-height: 44px;
    background: #0095D8;
    color: #fff;
    text-align: center;
    display: inline-block;
  }
  .disabled-button {
    background-color: #A9ABAC
  }
  .el-message-box {
    border: none;
  }
  .el-message-box__header {
    background-color: #003E5A;
  }
  .el-message-box__title{
    color: #fff;
  }
  .el-message-box__headerbtn .el-message-box__close {
    color: #fff;
  }
  .checkbox .el-checkbox__label{
    color: #888 !important;
    font-size: 12px;
  }
</style>
