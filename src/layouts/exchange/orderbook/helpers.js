import { amountPrecision, pricePrecision } from "@/helpers";

export default {
  data: () => ({
    market: null,
    isBid: "",
    isAsk: "",
    whShow: "normal",
    maxSum: {
      bids: 0,
      asks: 0
    }
  }),
  computed: {
    depthAsks() {
      const side = "asks";
      const { depth } = this.$store.state.exchange;
      this.maxSum.asks = 0;
      depth[side].map(e => (this.maxSum[side] += Number(e[1])));
      return depth[side].reverse();
    },
    depthBids() {
      const side = "bids";
      const { depth } = this.$store.state.exchange;
      this.maxSum.asks = 0;
      depth[side].map(e => (this.maxSum[side] += Number(e[1])));
      return depth[side];
    }
  },
  methods: {
    getDepth(side) {
      if (side === "asks") return this.depthAsks;
      else return this.depthBids;
    },
    findIndexOrder(depth, price) {
      return depth.findIndex(row => row[0] == price);
    },
    onRowClicked(side, order) {
      const depth = this.getDepth(side);
      const indexOrder = this.findIndexOrder(depth, order[0]);
      let amount = 0;
      if (side === "bids") {
        let index = 0;
        while (index <= indexOrder) {
          amount += Number(depth[index][1]);
          index++;
        }
      } else {
        if (depth.length - indexOrder > 1) {
          let index = depth.length - 1;
          while (index >= indexOrder) {
            amount += Number(depth[index][1]);
            index--;
          }
        } else amount = Number(depth[indexOrder][1]);
      }
      const payload = {
        price: order[0],
        amount: amount
      };
      this.$EventBus.$emit("onBookClick", payload);
    },
    getPrice: price => (price * 1).toFixed(pricePrecision()),
    getAmount: amount => (amount * 1).toFixed(amountPrecision()),
    getVolume: (price, amount) => (price * amount).toFixed(pricePrecision())
  }
};
