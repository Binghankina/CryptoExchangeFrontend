import { EventBus } from "@/main";
import router from "@/router";
import store from "@/store";

export default {
  async getLogged({ commit }) {
    commit("AUTH_REQUEST");
    try {
      const { data } = await new ApiClient("auth").get("resource/users/me");
      commit("AUTH_SUCCESS", { data, login: false });
      EventBus.$emit("isLogged", "");
    } catch (error) {
      commit("AUTH_ERROR");
      return error;
    }
  },
  async getTxInfo({ commit }) {
    try {
      const { data } = await new ApiClient("auth").get("resource/users/tx/msg")
      commit("TX_SUCCESS", { data });
    } catch (error) {
      return error;
    }
  },
  async LOGIN({ commit }, payload) {
    commit("AUTH_REQUEST", payload);
    try {
      const url = "identity/sessions";
      const { data } = await new ApiClient("auth").post(url, payload);
      commit("AUTH_SUCCESS", { data, login: true });
      EventBus.$emit("isLogged", "");
    } catch (error) {
      commit("AUTH_ERROR");
      return error;
    }
  },
  async REGISTER({ commit }, payload) {
    if (!payload.refid) delete payload.refid;
    payload.lang = "en";
    try {
      await new ApiClient("auth").post("identity/users", payload);
      commit("WAIT_EMAIL", payload, true);
    } catch (error) {
      return error;
    }
  },
  async LOGOUT({ commit }) {
    try {
      await new ApiClient("auth").delete("identity/sessions");
      commit("LOGOUT", true);
    } catch (error) {
      return error;
    }
  },
  async GET_ACTIVITY({ state, commit }, payload) {
    state.activity.loading = true;
    try {
      const url = "resource/users/activity";
      const response = await new ApiClient("auth").get(url, payload);
      commit("GET_ACTIVITY", response);
    } catch (error) {
      return error;
    }
  },
  async GET_KYC_STATUS({ commit }) {
    try {
      const url = "account/kyc/status";
      const { data } = await new ApiClient("trade").get(url);
      commit("GET_KYC_STATUS", { data } );
      return data
    } catch (error) {
      return error;
    }
  },
  async GET_API_KEYS({ state, commit }, payload) {
    state.api_keys.loading = true;
    try {
      const url = "resource/api_keys";
      const response = await new ApiClient("auth").get(url, payload);
      commit("GET_API_KEYS", response);
    } catch (error) {
      return error;
    }
  },
  async CREATE_API_KEYS({ commit }, payload) {
    try {
      const url = "resource/api_keys";
      const { data } = await new ApiClient("auth").post(url, payload);
      commit("CREATE_API_KEYS", data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async DELETE_API_KEYS({ commit }, payload) {
    const { kid, totp_code } = payload;
    try {
      const url = "resource/api_keys/" + kid;
      const response = await new ApiClient("auth").delete(url, { totp_code });
      commit("DELETE_API_KEYS", payload);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async UPDATE_API_KEYS({ state, commit }, { kid, state_, totp_code }) {
    const index = state.api_keys.array.findIndex(e => e.kid == kid);
    state.api_keys.array[index].loading = true;
    try {
      const url = "resource/api_keys/" + kid;
      const response = await new ApiClient("auth").patch(url, {
        state: state_,
        totp_code
      });
      commit("UPDATE_API_KEYS", response.data);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async CONFIRM_EMAIL({ commit }, token) {
    try {
      const url = "identity/users/email/confirm_code";
      await new ApiClient("auth").post(url, { token });
      commit("CONFIRM_EMAIL");
    } catch (error) {
      return error;
    }
  },
  async CHECK_RESET_TOKEN({ commit }, token) {
    try {
      const url = "identity/users/password/confirm_code";
      const { data } = await new ApiClient("auth").post(url, { token });
      commit("CHECK_RESET_TOKEN", { payload: data, token });
    } catch (error) {
      router.push("/signin");
      return error;
    }
  },
  async getBalance({ commit }) {
    try {
      const response = await new ApiClient("trade").get("account/balances");
      store.dispatch("websocket/authenticate", response.headers.authorization);
      commit("BALANCE", response.data);
    } catch (error) {
      return error;
    }
  },
  BalanceLogic({ commit }, payload) {
    if (payload["balance"]) commit("UPDATE_BALANCE", payload["balance"]);
  }
};
