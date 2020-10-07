import {
  isMarket,
  pricePrecision,
  amountPrecision,
  isAskSymbol,
  isBidSymbol,
  getTickerPriceUSD,
  translation,
  inputOnlyNumber
} from "@/helpers";

export default {
  data: () => ({
    isAsk: null,
    isBid: null,
    price: "",
    amount: "",
    onFocusPrice: false,
    onFocusAmount: false,
    AmountError: false,
    theme: localStorage.getItem("exchangeTheme") === "night" ? "light" : "dark",
    disabled_button: false
  }),
  created() {
    this.isAsk = isAskSymbol().toUpperCase();
    this.isBid = isBidSymbol().toUpperCase();
  },
  mounted() {
    this.$EventBus.$on("onChangeThemes", theme => {
      this.theme = theme;
    });
    this.$EventBus.$on("onBookClick", payload => {
      this.price = payload.price;
      this.amount = payload.amount;
      this.onPriceInput(false);
      this.onAmountInput(false);
    });
    this.$EventBus.$on("OrderPlaced", () => {
      this.price = "";
      this.amount = "";
    });
  },
  computed: {
    findBid() {
      const balances = this.$store.getters["user/getBalance"];
      return balances.filter(row =>
        row["currency"].toLowerCase().includes(this.isBid.toLowerCase())
      );
    },
    findAsk() {
      const balances = this.$store.getters["user/getBalance"];
      return balances.filter(balance =>
        balance["currency"].toLowerCase().includes(this.isAsk.toLowerCase())
      );
    },
    getTotal() {
      if (this.price > 0 && this.amount > 0) {
        return Number(this.price * this.amount).toFixed(8);
      } else {
        return Number(0).toFixed(8);
      }
    }
  },
  methods: {
    isMarket: () => isMarket(),
    getTickerPriceUSD: (ticker, price) => getTickerPriceUSD(ticker, price),
    async createOrder(type) {
      if (this.$store.state.user.status !== "success") {
      // if (this.$store.getters["user/isLoggedIn"] === null) {
        this.$router.push({name: 'Login'})
      }
      this.disabled_button = true;
      const { price } = this,
        volume = this.amount;
      const payload = {
        market: isMarket(),
        side: type,
        volume,
        price
      };
      await this.$store.dispatch("exchange/PlaceOrder", payload);
      this.$EventBus.$emit("OrderPlaced", "");
      this.disabled_button = false;
      this.$store.dispatch("exchange/getMarketDepth");
      this.$store.dispatch("exchange/getMarketTrades");
      this.$store.dispatch("user/getBalance");
    },
    translation: (message, data = {}) =>
      translation("exchange." + message, data)
  },
  watch: {
    price() {
      this.price = inputOnlyNumber(this.price, pricePrecision());
    },
    amount() {
      this.amount = inputOnlyNumber(this.amount, amountPrecision());
    }
  }
};
