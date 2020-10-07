import config from "@/config";
import store from "@/store";
import { i18n } from "@/plugins";
import checkConfirm from "./checkConfirm";

let firstRouter = true;

const urlToTitle = url => {
  const keyTitle = "titlePage";
  const urlSplit = url.split("/");
  let title = "";
  if (!urlSplit[1]) title = ".main";
  else {
    title = urlSplit.join(".");
  }

  return keyTitle + title;
};

const fetchData = () => {
  store.dispatch("public/getTimeStamp");
  store.dispatch("public/getGlobalPrice");
  store.dispatch("public/getMarkets");
  store.dispatch("public/getCurrencies");
  store.dispatch("public/getTickers");
  store.dispatch("public/getSparkLines");
  store.dispatch("user/getLogged");
  store.dispatch("user/getTxInfo");
};

export default to => {
  const pageTitle = urlToTitle(to.path);
  store.commit("public/SET_ROUTER", to.path);
  store.commit("public/SET_TITLE", config[pageTitle]);
  if (to.path === "/confirmation") {
    const payload = to.query;
    checkConfirm(payload);
  }
  if (firstRouter) {
    firstRouter = false;
    i18n.locale = localStorage.getItem("LANGUAGE_HASH");
    fetchData();
  }
};
