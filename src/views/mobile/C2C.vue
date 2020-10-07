<template lang="html">
  <div class="c2c-body">
    <div v-show="sShowPage === 'default'" class="default-div">
      <div class="top-div">
        <div class="">
          <img class="logo-img" src="@/assets/img/logo.png" alt="">
          <span class="title">GIH</span>
          <div @click="sShowPage = 'sell'" class="top-sell-div">
            <span>{{$t('usercenter.c2c.publish')}} </span>
            <img src="@/assets/img/m/download-11.png" alt="">
          </div>
        </div>
        <tab v-model="nShowBuyTableOrOrderPage" active-color="#43578c" :line-width="nTabLineWidth">
          <tab-item selected @on-item-click="onItemClick">{{$t('usercenter.c2c.sell')}}</tab-item>
          <tab-item @on-item-click="onItemClick">{{$t('usercenter.c2c.management')}}</tab-item>
        </tab>
      </div>
      <div v-if="nShowBuyTableOrOrderPage === 0" class="buy-table-div">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>{{$t('usercenter.c2c.advertiser')}}</th>
              <th>{{$t('usercenter.c2c.price')}}</th>
              <th>{{$t('usercenter.c2c.limit')}}</th>
              <th>{{$t('usercenter.c2c.action')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in oC2cPageInfo.sellTableData">
              <td>{{item.user.uid}}</td>
              <td>
                <p><span class="price-num">{{item.price}}</span>CNY</p>
                <!-- <p>成交量<span>60</span></p> -->
              </td>
              <td class="can-buy-td">
                <p>{{item.min_count}}-{{item.max_count}}</p>
              </td>
              <td>
                <button :id="index" @click="clickBuyC2cButton" class="buy-button" type="button" name="button" v-click-effect>{{$t('orders.type.buy')}}</button>
              </td>
            </tr>
          </tbody>
        </x-table>
        <p class="page-number-p">
          <!-- <span @click="clickReductionPageNUmber()" v-click-effect><</span>
          <span @click="clickChangePageNumber(0)" :class="nPageNumberIndex === 0 ? 'selected' : ''">1</span>
          <span @click="clickChangePageNumber(1)" :class="nPageNumberIndex === 1 ? 'selected' : ''">2</span>
          <span @click="clickChangePageNumber(2)" :class="nPageNumberIndex === 2 ? 'selected' : ''">3</span>
          <span @click="clickAddPageNUmber()" v-click-effect>></span> -->
          <el-pagination
            layout="prev, pager, next"
            :page-count="oC2cPageInfo.nTotalPage"
            @current-change="handleCurrentChange"
            >
          </el-pagination>
        </p>

      </div>
      <div v-else class="order-div">
        <p class="title-p">
          <button @click="changeOrderTitleTabIndex(0)" :class="nOrderTitleTabIndex === 0 ? 'selected' : ''" type="button" name="button">我的卖单</button>
          <button @click="changeOrderTitleTabIndex(1)" :class="nOrderTitleTabIndex === 1 ? 'selected' : ''" type="button" name="button">我的买单</button>
        </p>
        <p class="tab-p">
          <button @click="changeOrderTabIndex(0)" :class="activeName === 0 ? 'selected' : ''" type="button" name="button">未付款</button>
          <button @click="changeOrderTabIndex(1)" :class="activeName === 1 ? 'selected' : ''" type="button" name="button">已付款</button>
          <button @click="changeOrderTabIndex(2)" :class="activeName === 2 ? 'selected' : ''" type="button" name="button">已完成</button>
          <button @click="changeOrderTabIndex(3)" :class="activeName === 3 ? 'selected' : ''" type="button" name="button">已取消</button>
          <button @click="changeOrderTabIndex(4)" :class="activeName === 4 ? 'selected' : ''" type="button" name="button">申诉</button>
        </p>
        <!-- 卖单 -->
        <div v-if="nOrderTitleTabIndex === 0" class="">
          <!-- 我的卖单 未付款 -->
          <div v-show="activeName === 0" class="">
            <div v-for="item in oC2cOrderPageInfo.aSellUnpaidList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.token_type}}</span>
                <span>卖出</span>
                <span>订单号：{{item.advertisement.ad_number}}</span>
              </p>
              <p>30分钟之后买家未付款，订单将超时关闭</p>
              <p>交易时间：<span>{{item.created_at}}</span></p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>等待买家付款</span>
              </p>
            </div>
          </div>
          <!-- 我的卖单 已付款 -->
          <div v-show="activeName === 1" class="">
            <div v-for="item in oC2cOrderPageInfo.aSellPaidList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.token_type}}</span>
                <span>卖出</span>
                <span>订单号：{{item.advertisement.ad_number}}</span>
              </p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <button @click="sellPutCoinOrder(item.order_id)" type="button" name="button">打币</button>
                <button @click="appealOrder([item.order_id, item.order_number])" type="button" name="button">申诉</button>
              </p>
            </div>
          </div>
          <!-- 我的卖单 已完成 -->
          <div v-show="activeName === 2" class="">
            <div v-for="item in oC2cOrderPageInfo.aSellFinishList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.token_type}}</span>
                <span>卖出</span>
                <span>订单号：{{item.advertisement.ad_number}}</span>
              </p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>交易完成</span>
                <button @click="appealOrder([item.order_id, item.order_number])" type="button" name="button">申诉</button>
              </p>
            </div>
          </div>
          <!-- 我的卖单 已取消 -->
          <div v-show="activeName === 3" class="">
            <div v-for="item in oC2cOrderPageInfo.aSellCancelList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.token_type}}</span>
                <span>卖出</span>
                <span>订单号：{{item.advertisement.ad_number}}</span>
              </p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>已取消</span>
              </p>
            </div>
          </div>
          <!-- 我的卖单 申诉中 -->
          <div v-show="activeName === 4" class="">
            <div v-for="item in oC2cOrderPageInfo.aSellAppealList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.token_type}}</span>
                <span>卖出</span>
                <span>订单号：{{item.advertisement.ad_number}}</span>
              </p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>申诉中</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 买单 -->
        <div v-if="nOrderTitleTabIndex === 1" class="">
          <!-- 我的买单 未付款 -->
          <div v-show="activeName === 0" class="">
            <div v-for="item in oC2cOrderPageInfo.aBuyUnpaidList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.currency_type}}</span>
                <span>买入</span>
                <span>订单号：{{item.order_number}}</span>
              </p>
              <p>请在30分钟内完成交易</p>
              <p>收款账户：<span>(卖家 {{item.advertisement.user.uid}})</span></p>
              <!--<p>{{item.advertisement.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>联系方式：<span>{{item.advertisement.user.mobile}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <button @click="cancelOrder(item.order_id)" type="button" name="button">确认付款</button>
                <button @click="buyConfirmOrder(item.order_id)" type="button" name="button">取消订单</button>
              </p>
            </div>
          </div>
          <!-- 我的买单 已付款 -->
          <div v-show="activeName === 1" class="">
            <div v-for="item in oC2cOrderPageInfo.aBuyPaidList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.currency_type}}</span>
                <span>买入</span>
                <span>订单号：{{item.order_number}}</span>
              </p>
              <p>收款账户：<span>(卖家 {{item.advertisement.user.uid}})</span></p>
              <!--<p>{{item.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>联系方式：<span>{{item.advertisement.user.mobile}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>等待卖家打币</span>
                <button @click="appealOrder([item.order_id, item.order_number])" type="button" name="button">申诉</button>
              </p>
            </div>
          </div>
          <!-- 我的买单 已完成 -->
          <div v-show="activeName === 2" class="">
            <div v-for="item in oC2cOrderPageInfo.aBuyFinishList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.currency_type}}</span>
                <span>买入</span>
                <span>订单号：{{item.order_number}}</span>
              </p>
              <p>完成时间：<span>2019-07-07 11:11:11</span></p>
              <p>交易时间：<span>{{item.created_at}}</span></p>
              <p>收款账户：<span>(卖家 {{item.advertisement.user.uid}})</span></p>
              <!--<p>{{item.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>联系方式：<span>{{item.advertisement.user.mobile}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>已完成</span>
                <button @click="appealOrder([item.order_id, item.order_number])" type="button" name="button">申诉</button>
              </p>
            </div>
          </div>
          <!-- 我的买单 已取消 -->
          <div v-show="activeName === 3" class="">
            <div v-for="item in oC2cOrderPageInfo.aBuyCancelList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.currency_type}}</span>
                <span>买入</span>
                <span>订单号：{{item.order_number}}</span>
              </p>
              <p>收款账户：<span>(卖家 {{item.advertisement.user.uid}})</span></p>
              <!--<p>{{item.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>联系方式：<span>{{item.advertisement.user.mobile}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>交易取消</span>
                <button @click="appealOrder([item.order_id, item.order_number])" type="button" name="button">申诉</button>
              </p>
            </div>
          </div>
          <!-- 我的买单 申诉中 -->
          <div v-show="activeName === 4" class="">
            <div v-for="item in oC2cOrderPageInfo.aBuyAppealList" class="order-item-div">
              <p class="title">
                <span>{{item.advertisement.currency_type}}</span>
                <span>买入</span>
                <span>订单号：{{item.order_number}}</span>
              </p>
              <p>收款账户：<span>(卖家 {{item.advertisement.user.uid}})</span></p>
              <!--<p>{{item.payment_method}}&#12288;：<span class="important-color">Name|xxxxxxxx</span></p>-->
              <p>付款码&#12288;：<span>{{item.code}}</span></p>
              <p>联系方式：<span>{{item.advertisement.user.mobile}}</span></p>
              <p>交易价格：<span>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</span></p>
              <p>数&#12288;&#12288;量：<span>{{item.amount}}{{item.advertisement.token_type}}</span></p>
              <p>金&#12288;&#12288;额：<span>{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</span></p>
              <p>备&#12288;&#12288;注：<span>{{item.advertisement.remark}}</span></p>
              <p>
                <span>申诉中</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="sShowPage === 'sell'" class="sell-div">
      <sell/>
    </div>
    <div v-if="sShowPage === 'buy'" class="buy-div">
      <buy v-bind:data="oBuyData" @childFun="createBuyOrder"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import buy from '@/mobile_layouts/c2c/buy.vue'
import sell from '@/mobile_layouts/c2c/sell.vue'
import { Tab, TabItem, XTable, Checker, CheckerItem } from 'vux'
import { Pagination } from 'element-ui'

Vue.use(Pagination)
export default {
  components: {
    Tab, TabItem, XTable, Checker, CheckerItem, buy, sell
  },
  data () {
    return {
      sShowPage: 'default', //  default sell buy
      nPageNumberIndex: 0,
      nTabLineWidth: 1,
      nShowBuyTableOrOrderPage: 0,
      nOrderTitleTabIndex: 0,
      activeName: 0,
      oC2cPageInfo: {
        nBuyTablePageNumber: 1,
        sellTableData: [],
        nTotalPage: 1
      },
      oC2cOrderPageInfo: {
        aSellUnpaidList: [],
        aSellPaidList: [],
        aSellFinishList: [],
        aSellCancelList: [],
        aSellAppealList: [],
        aBuyUnpaidList: [],
        aBuyPaidList: [],
        aBuyFinishList: [],
        aBuyCancelList: [],
        aBuyAppealList: []
      },
      oBuyData: {}
    }
  },
  watch: {
    activeName (n, o) {
      console.log(n)
      this.getOrderInfo(this.nOrderTitleTabIndex)
    }
  },
  methods: {
    changeOrderTabIndex: function (e) {
      console.log(e)
      this.activeName = e
    },
    getC2cList (page) {
      new ApiClient("auth")
        .get(
          "identity/users/tx/ad", {
            ad_type: 'sell',
            page: page,
            limit: '10'
          }
        )
        .then((res) => {
          // console.log(res)
          if (res.status === 200) {
            var data = res.data.data
            this.oC2cPageInfo.sellTableData = data
            this.oC2cPageInfo.nTotalPage = res.data.total_page
          }
       })
    },
    handleCurrentChange (e) {
      this.getC2cList(e)
    },
    onItemClick: function (e) {
      this.nShowBuyTableOrOrderPage = e
    },
    clickChangePageNumber: function (e) {
      this.nPageNumberIndex = e
    },
    clickReductionPageNUmber: function (e) {
      if (this.nPageNumberIndex > 0) {
        this.nPageNumberIndex--
      }
    },
    clickAddPageNUmber: function (e) {
      if (this.nPageNumberIndex < 2) {
        this.nPageNumberIndex++
      }
    },
    clickBuyC2cButton (e) {
      this.sShowPage = 'buy'
      this.oBuyData = this.oC2cPageInfo.sellTableData[e.target.id]
    },
    createBuyOrder (state) {
      if (state === 'success') {
        this.sShowPage = 'default'
        this.nShowBuyTableOrOrderPage = 1
        this.changeOrderTabIndex(0)
        this.changeOrderTitleTabIndex(1)
      }
    },
    changeOrderTitleTabIndex: function (e) {
      console.log(e)
      this.nOrderTitleTabIndex = e
      this.getOrderInfo(e)
    },
    getOrderInfo (e) {
      if (e === 0) {
        this.getSellOrderList()
      } else if (e === 1) {
        this.getBuyOrderList()
      }
    },
    selectGetSellOrBuyOrder () {
      if (this.sDefaultActive === '1') {
        this.getSellOrderList()
      } else if (this.sDefaultActive === '2') {
        this.getBuyOrderList()
      }
    },
    getSellOrderList () {
      var type = ''
      if (this.activeName === 0) {
        type = 'unpaid'
      } else if (this.activeName === 1) {
        type = 'paid'
      } else if (this.activeName === 2) {
        type = 'finish'
      } else if (this.activeName === 3) {
        type = "cancel"
      } else if (this.activeName === 4) {
        type = 'appeal'
      }
      new ApiClient("auth")
        .get(
          "resource/users/tx/order/dealer", {
            state: type,
            page: 1,
            limit: '100'
          }
        ).then((res) => {
          if (res.status === 200) {
            if (type === 'unpaid') {
              this.oC2cOrderPageInfo.aSellUnpaidList = res.data.data
            } else if (type === 'paid') {
              this.oC2cOrderPageInfo.aSellPaidList = res.data.data
            } else if (type === 'finish') {
              this.oC2cOrderPageInfo.aSellFinishList = res.data.data
            } else if (type === "cancel") {
              this.oC2cOrderPageInfo.aSellCancelList = res.data.data
            } else if (type === 'appeal') {
              this.oC2cOrderPageInfo.aSellAppealList = res.data.data
            }
          }
        })
    },
    getBuyOrderList () {
      var type = ''
      if (this.activeName === 0) {
        type = 'unpaid'
      } else if (this.activeName === 1) {
        type = 'paid'
      } else if (this.activeName === 2) {
        type = 'finish'
      } else if (this.activeName === 3) {
        type = "cancel"
      } else if (this.activeName === 4) {
        type = 'appeal'
      }
      new ApiClient("auth")
        .get(
          "resource/users/tx/order/consumer", {
            state: type,
            page: 1,
            limit: '100'
          }
        ).then((res) => {
          //console.log(res)
          if (res.status === 200) {
            if (type === 'unpaid') {
              this.oC2cOrderPageInfo.aBuyUnpaidList = res.data.data
            } else if (type === 'paid') {
              this.oC2cOrderPageInfo.aBuyPaidList = res.data.data
            } else if (type === 'finish') {
              this.oC2cOrderPageInfo.aBuyFinishList = res.data.data
            } else if (type === "cancel") {
              this.oC2cOrderPageInfo.aBuyCancelList = res.data.data
            } else if (type === 'appeal') {
              this.oC2cOrderPageInfo.aBuyAppealList = res.data.data
            }
          }
        })
    },
    cancelOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/cancel", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('确认成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    buyConfirmOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/confirm/consumer", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('确认成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    //  卖家打币接口
    sellPutCoinOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/confirm/dealer", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('打币成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    appealOrder (a) {
      this.$router.push({path: '/m/c2cappeal?id=' + a[0] + '&number=' + a[1]})
    },
    clickDelButton () {
      this.$confirm('是否删除此广告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new ApiClient("auth")
          .get(
            "resource/users/tx/ad/cancel", {
              ad_id: '',
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {

            }
          })
      }).catch(() => {
      });

    },
  },
  mounted () {
    this.getC2cList(1)
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
.c2c-body
  position: relative
  min-height: 100vh
  background-color: #f6f6f6
  color: #333
  padding-bottom: 58px
  .default-div
    .top-div
      position: relative
      background-color: #fff
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
      .top-sell-div
        position: absolute
        right: px2rem(20px)
        top: px2rem(18px)
        font-size: px2rem(12px)
        color: #a7abb4
        display: inline-block
        span
          vertical-align: middle
        img
          width: px2rem(24px)
          display: inline-block
          vertical-align: middle
    .buy-table-div
      margin-top: px2rem(10px)
      background-color: #fff
      font-size: px2rem(14px)
      padding: 0 15px
      padding-bottom: 10px
      th
        font-size: px2rem(12px)
        color: #888
      td
        padding: px2rem(4px) 0
        .price-num
          color: #333
        .mix-num
          color: rgb(236, 81, 81)
        .max-num
          color: rgb(38, 201, 26)
        p
          color: #a8abb3
          font-size: px2rem(12px)
          line-height: px2rem(26px)
        .buy-button
          width: px2rem(50px)
          height: px2rem(30px)
          line-height: px2rem(30px)
          background-color: #4caf50
          color: #fff
          border: none
          border-radius: px2rem(10px)
      .page-number-p
        text-align: right
        margin-top: px2rem(8px)
        padding: 0 px2rem(10px)
        span
          padding: px2rem(4px) px2rem(6px)
          margin: 0 px2rem(4px)
        .selected
          background-color: #eee
    .order-div
      font-size: px2rem(14px)
      .title-p
        background-color: #fff
        border-bottom: 1px solid #eee
        button
          width: 49%
          padding: px2rem(10px) 0
          border: none
          background-color: #fff
        .selected
          color: #43478c
      .tab-p
        border-bottom: 1px solid #eee
        background-color: #fff
        button
          width: 20%
          padding: px2rem(10px) 0
          border: none
          background-color: #fff
        .selected
          background-color: #43578c
          color: #fff
          border: none
      .order-item-div
        width: px2rem(320px)
        margin: px2rem(10px) auto 0 auto
        background-color: #fff
        padding: px2rem(10px) px2rem(10px)
        border-radius: px2rem(10px)
        p
          margin-top: px2rem(4px)
          color: #808695
          span
            color: #333
        p:first-child
          border-bottom: 1px solid #e8eaec
          padding-bottom: px2rem(10px)
          span:first-child
            font-weight: bold
          span:nth-child(2)
            font-size: px2rem(10px)
            color: #c5c8ce
            padding: 0 px2rem(4px)
          span:nth-child(3)
            float: right
            font-weight: 500
        p:last-child
          border-top: 1px solid #e8eaec
          padding-top: px2rem(10px)
          height: px2rem(48px)
          span
            color: #333
            font-weight: bold
            line-height: px2rem(36px)
          button
            float: right
            border-radius: px2rem(4px)
            width: px2rem(100px)
            background-color: #3251a1
            color: #fff
            font-size: px2rem(16px)
            padding: px2rem(6px) 0
            border: none
            margin-left: px2rem(4px)
        .important-color
          color: #19be6b
  .sell-div, .buy-div
    padding-top: px2rem(20px)
    min-height: 100vh
    background-color: #fff
    .checker-item
      width: px2rem(54px)
      height: px2rem(24px)
      font-size: px2rem(12px)
      line-height: px2rem(20px)
      text-align: center
      border-radius: 3px
      border: 1px solid #ccc
      background-color: #fff
      margin: px2rem(10px) px2rem(10px) 0 px2rem(10px)
      padding: px2rem(2px)
    .checker-item-selected
      background: #ffffff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC') no-repeat right bottom
      border-color: #ff4a00
    .done-button
      display: block
      margin: px2rem(20px) auto 0 auto
      border-radius: px2rem(4px)
      width: px2rem(120px)
      background-color: #3251a1
      color: #fff
      font-size: px2rem(16px)
      padding: px2rem(6px) 0
      border: none
.el-message-box
  width: 240px !important
</style>
