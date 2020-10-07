import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const { messages } = config;

export const i18n = new VueI18n({
  locale: "zh", // set locale
  fallbackLocale: "zh", // set fallback locale
  messages
});
