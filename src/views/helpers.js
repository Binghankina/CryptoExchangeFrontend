import { validEmail, validPassword, translation } from "@/helpers";
import _AuthInput from "@/components/custom/_AuthInput.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  methods: {
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
      this.captcha_response = "";
    },
    onVerify(response) {
      this.captcha_response = response;
    },
    validPassword(re = false) {
      const { repassword, password } = this;
      if (re) return validPassword(password, repassword);
      else return validPassword(password);
    },
    validRefid() {
      const { refid } = this;
      const regex = /^ID\w{10}$/g;
      if (refid) return !regex.test(refid);
      return false;
    },
    validEmail: (email, care = false) => validEmail(email, care),
    translation: (message, data = {}) =>
      translation("auth.input_error." + message, data)
  },
  components: {
    "vue-recaptcha": VueRecaptcha,
    "auth-input": _AuthInput
  }
};
