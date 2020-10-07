import axios from "axios";
import store from "../store";
import router from "../router";
import { i18n } from "@/plugins";
import { jsonToParam, runNotice } from "@/helpers";

const NoticeWaring = message => {
  runNotice("warning", i18n.t(message));
};

const formatError = error => {
  const { response } = error;
  const message = response.data.errors[0];
  if (store.state.user.status === "success") {
    //======Auth=====//
    if (response.status === 401) {
      store.commit("user/LOGOUT");
    } else if (response.status === 400) {
      if (store.state.working == "change_password") {
        store.state.security.changePass.ButtonLoading = false;
      }
    }
  } else {
    //======UnAuth=====//
    if (message === "identity.session.missing_otp") {
      store.commit("user/NEED2FA");
      NoticeWaring(message);
    } else if (message === "identity.session.not_active") {
      const payload = JSON.parse(response.config.data);
      store.commit("user/WAIT_EMAIL", payload);
      NoticeWaring(message);
    } else if (message === "identity.user.active_or_doesnt_exist")
      router.push("/");
  }
  if (message !== "authz.invalid_session") runNotice("error", i18n.t(message));
};

const getClient = baseURL => {
  const client = axios.create({ baseURL });
  client.interceptors.response.use(
    response => Promise.resolve(response),
    error => {
      formatError(error);
      return Promise.reject(error);
    }
  );
  return client;
};

class ApiClient {
  constructor(request) {
    this.client = getClient(config.api.url + request);
  }

  get(url, data = {}, conf = {}) {
    return this.client
      .get(url + jsonToParam(data), conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, data = {}, conf = {}) {
    return this.client
      .delete(url + jsonToParam(data), conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export default ApiClient;
