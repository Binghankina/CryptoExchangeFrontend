import {
  getDate,
  pricePrecision,
  isAskSymbol,
  isBidSymbol,
  trendType
} from "@/helpers";
import _modal from "@/components/exchange/_modal.vue";
import _modal_empty from "@/layouts/exchange/control/_modal_empty.vue";

export default {
  components: {
    "modal-exchange": _modal,
    "modal-empty": _modal_empty
  },
  data: () => ({
    isAsk: null,
    isBid: null
  }),
  computed: {
    checkSession() {
      return this.$store.getters["user/isLoggedIn"];
    },
    checkLoading() {
      return this.$store.getters["exchange/loadingStatus"];
    }
  },
  mounted() {
    this.isAsk = isAskSymbol().toUpperCase();
    this.isBid = isBidSymbol().toUpperCase();
  },
  methods: {
    getDate: time => getDate(time),
    getTotal: (price, amount) => Number(price * amount).toFixed(pricePrecision()),
    getTrend: taker_type => trendType(taker_type)
  }
};
