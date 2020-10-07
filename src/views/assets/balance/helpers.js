import _deposit from "@/layouts/assets/_deposit.vue";
import _withdraw from "@/layouts/assets/_withdraw.vue";
import { getTickerPriceUSD } from "@/helpers";

export default {
  data: () => ({
    select: {
      id: "",
      type: "",
      deposit_address: "ERROR"
    },
    hidesmall: false,
    loading: false,
    search: ""
  }),
  computed: {
    getTotalUSDT() {
      let value = 0;
      const currencies = this.$store.getters["public/getAllCurrencies"];
      currencies.forEach(e => (value += this.getCurrencyByUSDT(e.id)));
      return value.toFixed(2);
    },
    getTotalUSD() {
      const price = this.$store.getters["public/getGlobalPrice"].USDT;
      if (price) return (price.USD * this.getTotalUSDT).toFixed(2);
      else return 0;
    },
    getAllCurrencies() {
      const currencies = this.$store.getters["public/getAllCurrencies"];
      return currencies.filter(e => {
        const btcAmount = Number(this.getCurrencyByBTC(e.id));
        if (this.search.length) {
          const valueReturn =
            e.id.indexOf(this.search.toLowerCase()) >= 0 ||
            e.name.indexOf(this.search.toLowerCase()) >= 0;
          if (this.hidesmall) {
            if (btcAmount >= 0.001) return valueReturn;
          } else return valueReturn;
        } else if (this.hidesmall) {
          if (btcAmount >= 0.001) return true;
        } else return true;
      });
    }
  },
  methods: {
    getAssets(currency) {
      const assets = this.$store.getters["user/getBalance"];
      for (let i in assets) {
        if (assets[i].currency === currency) return assets[i];
      }
    },
    getAllMarket(currency) {
      const tickers = this.$store.getters["public/getAllMarkets"];
      return tickers.filter(e => {
        if (e.base_unit === currency) return e;
      });
    },
    calculateForTotal(name) {
      const ticker = this.$store.getters["public/getAllTickers"][name];
      const value =
        getTickerPriceUSD(name, ticker.last) *
        (Number(this.getTotal(ticker.base_unit)) || 0);
      return value || 0;
    },
    getCurrencyByUSDT(currency) {
      const tickers = this.$store.getters["public/getAllTickers"];
      const allToCheck = ["usd", "usdt", "btc", "eth", "ltc", "xrp"];
      for (let i in allToCheck) {
        if (tickers[currency + allToCheck[i]])
          return this.calculateForTotal(currency + allToCheck[i]);
      }
      if (currency === "usd") {
        const price = this.$store.getters["public/getGlobalPrice"].USD;
        if (!price) return Number(this.getTotal(currency));
        else return Number(price.USDT * this.getTotal(currency));
      } else if (currency === "usdt") return Number(this.getTotal(currency));
    },
    getCurrencyByBTC(currency) {
      const priceUSDT = this.getCurrencyByUSDT(currency);
      const price = this.$store.getters["public/getGlobalPrice"].USDT;
      if (!price) return Number(0).toFixed(8);
      else return Number(price.BTC * priceUSDT).toFixed(8);
    },
    getCurrencyByUSD(currency) {
      const priceUSDT = this.getCurrencyByUSDT(currency);
      const price = this.$store.getters["public/getGlobalPrice"].USDT;
      if (!price) return Number(0).toFixed(8);
      else return Number(price.USD * priceUSDT).toFixed(2);
    },
    getTotal(currency) {
      return (
        Number(this.getAvailable(currency)) + Number(this.getLocked(currency))
      ).toFixed(8);
    },
    getAvailable(currency) {
      const assets = this.getAssets(currency);
      return Number(assets.balance).toFixed(8);
    },
    getLocked(currency) {
      const assets = this.getAssets(currency);
      return Number(assets.locked).toFixed(8);
    },
    changeAssets(currency, type) {
      this.select.id = currency;
      this.select.type = type;
      this.select.deposit_address = null;
      if (type === "deposit") {
        this.loading = true;
        new ApiClient("trade")
          .get("account/deposit_address/" + currency)
          .then(({ data }) => {
            this.loading = false;
            this.select.deposit_address = data.address;
          })
          .catch(() => (this.loading = false));
      }
    },
    changeMarket($market) {
      const marketArray = $market.split("/");
      const market = marketArray.join("_");
      this.$store.commit("public/SYNC_EXCHANGE", market);
    }
  },
  components: {
    "deposit-box": _deposit,
    "withdraw-box": _withdraw
  }
};
