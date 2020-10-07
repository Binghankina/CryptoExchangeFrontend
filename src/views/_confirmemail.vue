<template>
  <Content class="page-auth">
    <div class="auth-box">
      <div>
        <form @submit.prevent="reSendEmail" class="confirm-email">
          <h3 class="title">Email Verification</h3>
          <div
            class="desc"
          >We have sent an activation email to sidav2@emailportal.info. Please follow click the link inside to complete your activation. If you have not received the email. Please Resend Email</div>
          <div class="icon-email">
            <img src="@/assets/img/email_icon.png">
          </div>
          <div class="not-receive-note">
            <h3>If you haven't received the email for a long time, please：</h3>
            <ul>
              <li>• Make sure the email address you provided is correct.</li>
              <li>• Check your Spam or Junk mail folders.</li>
              <li>
                • Add NameEX to your email address whitelist.
                <a href="#" target="_blank">Learn more</a>
              </li>
              <li>• Make sure your email is functioning normally.</li>
            </ul>
          </div>
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="$config.captcha.sitekey"
            @verify="onVerify"
            @expired="onCaptchaExpired"
          />
          <button type="submit" :disabled="!captcha_response || sended && wait != 0">
            <span>Resend Email</span>
            <span v-if="sended && wait != 0">({{wait}})</span>
          </button>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  beforeCreate() {
    this.$store.commit("public/RECAPTCHA_MODULE");
  },
  data: () => ({
    sended: true,
    captcha_response: "",
    wait: 0
  }),
  mounted() {
    this.actionReSend();
  },
  methods: {
    actionReSend() {
      if (
        this.$store.state.user.status === "wait_email" &&
        !this.$store.state.user.session.sended_email
      )
        return;
      this.sended = true;
      this.wait = 60;
      setTimeout(() => {
        clearInterval(this.WaitInterval);
        this.sended = false;
        this.wait = 0;
      }, 60000);
      this.WaitInterval = setInterval(() => {
        this.wait--;
      }, 1000);
    },
    reSendEmail() {
      const { captcha_response } = this,
        { email } = this.$store.state.user,
        lang = "en";
      new ApiClient("auth")
        .post("identity/users/email/generate_code", {
          email,
          lang,
          captcha_response
        })
        .then(() => this.actionReSend())
        .catch(error => error);
    }
  }
};
</script>
