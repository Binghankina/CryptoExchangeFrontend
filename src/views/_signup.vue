<template>
  <Content class="page-auth">
    <div class="auth-box">
      <div>
        <h3 class="title">{{ $t('auth.register') }}</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('auth.mobile_phone_register')" name="phone" style="margin-top: 12px;">
            <form autocomplete="off" @submit.prevent="register">
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
                name="phone"
                v-model="phone"
                ref="phone"
                :className="{ g: phone }"
                :placeholder="$t('placeholder.mobile')"
                :labelNeed="true"
                :enableVaild="validEmail()"
                errorText=""
              />
              <p class="phone-num-note">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVRYR81XzVnbQBDdkQ/rW0gFgQowFQQqCKkgdBB8QbsnzEkrLjYVBCqIU0FMBYEKYiqIfcMHPHxPmfW3tiVrJXLIXvyj1eybN39vSTVYzrlPSqlTpdS+UmpPKdWT1x+UUjOlFD4nxpgfsWapbuNwONxbLBZDORiHxiyAudVaX/X7fXyvXDsB5Hl+yczn4u2aEWa+D/8goo8lp8yIaJSm6VUVglIA4vXPgGLFzE/wqtPpjC8uLkD11rq+vu69vLwgRGdE9CHY8KC1PiljYwsAjCyXy+8SZ9iYE9EgTdNRDPd+T57n58w8UEq9k/9mSZKcbIJfAyCe/woOf9RaH9fFsQqY2JsopQ5lz1RrfRTaWwPgnMPhRWYz81232z1ve7gHBRDPz88jIvriKyYMxwpAlmUDIrqUTW/yfJORTSaY+cpai/CoAoBs+C3ZPtda78d4nmXZMd631oLmnUvOmEpOzLTWBzijAJBl2a2niIj6MQmX5/kpMyNZFRF9TtN0XAdCEhM9pQixtfasAOCc+wPvUWrWWnS52hWGLKS07sUsy6ZSojNjzHsKPWloCLX+TRiIYk3YXuUamKOQ/iRJjqqazKZniD8RoVmBzpOYPMBe6TOoNqwbAJj4NmqMqZ0NHkhbABJyFuD35Gsfvd1aW2R1zHoLgMDpKQCs0DQBEHrShDnJgxXr/wUATLbDpiH4Fwyg7FsnoVCJzoZOGNU7fG6FYUcIMGa/4mGTMhQAxcHW2gJIzNoqw7aNSABEz4KgfNcbkcQSug3CYWqMOYjxpG0ZOucw9MDc3Biz13oYtQFQOYyqRmUdEy3G8dbIrxIklSKyDlTZ802RuyVIgvIoeoL8hq7vxwiTXaCCe8WZ7Hs0xvgLzV9F5Jfot4dAUr+JiRLPn7rdbq9SlAKIaPtxAAIVMjDG3DSh3zmH3gLdV9ym0PU6nc7pTlkeMrFYLEI5jUdoNuMkSe52XUyWyyXUr78/epOVInfn/BfZhauZv1yEJGwK0bJRPmfmkVfAZQzWCpBA18OrMiBldudyOR3UJXEtgNC6tO1jZu4REWLrK+aRmXERRQJPYhSyt/sKxDwoKeEXEOIAAAAASUVORK5CYII=" alt="">
                {{ $t('auth.countries_or_regions_cannot_be_modified_after_registration') }}
              </p>
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
                :placeholder="validPassword() ? $t('auth.input_error.password') : $t('placeholder.password')"
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
              <el-checkbox v-model="bPhoneCheckedValue" class="checkbox">
                {{ $t('auth.i_have_read_and_agree') }}
                <span style="color: #409EFF;">《{{ $t('auth.user_agreement_and_privacy_policy') }}》</span>
              </el-checkbox>
              <button
                type="submit"
                :disabled="validPassword() || !(password === repassword) || !bPhoneCheckedValue"
              >{{ $t('auth.register') }}</button>
            </form>
          </el-tab-pane>
        </el-tabs>

        <!-- <form autocomplete="off" @submit.prevent="register">
          <auth-input
            name="email"
            ref="email"
            v-model="email"
            :className="{ ierror: validEmail(email), g: email }"
            :labelClass="{ berror: validEmail(email) }"
            :placeholder="$t('placeholder.email')"
            :labelNeed="true"
            :enableVaild="validEmail(email)"
            :errorText="translation('email')"
          />
          <auth-input
            name="password"
            type="password"
            ref="password"
            v-model="password"
            :className="{ ierror: validPassword(), g: password }"
            :labelClass="{ berror: validPassword() }"
            :placeholder="$t('placeholder.password')"
            :labelNeed="true"
            :enableVaild="validPassword()"
            :errorText="translation('password')"
          />
          <auth-input
            name="confirm_password"
            type="password"
            ref="repassword"
            v-model="repassword"
            :className="{ ierror: validPassword(true) && repassword, g: repassword }"
            :labelClass="{ berror: validPassword(true) && repassword }"
            :placeholder="$t('placeholder.repassword')"
            :labelNeed="true"
            :enableVaild="validPassword(true) && repassword != ''"
            :errorText="translation('repassword')"
          />
          <auth-input
            name="referral-uid"
            ref="refid"
            v-model="refid"
            :className="{ ierror: validRefid(), g: refid }"
            :labelClass="{ berror: validRefid() }"
            :placeholder="$t('placeholder.refid')"
            :enableVaild="validRefid()"
            :errorText="translation('refid')"
          />
          <button
            type="submit"
            :disabled="validEmail(email, true) || validPassword() || !(password === repassword)"
          >{{ $t('auth.register') }}</button>
        </form> -->
      </div>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import Helpers from "./helpers";
import { setInterval } from "timers";
import router from "@/router";
import { Tabs, TabPane, Table, TableColumn, Select, Option, Checkbox } from 'element-ui';
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
export default {
  mixins: [Helpers],
  data: () => ({
    email: "",
    password: "",
    repassword: "",
    refid: "",
    captcha_response: "",
    activeName: "phone",
    phone: "",
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
    bPhoneCheckedValue: false
  }),
  beforeCreate() {
    this.$store.commit("public/RECAPTCHA_MODULE");
  },
  mounted() {
    this.oPhoneRegisterInfo.sButtonText = this.$i18n.t('auth.get_verification_code')
  },
  methods: {
    register() {
      // const { email, password, refid } = this;
      // this.$store.dispatch("user/REGISTER", {
      //   email,
      //   password,
      //   refid
      // });
      new ApiClient("auth")
          .post("/identity/users", {
            mobile: this.phone,
            password: this.password,
            code: this.verificationcode,
            country_code:this.phoneAreaNumberValue
          })
          .then(() => {
            this.$Message.success('注册成功');
            setTimeout(() => {
              this.login();
            }, 1000)
            // router.push("/signin");
          })
          .catch(error => error);
      this.resetInput();
    },
    async login () {
      await this.$store.dispatch("user/LOGIN", {
          mobile: this.phone,
          password: this.password,
          otp_code: ''
      });
    },
    sendPhoneVerification () {
      if (this.oPhoneRegisterInfo.isGattingVerification) {
        return
      }
      this.oPhoneRegisterInfo.isGattingVerification = true
      new ApiClient("auth")
        .post("/identity/users/sms/send", {
          mobile: this.phone
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
    resetInput() {
      this.$refs.phone.clear();
      this.$refs.password.clear();
      this.$refs.repassword.clear();
      // this.$refs.refid.clear();
    }
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
