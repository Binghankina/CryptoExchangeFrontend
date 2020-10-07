import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import routes from "./routes";
import waitCheckedLogged from "./waitCheckedLogged";
import checkFirst from "./checkFirst";
import NProgress from "accessible-nprogress";

Vue.use(Router);

let router = new Router({
  mode: "history",
  abstract: true,
  base: "/",
  linkExactActiveClass: "",
  linkActiveClass: "ivu-menu-item-active",
  routes
});

let processing = null;
router.beforeEach(async (to, from, next) => {
  if (processing) {
    clearTimeout(processing);
    NProgress.remove();
  }
  NProgress.start();
  await checkFirst(to);
  if (to.fullPath.indexOf('/m/') !== -1) {
    document.title = 'GIH Cryptocurrency Exchange'
  }
  if (to.name === 'ExchangePro' && !Vue.prototype.ISPC) {
    //  拦截移动端点击首页tab后自动跳转
    return next("/m/tradingCenter")
  } else if (to.fullPath.indexOf('/m/') === -1 && !Vue.prototype.ISPC) {
    return next('/m/')
  } else if (to.fullPath.indexOf('/m/') !== -1 && Vue.prototype.ISPC) {
    return next('/')
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters["user/authStatus"] != "success") return next();
    return next("/account/security");
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    waitCheckedLogged(() => {
      if (store.getters["user/isLoggedIn"]) return next();
      if (Vue.prototype.ISPC) {
        return next("/signin");
      } else {
        return next("/m/login");
      }
    });
  } else if (to.matched.some(record => record.meta.onlyWait)) {
    if (store.state.user.status === "wait_email") return next();
    return next("/signin");
  } else if (to.matched.some(record => record.meta.requiresTokenReset)) {
    if (store.state.user.reset_password_token) return next();
    return next("/signin");
  } else {
    return next();
  }
});

router.afterEach(() => {
  processing = setTimeout(() => {
    NProgress.done();
    processing = null;
  }, 200);
});

export default router;
