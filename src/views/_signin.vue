<template>
  <Content class="page-auth">
    <div class="auth-box">
      <div>
        <h3 class="title" v-text="$t('auth.login')"/>
        <form @submit.prevent="login">
          <auth-input
            name="mobile"
            v-model="mobile"
            :className="{ g: mobile }"
            :placeholder="$t('placeholder.mobile')"
            :labelNeed="true"
          />
          <auth-input
            name="password"
            type="password"
            v-model="password"
            :className="{ g: password }"
            :placeholder="$t('placeholder.password')"
            :labelNeed="true"
          />
          <button type="submit" :disabled="validEmail(email) || !password">
            <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="loading"/>
            {{ $t('auth.login') }}
          </button>
          <!-- <auth-input
            name="email"
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
            v-model="password"
            :className="{ g: password }"
            :placeholder="$t('placeholder.password')"
            :labelNeed="true"
          />
          <div class="captcha">
            <vue-recaptcha
              ref="recaptcha"
              :sitekey="$config.captcha.sitekey"
              @verify="onVerify"
              @expired="onCaptchaExpired"
            />
          </div>
          <button type="submit" :disabled="validEmail(email) || !password || !captcha_response">
            <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="loading"/>
            {{ $t('auth.login') }}
          </button> -->
          <div>
            <router-link to="forgotpassword" class="forgot">{{ $t('auth.forgot_password') }}?</router-link>
            <i18n path="auth.no_account" tag="div" class="text-right signup">
              <router-link to="signup" v-text="$t('auth.to_sign_up')"/>
            </i18n>
          </div>
        </form>
      </div>
      <Modal v-model="$store.state.user.need2fa" footer-hide width="400">
        <img src="@/assets/img/Google_Authenticator.png" class="logo-modal">
        <h3 class="title">Google Authentication</h3>
        <div class="desc">Enter the authentication code from the app below.</div>
        <form @submit.prevent="login">
          <auth-input
            name="otp_code"
            @input="login"
            v-model="otp_code"
            maxlength="6"
            :className="{ ierror: !valid2FA, g: otp_code }"
            :labelClass="{ berror: !valid2FA }"
            placeholder="2FA Code"
            :labelNeed="true"
          />
          <button
            type="submit"
            :disabled="validEmail(email, true) || !password || !(otp_code.length === 6)"
          >
            <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="loading"/>
            {{ $t('auth.confirm') }}
          </button>
        </form>
      </Modal>
    </div>
  </Content>
</template>

<script>
import Helpers from "./helpers";
import VueRecaptcha from "vue-recaptcha";

export default {
  mixins: [Helpers],
  data: () => ({
    loading: false,
    mobile: "",
    email: "",
    password: "",
    otp_code: "",
    captcha_response: ""
  }),
  beforeCreate() {
    this.$store.commit("public/RECAPTCHA_MODULE");
  },
  methods: {
    valid2FA() {
      const { otp_code } = this;
      if (!otp_code) {
        return true;
      } else {
        return otp_code.length === 6;
      }
    },
    async callLogin() {
      console.log(this)
      this.loading = true;
      const { mobile, password, otp_code } = this;
      await this.$store.dispatch("user/LOGIN", { mobile, password, otp_code });
      // XXX: 加到登陆成功回调中
      setTimeout(() => {
        this.$store.dispatch("user/getTxInfo");
      }, 1000)
      this.loading = false;
    },
    login() {
      if (this.$store.state.user.need2fa) {
        if (this.otp_code.length >= 6) this.callLogin();
      } else {
        this.callLogin();
      }
    }
  }
};
</script>
