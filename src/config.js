import example_img from "@/assets/img/example_banner.jpg";
import en from "@/plugins/locales/en";
import zh from "@/plugins/locales/zh";
import getENV from "@/env.js";

const env = getENV();
const getUrl = (ws = false) => {
  if (env === "production") {
    const url = document.location.host;
    if (window.location.protocol === "https:")
      return ws === true ? "wss://" + url : "https://" + url;
    else return ws === true ? "ws://" + url : "http://" + url;
  } else {
    const url = window.document.location.hostname + ":3000";
    return ws === true ? "ws://" + url : "http://" + url;
  }
};

const getBaseUrl = () => {
  if (env === "production") {
    return window.location.protocol + "//www.gih.one";
  } else {
    return "";
  }
};
const nameEX = "GIH Exchange";

export default {
  nameEX,
  default_market: () => {
    const base_unit = "USDT";
    const quote_unit = "ETH";
    return base_unit + "_" + quote_unit;
  },
  feature_market: ["ETH/USDT", "ZIPT/ETH", "ETH/USDT", "ZIPT/ETH", "TST/ETH"],
  list_bid1: ["ETH"],
  list_bid2: ["OXT"],
  messages: {
    en: en,
    zh: zh
  },
  banner: [
    [
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" }
    ],
    [
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" }
    ],
    [
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" }
    ],
    [
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" },
      { img: example_img, link: "/#" }
    ]
  ],
  footer: {
    contactus: {
      service: "service@gih.one",
      business: "business@gih.one"
    },
    copyright: {
      name: "GIH digital asset exchange Co. LTD ",
      link: ""
    }
  },
  api: {
    url: getBaseUrl() + "/api/v2/",
    ws: getUrl(true) + "/api/v2/websocket"
  },
  captcha: {
    sitekey: "6LcrA5wUAAAAABY8KW-beaUOjShGC_U2va3kJEJt"
  },
  /**  public **/
  "titlePage.main": `Bitcoin Exchange | Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.exchange": `Bitcoin Exchange | Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.c2c": `GIH Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.c2ccreate": `GIH Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.c2corder": `GIH Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.c2cbuy": `GIH Cryptocurrency Exchange | ${nameEX}`,
  "titlePage.c2cappeal": `GIH Cryptocurrency Exchange | ${nameEX}`,
  /**  unauth **/
  "titlePage.signin": `Log In - ${nameEX}`,
  "titlePage.signup": `Sign Up - ${nameEX}`,
  "titlePage.forgotpassword": `Forgot Login Password - ${nameEX}`,
  "titlePage.resetpassword": `Reset Login Password - ${nameEX}`,
  "titlePage.confirmation.email": `Email Verification - ${nameEX}`,
  /**  auth **/
  "titlePage.assets.balance": `My Assets - ${nameEX}`,
  "titlePage.exchange_record.open": `Open Orders - ${nameEX}`,
  "titlePage.exchange_record.history": `Order History - ${nameEX}`,
  "titlePage.exchange_record.transaction": `Trade History - ${nameEX}`,
  "titlePage.account.information": `Account Information - ${nameEX}`,
  "titlePage.account.security": `Account Security - ${nameEX}`,
  "titlePage.account.kyc": `Account KYC - ${nameEX}`,
  "titlePage.account.history": `Login History - ${nameEX}`,
  "titlePage.account.c2c": `Account C2C - ${nameEX}`,
  "titlePage.account.api": `Account Api Keys - ${nameEX}`
};
