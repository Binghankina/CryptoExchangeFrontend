import { runNotice, translation } from "@/helpers";
import { EventBus } from "@/main.js";
import router from "@/router";

export default {
  NEED2FA: state => (state.need2fa = true),
  AUTH_REQUEST(state, payload = {}) {
    state.status = "loading";
    state.email = payload.email;
    state.password = payload.password;
  },
  AUTH_SUCCESS(state, { data, login }) {
    state.status = "success";
    state.email = data.email;
    state.role = data.role;
    state.level = data.level;
    state.otp = data.otp;
    state.uid = data.uid;
    if (data.phone) state.phone = data.phone;
    if (data.mobile) state.mobile = data.mobile;
    state.need2fa = false;
    state.checkLogged = true;
    if (login) router.push("/account/information");
  },
  TX_SUCCESS(state, { data }) {
    state.alipay = data.alipay
    state.alipay_name = data.alipay_name
    state.bank_address = data.bank_address
    state.bank_name = data.bank_name
    state.bank_number = data.bank_number
    state.bank_user_name = data.bank_user_name
    state.tx_pw = data.tx_pw
  },
  WAIT_EMAIL(state, payload, sended_email = false) {
    state.status = "wait_email";
    state.email = payload.email;
    state.session.sended_email = sended_email;
    runNotice("warning", "Check Your Email NOW");
    router.push("/confirmation/email");
  },
  GET_ACTIVITY(state, { headers, data }) {
    state.activity.loading = false;
    state.activity.array = data;
    state.activity.max = Number(headers.total);
  },
  GET_KYC_STATUS(state, { data } ) {
    state.kyc_status = data.kyc_status;
  },
  GET_API_KEYS(state, { headers, data }) {
    state.api_keys.loading = false;
    state.api_keys.array = data;
    state.api_keys.max = Number(headers.total);
  },
  CREATE_API_KEYS(state, payload) {
    state.api_keys.array.push(payload);
  },
  DELETE_API_KEYS(state, payload) {
    const index = state.api_keys.array.findIndex(e => e.kid == payload.kid);
    state.api_keys.array.splice(index, 1);
  },
  UPDATE_API_KEYS(state, payload) {
    const index = state.api_keys.array.findIndex(e => e.kid == payload.kid);
    state.api_keys.array[index].state = payload.state;
    state.api_keys.array[index].loading = false;
  },
  CONFIRM_EMAIL() {
    runNotice("success", "Successful verification");
    router.push("/signin");
  },
  CHECK_RESET_TOKEN(state, { payload, token }) {
    if (payload === 201) state.reset_password_token = token;
    router.push("/resetpassword");
  },
  AUTH_ERROR(state) {
    state.checkLogged = true;
    state.status = "";
  },
  LOGOUT(state, type = false) {
    state.status = "";
    if (type) {
      router.push("/");
      runNotice("success", translation("LOG_OUT"));
    }
  },
  ENABLE_OTP: state => (state.otp = true),
  BALANCE(state, payload) {
    EventBus.$emit("onBalance", "");
    state.balance = payload;
  },
  UPDATE_BALANCE(state, payload) {
    for (var i in payload) {
      for (var x in state.balance) {
        if (state.balance[x].currency === i) {
          state.balance[x].balance = payload[i].balance;
          state.balance[x].locked = payload[i].locked;
        }
      }
    }
  }
};
