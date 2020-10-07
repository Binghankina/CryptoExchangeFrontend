import Vue from "vue";
import store from "@/store";
import router from "@/router";
import { i18n, initProgress } from "@/plugins";
import { TransferDom } from "vux";
import App from "@/App.vue";
import "@/assets/css/default.scss";
import { MessageBox } from "element-ui";
import Effect from "./dircetive/effect";
import "element-ui/lib/theme-chalk/index.css";
import * as vClickOutside from "v-click-outside-x";
import GLOBAL from "@/global";

Vue.use(vClickOutside);
Vue.config.productionTip = false;
Vue.config.performance = true;

const EventBus = (Vue.prototype.$EventBus = new Vue());
Vue.directive("transfer-dom", TransferDom);
Vue.directive("click-effect", Effect);
Vue.prototype.$config = config;
Vue.prototype.GLOBAL = GLOBAL;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
EventBus.$on("isLogged", () => {
  store.dispatch("user/getBalance");
});
//  判断当前是否为PC端
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  Vue.prototype.ISPC = false;
  var viewportWidth = 
    document.documentElement.clientWidth || document.body.clientWidth;
  document.getElementsByTagName("html")[0].style.fontSize = 
    (viewportWidth > 500 ? 500 : viewportWidth) / 10 + "px";
  document.getElementsByTagName("html")[0].classList.add("mobile-html");
} else {
  document.getElementsByTagName("html")[0].style.fontSize = "12px";
  Vue.prototype.ISPC = true;
}

initProgress(router);

new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount("body");

export { EventBus };
