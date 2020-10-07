<template>
<body id="app" :key="key_lang">
  <Layout
    v-if="checkData || checked"
    :class="{ night: this.$store.state.public.path === '/exchange' }"
  >
    <header-exchange v-if="this.ISPC"/>
    <router-view v-if="bIsRouterAlive" v-on:changeAppFooterStatus="changeAppFooterStatus"/>
    <footer-exchange v-if="this.$store.state.public.path != '/exchange' && this.ISPC" />
    <template v-if="!ISPC">
      <app-footer v-show="bShowFooter"></app-footer>
    </template>
  </Layout>
  <div class="page-loading" :class="{'mobile-loading-background': !ISPC}" v-else>
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
    </div>
  </div>
</body>
</template>

<script>
import _header from "@/layouts/_header.vue";
import _footer from "@/layouts/_footer.vue";
import { isMarket } from "@/helpers";
import Footer from '@/views/mobile/Footer';
export default {
  data: () => ({
    key_lang: 0,
    checked: false,
    bShowFooter: true,
    bIsRouterAlive: true
  }),
  beforeCreate() {
    "localStorage" in window;
    window.Storage.state = null;
    if (localStorage.getItem("SYMBOLS_HASH") == null)
      localStorage.setItem("SYMBOLS_HASH", this.$config.default_market());
    if (localStorage.getItem("LANGUAGE_HASH") == null)
      localStorage.setItem("LANGUAGE_HASH", "zh");
    if (
      localStorage.getItem("exchangeTheme") === null ||
      localStorage.getItem("exchangeTheme") == "light"
    )
      localStorage.setItem("exchangeTheme", "night");
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted() {
    const getlastPrice = () => this.$store.state.exchange.trades.array[0].price;
    const getDepth = () => this.$store.state.exchange.depth;
    window.allowStress = () => {
      global.ApiClient = ApiClient;
      global.orderbook = getDepth;
      global.getlastPrice = getlastPrice;
    };
    this.$EventBus.$on("ChangeLanguage", () => this.key_lang++);
  },
  computed: {
    checkData() {
      const {
        currencies,
        markets,
        tickers,
        sparklines,
        global_price
      } = this.$store.state.public;
      // return true
      const isLoggedIn = this.$store.getters["user/isLoggedIn"];
      const balances = this.$store.getters["user/getBalance"];
      if (
        currencies.length &&
        markets.length &&
        Object.keys(tickers).length &&
        Object.keys(sparklines).length &&
        Object.keys(global_price).length &&
        this.$store.getters["user/authStatus"] != "loading" &&
        this.$store.state.user.checkLogged
      ) {
        if (isLoggedIn) {
          if (balances.length) this.checked = true;
        } else {
          this.checked = true;
        }
      }
      return false;
    }
  },
  methods: {
    changeAppFooterStatus: function (bool) {
      this.bShowFooter = bool
    },
    reload () {
      //  刷新当前页
      this.bIsRouterAlive = false
      this.$nextTick(function () {
        this.bIsRouterAlive = true
      })
    }
  },
  components: {
    "header-exchange": _header,
    "footer-exchange": _footer,
    'app-footer': Footer
  }
};
</script>
<style lang="sass">
.mobile-html
  ::-webkit-scrollbar
    width: 0
.mobile-html
  background: #f8f8f9
  body
    background-color: #f8f8f9
  .mobile-loading-background
    background-color: #f8f8f9 !important
  .ivu-spin-fix
    background-color: #f8f8f9
  .ex_table
    padding: 20px
    dt
      line-height: 20px
    dd.empty
      height: 200px
      top: 0
      .first
        color: #333
  .tv_chart_container
    display: block !important
</style>
