<template lang="html">
  <div class="index-body">
    <div class="top-div">
      <div class="">
        <img class="logo-img" src="@/assets/img/logo.png" alt="">
        <span class="title">GIH</span>
      </div>
      <div class="swiper-div">
        <div class="swiper-title-div">
          <img src="@/assets/img/m/download-1.png" alt="">
        </div>
        <!--<swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
          <swiper-item><p @click="clickAnnouncement(0)">xxxxxxxxxxxxxxxxxxxxx任务</p></swiper-item>
          <swiper-item><p @click="clickAnnouncement(1)">xxxxxxxxxxxxxxxxxxxxx礼包</p></swiper-item>
          <swiper-item><p @click="clickAnnouncement(2)">xxxxxxxxxxxxxxxxxxxxx任务</p></swiper-item>
          <swiper-item><p @click="clickAnnouncement(3)">xxxxxxxxxxxxxxxxxxxxx</p></swiper-item>
          <swiper-item><p @click="clickAnnouncement(4)">xxxxxxxxxxxxxxxxxxxxx红包</p></swiper-item>
          <swiper-item><p @click="clickAnnouncement(5)">xxxxxxxxxxxxxxxxxxxxx礼包</p></swiper-item>
        </swiper>-->
      </div>
      <div class="">
        <tab active-color="#43578c" :line-width="nTabLineWidth" v-model="nTabIndex" prevent-default @on-before-index-change="switchTabItem">
          <tab-item
            v-for="(data, index) in [...$config.list_bid1, ...$config.list_bid2]"
            :key="index"
            @click.native="changeSelect(data)"
           >{{ $t("market_list.market", { market: data }) }}</tab-item>
        </tab>
      </div>
    </div>
    <div class="table-div">
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th
              v-for="(data, index) in sorts"
              :key="index">
              {{ $t("table." + data.text) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in filteredTickers" :key="index" @click="MarketJoin(data.name)">
            <!--<td class="name-amount-td">
              {{ data.name_ccy }}
            </td>
            -->
            <td class="name-image-td">
              {{ data.name }}
              <p>{{ $t("table.volume") }}  {{ Number(Number(data.volume).toFixed(pricePrecision())).toLocaleString() }}</p>
            </td>
            <td class="price-td" :class="getTrend(data.price_change_percent)">
              {{ data.last }}
              <!-- <i
                class="price-usd"
              ></i> -->
            </td>
            <!-- <td>
              {{ data.high }}
            </td>
            <td>
              {{ data.low }}
            </td> -->
            <td class="ups-downs-td" :class="getTrend(data.price_change_percent)">
              {{ data.price_change_percent }}
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div v-transfer-dom>
      <loading :show="bShowLoading" class="loading" text=""></loading>
    </div>
  </div>
</template>

<script>
import {
  getTickerPriceUSD,
  pricePrecision,
  checkFavorite,
  AddOrRemoveFavorite
} from "@/helpers"
import { Loading, XTable, Tab, TabItem, Swiper, SwiperItem } from 'vux'
// import { allTickers } from '@/api/getData'
export default {
  components: {
    Loading, XTable, Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      isSelected: "",
      search: "",
      nTabIndex: 0,
      nTabLineWidth: 1,
      bShowLoading: false,
      sortBy: "volume",
      sortReverse: true,
      sorts: [
        //{ sortBy: "name_ccy", text: "coin" },
        { sortBy: "name", text: "pair_volume" },
        { sortBy: "last", text: "last_price" },
        { sortBy: "change", text: "h_change" },
      ]
    }
  },
  methods: {
    switchTabItem (e) {
      this.nTabIndex = e
    },
    clickAnnouncement () {
      this.$router.push({path: '/m/announcement'})
    },
    pricePrecision: () => pricePrecision(),
    checkFavorite: ticker => checkFavorite(ticker),
    AddOrRemoveFavorite: ticker => AddOrRemoveFavorite(ticker),
    getLastPriceUSD: (ticker, last) => getTickerPriceUSD(ticker, last),
    getTrend(price_change_percent) {
      const chance = price_change_percent.split("%")[0];
      return chance >= 0 ? "text-up" : "text-down";
    },
    getNameCurrencies(currency) {
      const currencies = this.$store.getters["public/getAllCurrencies"];
      for (var i in currencies) {
        if (currencies[i].id === currency) {
          return currencies[i].name;
        }
      }
    },
    changeSort(sort) {
      this.sortBy = sort;
      this.sortReverse = !this.sortReverse;
    },
    changeSelect(symbol) {
      this.isSelected = symbol.toUpperCase();
    },
    MarketJoin($market) {
      const marketArray = $market.split("/");
      const market = marketArray.join("_");
      this.$store.commit("public/SYNC_EXCHANGE", market);
    }
  },
  mounted () {
    this.isSelected = this.$config.list_bid1[0];
  },
  computed: {
    filteredTickers() {
      const all_tickers = this.$store.state.public.tickers;
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
    }
  },
  created: function () {
    this.$emit('changeAppFooterStatus', true)
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.index-body
  position: relative
  min-height: 100vh
  background-color: #f6f6f6
  color: #333
  .top-div
    background-color: #fff
    position: relative
    .logo-img
      position: relative
      top: px2rem(8px)
      left: px2rem(10px)
      width: px2rem(40px)
    .title
      position: relative
      left: px2rem(12px)
      top: px2rem(-8px)
      font-size: px2rem(14px)
      font-weight: 500
    .top-search-div
      height: px2rem(20px)
      width: px2rem(160px)
      position: absolute
      top: px2rem(20px)
      right: px2rem(60px)
      display: inline-block
      input
        position: absolute
        top: 0
        font-size: px2rem(12px)
        width: px2rem(150px)
        background-color: #f3f5f7
        border: none
        outline: none
        height: px2rem(20px)
        padding: px2rem(2px) px2rem(30px) px2rem(2px) px2rem(10px)
        border-radius: px2rem(10px)
      img
        top: px2rem(2px)
        right: 0
        margin-right: px2rem(-20px)
        position: absolute
        width: px2rem(16px)
    .swiper-div
      background-color: #eef3fd
      overflow: auto
      border-radius: px2rem(10px)
      width: 90%
      margin: 0.5rem auto 0 auto
      .swiper-title-div
        width: 20%
        float: left
        font-size: px2rem(14px)
        line-height: 30px
        img
          top: px2rem(4px)
          left: px2rem(2px)
          position: relative
          width: px2rem(20px)
          margin: 0 px2rem(4px) 0 px2rem(2px)
      .text-scroll
        width: 80%
        float: right
        p
          font-size: 12px
          line-height: 30px
    .vux-tab-wrap
      height: 36px
      .vux-tab-container
        height: 36px
        .vux-tab
          height: 36px
          .vux-tab-item
            padding: 0 px2rem(4px)
            font-size: px2rem(12px)
  .table-div
    background-color: #fff
    font-size: px2rem(14px)
    padding: 0 px2rem(10px)
    margin-top: px2rem(10px)
    th
      font-size: px2rem(10px)
      color: #888
      line-height: px2rem(40px)
      height: px2rem(40px)
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
    .price-usd
      color: #333
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
