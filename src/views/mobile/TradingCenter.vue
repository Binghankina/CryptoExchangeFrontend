<template lang="html">
  <div class="trading-center-body">
    <div v-show="bShowDefaultPage" class="">
      <div class="top-div">
        <span @click="clickShowListPage">{{isAsk}}/{{isBid}}</span>
        <img @click="clickShowListPage" style="width: 14px" src="@/assets/img/m/download-9.png" alt="">
        <img @click="clickShowChartsPage" class="charts-img" src="@/assets/img/m/download-10.png" alt="" v-click-effect>
      </div>
      <div class="main-body">
        <div class="">
          <tab active-color="#43578c" :line-width="nTabLineWidth">
            <tab-item :selected="sShowPageName === 'buy'" @on-item-click="onItemClick">{{ $t('orders.type.buy') }}</tab-item>
            <tab-item :selected="sShowPageName === 'sell'" @on-item-click="onItemClick">{{ $t('orders.type.sell') }}</tab-item>
            <tab-item :selected="sShowPageName === 'nowEntrust'" @on-item-click="onItemClick">{{ $t('header.open_orders') }}</tab-item>
            <tab-item :selected="sShowPageName === 'oldEntrust'" @on-item-click="onItemClick">{{ $t('header.order_history') }}</tab-item>
          </tab>
        </div>
        <div v-if="sShowPageName === 'buy' || sShowPageName === 'sell'" class="total-but-sell-div">
          <div class="buy-sell-div">
            <div v-if="sShowPageName === 'buy'">
              <buyentry/>
            </div>
            <div v-else>
              <sellentry/>
            </div>
            <div class="right-part-div">
              <p class="title-p">
                <span class="price-span">{{ $t('exchange.entry.price') }}({{isBid}})</span>
                <span class="num-span">{{ $t('exchange.entry.amount') }}({{isAsk}})</span>
              </p>
              <div class="ups-part-div">
                <ul>
                  <li
                    v-for="(data) in depthAsks"
                    :key="data[0]">
                    <span class="price-span">{{getPrice(data[0])}}</span>
                    <span class="num-span">{{getAmount(data[1])}}</span>
                  </li>
                </ul>
              </div>
              <div class="middle-part-div" :class="getLastTrend()">
                <span>{{ getLastPrice() }}</span>
                <span>{{ getChange() }}</span>
              </div>
              <div class="downs-part-div">
                <ul>
                  <li
                    v-for="(data) in depthBids"
                    :key="data[0]">
                    <span class="price-span">{{getPrice(data[0])}}</span>
                    <span class="num-span">{{getAmount(data[1])}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bottom-div">
            <div class="new-deal-div">
              <p class="title-p">{{ $t('exchange.card_head.market_trades') }}</p>
              <div class="table-title-div">
                <span>{{ $t('table.date') }}</span>
                <span class="text-right">{{ $t('exchange.entry.price') }}({{isBid}})</span>
                <span class="text-right">{{ $t('exchange.entry.amount') }}({{isAsk}})</span>
              </div>
              <div class="table-div">
                <ul>
                  <li v-for="data in this.$store.state.exchange.trades.array.slice(0, 100)">
                    <span>{{ fixTime(data.created_at) }}</span>
                    <span :class="`text-right ${getTrendType(data.taker_type)}`">{{ getPrice(data.price) }}</span>
                    <span class="text-right">{{ getAmount(data.volume) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="sShowPageName === 'nowEntrust'" class="now-entrust-div">
          <ordernow/>
        </div>
        <div v-else-if="sShowPageName === 'oldEntrust'" class="old-entrust-div">
          <orderold/>
        </div>
      </div>
    </div>
    <div class="product-list-div" v-transfer-dom>
      <popup class="product-list-popup" v-model="showProductListPopup" height="100%">
        <div class="title-div" style="text-align: center;">
          <img @click="showProductListPopup = false" src="@/assets/img/m/back.png" alt="" v-click-effect>
          <span>{{ $t('table.pair') }}</span>
        </div>
        <div class="search-div">
          <input type="text" name="" value="" v-model="search" :placeholder="$t('table.search')">
          <i class="icon-search"></i>
        </div>
        <div>
          <tab active-color="#43578c" :line-width="nTabLineWidth" v-model="nTabIndex">
            <tab-item
              v-for="(data, index) in [...$config.list_bid1, ...$config.list_bid2]"
              :key="index"
              @click.native="changeSelect(data)"
             >{{ $t("market_list.market", { market: data }) }}</tab-item>
          </tab>
        </div>
        <div class="product-table-div">
          <x-table :cell-bordered="false" style="background-color:#fff;">
            <tbody>
              <tr @click="MarketReload(data.name)" v-for="(data, index) in filteredTickers" :key="index">
                <td class="name-image-td">
                  {{ data.name }}
                  <p>
                    {{ $t('table.volume') }}{{ Number(Number(data.volume).toFixed(pricePrecision())).toLocaleString() }}
                  </p>
                </td>
                <td class="price-td" :class="getTrend(data.price_change_percent)">
                  {{ data.last }}
                </td>
                <td class="ups-downs-td" :class="getTrend(data.price_change_percent)">
                  {{ data.price_change_percent }}
                </td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </popup>
    </div>
    <div v-show="!bShowDefaultPage" class="charts-div">
      <p class="title-price-p">
        <span>{{ getLastPrice() }}</span>
        <span>{{ getChange() }}</span>
      </p>
      <ul class="detail-bottom-ul">
        <li>
          <span>{{ $t('table.h_volume') }}</span>
          <span>{{getVolume}}</span>
        </li>
        <li>
          <span>{{ $t('table.h_high') }}</span>
          <span>{{getHighPrice}}</span>
        </li>
        <li>
          <span>{{ $t('table.h_low') }}</span>
          <span>{{getLowPrice}}</span>
        </li>
      </ul>
      <div class="charts-options-div">
        <tab active-color="#43578c" :line-width="nTabLineWidth">
          <tab-item :selected="whChart === 'tradingview'" @on-item-click="clickChangeShowChart">{{ $t("exchange.card_head.candle") }}</tab-item>
          <tab-item :selected="whChart === 'depth'" @on-item-click="clickChangeShowChart">{{ $t("exchange.card_head.depth") }}</tab-item>
        </tab>
      </div>
      <div class="ivu-card-body chart">
        <depth :showing="whChart === 'depth'"/>
        <tradingview :showing="whChart === 'tradingview'"/>
      </div>
      <div class="order-div">
        <div class="order-title-div">
          <div class="">
            <span>{{ $t('exchange.entry.amount') }}</span>
            <span>{{ $t('exchange.entry.price') }}</span>
          </div>
          <div class="">
            <span>{{ $t('exchange.entry.price') }}</span>
            <span>{{ $t('exchange.entry.amount') }}</span>
          </div>
        </div>
        <div class="bat-chart-div">
          <div class="downs-chart-div">
            <ul>
              <li
                v-for="(data) in depthBids"
                :key="data[0]"
                class="order green-background"
                v-bind:style="{ backgroundSize:  (getAmount(data[1]) / max.bids * 100).toFixed(0) + '% 100%' }">
                <span class="price-span">{{getPrice(data[0])}}</span>
                <span class="text-center amount">{{getAmount(data[1])}}</span>
              </li>
            </ul>
          </div>
          <div class="ups-chart-div">
            <ul>
              <li
                v-for="(data) in depthAsks"
                :key="data[0]"
                class="order red-background"
                v-bind:style="{ backgroundSize:  (getAmount(data[1]) / max.asks * 100).toFixed(0) + '% 100%' }"
                >
                <span class="price-span">{{getPrice(data[0])}}</span>
                <span class="text-center amount">{{getAmount(data[1])}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="operation-div">
        <button @click="clickChartOperationButton(0)" type="button" name="button" v-click-effect>{{ $t('orders.type.buy') }}</button>
        <button @click="clickChartOperationButton(1)" type="button" name="button" v-click-effect>{{ $t('orders.type.sell') }}</button>
        <button @click="clickChartOperationButton(2)" type="button" name="button" v-click-effect>{{ $t('button.back') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import {
  isMarket,
  getMarketLastPrice,
  getMarketLastUSD,
  getMarketPriceChange,
  getMarketLowPrice,
  getOverrides,
  getStudiesOverrides,
  amountPrecision,
  pricePrecision,
  isBidSymbol,
  isAskSymbol,
  getTickerPriceUSD,
  translation,
  trendType
} from "@/helpers";
import { Tab, TabItem, Popup, XTable, Search, Checker, CheckerItem } from 'vux'
import buyentry from "@/mobile_layouts/trading_center/entry/_buy_entry.vue"
import sellentry from "@/mobile_layouts/trading_center/entry/_sell_entry.vue"
import ordernow from "@/mobile_layouts/trading_center/control/orders_now.vue"
import orderold from "@/mobile_layouts/trading_center/control/orders_old.vue"

import tradingview from "@/layouts/exchange/chart/_tradingview.vue";
import depth from "@/layouts/exchange/chart/_depth.vue";
export default {
  components: {
    tradingview, depth,
    Tab, TabItem, Popup, XTable, Search, Checker, CheckerItem, buyentry, sellentry, ordernow, orderold
  },
  data () {
    return {
      showing: true,
      bShowDefaultPage: true,
      isSelected: '',
      search: '',
      sortBy: "volume",
      sortReverse: true,
      isHideMarketList: false,
      checked: false,
      identifier: 0,
      market: null,
      isBid: "",
      isAsk: "",
      whShow: "normal",
      max: {
        bids: 0,
        asks: 0
      },
      nTabLineWidth: 1,
      sShowPageName: 'buy',
      showProductListPopup: false,
      oBuyShowText: {
      },
      oSellShowText: {
      },
      nTabIndex: 0,
      isShowing: false,
      whChart: "tradingview"
    }
  },
  watch: {
  },
  computed: {
    getHighPrice() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return getMarketLastPrice() > Number(ticker.high)
        ? getMarketLastPrice()
        : Number(ticker.high).toFixed(pricePrecision());
    },
    getLowPrice() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return getMarketLastPrice() < Number(ticker.low)
        ? getMarketLastPrice()
        : Number(ticker.low).toFixed(pricePrecision());
    },
    getVolume() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      return (
        Number(Number(ticker.volume).toFixed(pricePrecision())).toLocaleString() +
        " " +
        isBidSymbol().toUpperCase()
      );
    },
    filteredTickers() {
      const all_tickers = this.$store.state.public.tickers;
      // window.console.log(all_tickers)
      let tickers = Object.values(all_tickers);
      const Sorts = [
        "name",
        "name_ccy",
        "last",
        "change",
        "high",
        "low",
        "volume"
      ];
      for (var i in all_tickers) {
        all_tickers[i].name_ccy = this.getNameCurrencies(
          all_tickers[i].base_unit
        );
      }
      tickers = tickers.filter(ticker => {
        if (this.isSelected.toLowerCase() === "Favorite".toLowerCase()) {
          if (this.search) {
            return (
              (ticker["base_unit"]
                .toLowerCase()
                .includes(this.search.toLowerCase()) &&
                this.checkFavorite(ticker.name)) ||
              (ticker["name_ccy"]
                .toLowerCase()
                .includes(this.search.toLowerCase()) &&
                this.checkFavorite(ticker.name))
            );
          } else {
            return this.checkFavorite(ticker.name);
          }
        } else if (this.search) {
          return (
            (ticker["base_unit"]
              .toLowerCase()
              .includes(this.search.toLowerCase()) &&
              this.isSelected.toLowerCase() ===
                ticker["quote_unit"].toLowerCase()) ||
            (ticker["name_ccy"]
              .toLowerCase()
              .includes(this.search.toLowerCase()) &&
              this.isSelected.toLowerCase() ===
                ticker["quote_unit"].toLowerCase())
          );
        } else {
          return (
            this.isSelected.toLowerCase() === ticker["quote_unit"].toLowerCase()
          );
        }
      });
      if (!this.sortReverse) {
        for (const sortBy of Sorts) {
          if (this.sortBy === sortBy)
            return tickers.sort((l, h) => l[sortBy] > h[sortBy]);
        }
      } else {
        for (const sortBy of Sorts) {
          if (this.sortBy === sortBy)
            return tickers.sort((l, h) => l[sortBy] > h[sortBy]).reverse();
        }
      }
      return []
    },
    depthAsks() {
      const data =
        JSON.parse(JSON.stringify(this.$store.state.exchange.depth.asks)) || [];
      this.max.ask = 0;
      data.map(e => (this.max.asks += Number(e[1])));
      return data.reverse();
    },
    depthBids() {
      const data =
        JSON.parse(JSON.stringify(this.$store.state.exchange.depth.bids)) || [];
      this.max.bid = 0;
      data.map(e => (this.max.bids += Number(e[1])));
      return data;
    }
  },
  beforeCreate() {
    this.$store.dispatch("exchange/getMarketDepth");
    this.$store.dispatch("exchange/getMarketTrades");
  },
  methods: {
    getTrendType: taker_type => trendType(taker_type),
    getLastTrend: () => (getMarketPriceChange() >= 0 ? "text-up" : "text-down"),
    getTrend(price_change_percent) {
      const chance = price_change_percent.split("%")[0];
      return chance >= 0 ? "text-up" : "text-down";
    },
    clickShowListPage () {
      this.showProductListPopup = true
      this.nTabIndex = [...this.$config.list_bid1, ...this.$config.list_bid2].indexOf(this.isBid)
      this.changeSelect(isBidSymbol())
    },
    MarketReload($market) {
      const marketArray = $market.split("/");
      const market = marketArray.join("_");
      this.$store.commit("public/SYNC_EXCHANGE", market);
      this.showProductListPopup = false
      this.isAsk = isAskSymbol().toUpperCase();
      this.isBid = isBidSymbol().toUpperCase();
      //this.$router.go()
    },
    getPrice(price) {
      return Number(price).toFixed(pricePrecision());
    },
    getAmount(amount) {
      return Number(amount).toFixed(amountPrecision());
    },
    fixTime(created_at) {
      const date = new Date(created_at);
      return (
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2)
      );
    },
    async forceRerender(market) {
      this.identifier += 1;
      await this.removeLoad(market);
      await this.LoadData();
      await this.onLoad();
    },
    LoadData() {
      this.$store.dispatch("exchange/getMarketDepth");
      this.$store.dispatch("exchange/getMarketTrades");
    },
    getNameCurrencies(currency) {
      const currencies = this.$store.getters["public/getAllCurrencies"];
      for (var i in currencies) {
        if (currencies[i].id === currency) {
          return currencies[i].name;
        }
      }
    },
    removeLoad(market) {
      const channel = market;
      store.dispatch("websocket/unsubscribe", channel);
    },
    onLoad() {
      this.setTitle();
      const channel = isMarket();
      store.dispatch("websocket/subscribe", channel);
    },
    setTitle() {
      document.title = `${getMarketLastPrice()} - ${(
        isAskSymbol() +
        "/" +
        isBidSymbol()
      ).toUpperCase()} - ${this.$config.nameEX}`;
    },
    onItemClick (e) {
      if (e === 0) {
        this.sShowPageName = 'buy'
      } else if (e === 1) {
        this.sShowPageName = 'sell'
      } else if (e === 2 || e === 3) {
        if (this.$store.state.user.status !== "success") {
          this.$router.push({path: '/m/login'})
        } else {
          if (e === 2) {
            this.sShowPageName = 'nowEntrust'
          } else if (e === 3) {
            this.sShowPageName = 'oldEntrust'
          }
        }
      }
    },
    clickChangeShowChart (e) {
      if (e === 1) {
        this.whChart = 'depth'
      } else {
        this.whChart = 'tradingview'
      }
    },
    getDepth(side) {
      if (side === "asks") return this.depthAsks;
      else return this.depthBids;
    },
    findIndexOrder(depth, order) {
      for (const i in depth) {
        if (order[0] === depth[i][0]) return i;
      }
    },
    onRowClicked(side, order) {
      const depth = this.getDepth(side);
      const indexOrder = this.findIndexOrder(depth, order);
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
    // getVolume: (price, amount) => (price * amount).toFixed(pricePrecision()),
    pricePrecision: () => pricePrecision(),
    getLastPrice: () => getMarketLastPrice(),
    getChange() {
      const ticker = this.$store.getters["public/getAllTickers"][isMarket()];
      if (ticker) return ticker.price_change_percent;
      else return "-.--%";
    },
    getLastPriceUSD: (ticker, last) => getTickerPriceUSD(ticker, last),
    changeSelect(symbol) {
      this.isSelected = symbol.toUpperCase();
    },
    clickShowChartsPage: function () {
      this.bShowDefaultPage = false
      this.$emit('changeAppFooterStatus', false)
      //  修改图表时间选择器 拖拽提示颜色
      var _t = setInterval(() => {
        if (document.getElementsByTagName('iframe') && document.getElementsByTagName('iframe')[0].contentWindow) {
          document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('style')[0].innerText += '.fadeLeft-31arUEZY- {opacity: .2} .fadeRight-36gcjOQb- {opacity: .2}'
          clearInterval(_t)
        }
      }, 500)
    },
    clickChartOperationButton: function (e) {
      this.bShowDefaultPage = true
      if (e === 0) {
        this.sShowPageName = 'buy'
      } else if (e === 1) {
        this.sShowPageName = 'sell'
      }
      this.$emit('changeAppFooterStatus', true)
    }
  },
  mounted () {
    this.isAsk = isAskSymbol().toUpperCase();
    this.isBid = isBidSymbol().toUpperCase();
    this.onLoad();
    this.$EventBus.$on("reRenderExchange", market => this.forceRerender(market))
    this.$EventBus.$on("hideMarketList", type => this.isHideMarketList = type);
    this.whChart = 'tradingview'
    this.$EventBus.$on(
      "MarketListShowing",
      showing => (this.isShowing = showing)
    );
  },
  created: function () {
    this.$emit('changeAppFooterStatus', true)
  },
  destroyed() {
    this.removeLoad(isMarket());
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.trading-center-body
  position: relative
  min-height: 100vh
  color: #333
  background-color: #f6f6f6
  .top-div
    background-color: #fff
    height: px2rem(50px)
    position: relative
    line-height: px2rem(50px)
    span
      margin-left: px2rem(20px)
      font-size: px2rem(14px)
      margin-right: px2rem(4px)
    .charts-img
      position: absolute
      top: px2rem(20px)
      right: px2rem(20px)
      width: px2rem(24px)
  .main-body
    .total-but-sell-div
      background-color: #fff
      .buy-sell-div
        overflow: auto
        color: #333
        .left-part-div
          .button
            margin-top: 0.6rem;
        .right-part-div
          position: relative
          float: right
          width: 46%
          margin: 0 2%
          p, span
            font-size: px2rem(12px)
            line-height: px2rem(20px)
          .title-p
            overflow: auto
            color: #888
            margin-top: px2rem(10px)
            .price-span
              float: left
              margin-left: px2rem(10px)
            .num-span
              float: right
              margin-right: px2rme(10px)
          .downs-part-div, .ups-part-div
            width: 100%
            height: 2.8rem
            margin-top: 0.2rem
            overflow-y: auto
            ul
              margin-left: 0.3rem
              li
                position: relative
                font-size: 1rem
                line-height: 0.1rem
                list-style: none
              .num-span
                position: absolute
                right: 0
          .downs-part-div
            .price-span
              color: #2eb34b
          .ups-part-div
            .price-span
              color: #fa5757
          .middle-part-div
            overflow: auto
            border-top: 1px solid #777
            border-bottom: 1px solid #777
            padding: px2rem(4px) 0 px2rem(4px) px2rem(10px)
            font-size: px2rem(10px)
            line-height: px2rem(30px)
            span:first-child
              float: left
            span:last-child
              float: right
      .bottom-div
        margin: 0 px2rem(10px) 50px px2rem(10px)
        .new-deal-div
          .title-p
            font-size: px2rem(14px)
            line-height: px2rem(36px)
            border-top: px2rem(4px) solid #eee
          .table-title-div
            border-top: 1px solid #bbb
            display: flex
            justify-content: space-between
            font-size: px2rem(10px)
            line-height: px2rem(30px)
            color: #bbb
            span
              flex: 1
          .table-div
            ul
              height: px2rem(300px)
              overflow-y: auto
              font-size: px2rem(10px)
              li
                display: flex
                justify-content: space-between
                span
                  flex: 1
  .now-entrust-div
    position: relative
    font-size: px2rem(14px)
  .old-entrust-div
    position: relative
    font-size: px2rem(14px)
  .charts-div
    background-color: #0f0f10
    min-height: 100vh
    width: 100%
    position: relative
    .title-price-p
      color: #fff
      font-size: px2rem(20px)
      padding-top: px2rem(10px)
      span:first-child
        color: #fa5757
        font-size: px2rem(22px)
        margin-left: px2rem(10px)
      span:last-child
        font-size: px2rem(12px)
        margin-left: px2rem(8px)
    .detail-bottom-ul
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 px2rem(10px)
      li
        display: flex
        flex-direction: column
        span
          font-size: px2rem(12px)
        span:first-child
          color: #80868a
        span:last-child
          color: #fff
    .charts-options-div
      height: px2rem(30px)
      margin-top: px2rem(10px)
      border-bottom: 1px solid #3d4455
      font-size: px2rem(16px)
      background-color: #23262d
      .vux-tab
        background-color: transparent
        .vux-tab-item
          line-height: px2rem(30px)
          height: px2rem(30px)
      .vux-tab-ink-bar
        display: none !important
    .chart
      margin: 0 auto
      width: px2rem(370px)
      height: px2rem(310px)
      #tv_chart_container, #depth_chart
        height: 100%
    .order-div
      padding-bottom: px2rem(52px)
      .order-title-div
        display: flex
        font-size: px2rem(14px)
        height: px2rem(26px)
        line-height: px2rem(26px)
        border-bottom: 1px solid #3d4455
        color: #80868a
        background-color: #23262d
        div
          flex: 1
          display: flex
          padding: 0 px2rem(8px)
          span
            flex: 1
          span:last-child
            text-align: right
      .bat-chart-div
        font-size: px2rem(12px)
        width: 100%
        display: flex
        .downs-chart-div
          color: #2eb34b
          .green-background
            background-image: linear-gradient(rgba(18, 184, 134, 0.15), rgba(18, 184, 134, 0.15))
            background-position: right
            background-size: 0 0
            background-repeat: no-repeat
        .ups-chart-div
          color: #fa5757
          .red-background
            background-image: linear-gradient(rgba(250, 82, 82, 0.15), rgba(250, 82, 82, 0.15))
            background-position: 0
            background-size: 0 0
            background-repeat: no-repeat
        .downs-chart-div, .ups-chart-div
          overflow: auto
          display: inline-block
          padding: 0 px2rem(8px)
          height: px2rem(270px)
          flex: 1
          ul
            box-sizing: border-box
            li
              display: flex
              span
                flex: 1
              span:last-child
                text-align: right
    .operation-div
      position: fixed
      bottom: 0
      text-align: center
      background-color: #23262d
      width: 100%
      height: px2rem(50px)
      font-size: px2rem(20px)
      line-height: px2rem(46px)
      button
        width: px2rem(100px)
        height: px2rem(36px)
        line-height: px2rem(36px)
        border-radius: px2rem(10px)
        color: #fff
        border: none
        vertical-align: middle
      button:nth-child(1)
        background-color: #2eb34b
      button:nth-child(2)
        background-color: #fa5757
        margin-left: 10px
        margin-right: 10px
      button:nth-child(3)
        background-color: #a4a4a4
.product-list-popup
  color: #333
  .title-div
    width: 100%
    background-color: #fff
    height: px2rem(50px)
    line-height: px2rem(50px)
    padding: 0
    img
      position: absolute
      top: px2rem(10px)
      left: px2rem(10px)
      width: px2rem(28px)
    span
      font-size: px2rem(20px)
  .search-div
    background-color: #fff
    position: relative
    height: px2rem(50px)
    line-height: 0
    input
      height: px2rem(30px)
      width: px2rem(300px)
      padding-left: px2rem(30px)
      font-size: px2rem(12px)
      margin: px2rem(20px) 0 0 px2rem(37.5px)
      border-radius: px2rem(10px)
      border: none
      vertical-align: middle
      background-color: #f3f5f7
    .icon-search
      position: absolute
      left: px2rem(42px)
      top: px2rem(27px)
      width: px2rem(16px)
      height: px2rem(16px)
      background-size: 100% 100%
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NENEMEMxRkVGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NENEMEMxRkZGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0Q0QwQzFGQ0ZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0Q0QwQzFGREZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk3k9tMAAAIDSURBVHjatJZLKERRGMfvGM+8WRnkFUk2GuSx8NhYjNQokoVSslBkzcIOKRtloYwslCwoKWXhUUiisJVnmQVqkLcZw//oPzVx7rhzh69+zbl35tzf+c7ju2Mwm82KhggHYeBO0RFBKvdDQTOYAZfgGdyCF7AFekGGVolBkkk9GAJZXvcegBPEeg3sDYyBHn6vKRMjHz5LwT5oBSYQDRJAJKgENvbtZGZZWjMZBR3giZ0ngdtH3xwwBYrABSgBdl+ZNFEgpqAGTPwiEHEIKsAmSKHQoCaJAMO8Fhls+LFxxIawcnOIaWxUkzRw3vfAuI4deg362O5Wk1jZtmmYIrWYYlZiXZJkEs/KLyr64xGss22WSUxsnymBxSk/pZm4vUpHIOHp75JJPHs7I0BJOj/tMsk22zUBCES5KeWs7Mgkc2y3g2CdkjYW1WVwoyY5BrmgS4cgmVVZ8TrUPyQunvQPMADq/BAkgnkQz/q1KvuR0WT62sFHFFazNHxwrd59CMrAEsjjdQwoZBV3ySQi1vjQKspaQBSr8h3FKcxUZDwI4rjQLdw4BaCYS+D09dISkhGQr+GUizXoB69c02UebjFttRygVKKwZFdz1JXMIAQ4wAFY4Ggd3/plU5TKMmMB9waNfyT8iUywAtL4rrEEKX8fJ3yZiVpWDqb/QyLinKJdcPUpwACpSnC1pBQyvgAAAABJRU5ErkJggg==')
    span
      position: relative
      top: px2rem(10px)
      margin-left: px2rem(10px)
      font-size: px2rem(14px)
      vertical-align: middle
  .product-table-div
    font-size: px2rem(14px)
    .name-image-td
      padding: px2rem(6px) 0
      line-height: px2rem(24px)
      p
        font-size: px2rem(12px)
        color: #8f9fb9
    .name-amount-td
      padding: px2rem(16px) 0
      font-size: px2rem(14px)
      line-height: px2rem(20px)
      p
        font-size: px2rem(14px)
      span
        font-size: px2rem(12px)
        color: #8f9fb9
    .price-td
      font-size: px2rem(14px)
      line-height: px2rem(20px)
    .ups-downs-td
      p
        line-height: px2rem(24px)
        font-size: px2rem(12px)
        border-radius: px2rem(4px)
        color: #fff
      .ups
        background-color: #0bad48
      .downs
        background-color: #fb5d6c
</style>
