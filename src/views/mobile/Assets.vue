<template lang="html">
  <div class="assets-body">
    <div v-show="sShowPage === 'default'" class="default-div">
      <div class="top-div">        
        <div class="assets-total-div">
          <p class="title-p">{{ $t('header.my_assets') }}</p>
          <!--
          <p class="num-p">
            <span>{{ getTotalUSDT }} </span><span>  USDT</span><span> ≈ {{ getTotalUSD }} USD</span>
          </p>
          <p class="desc-p">BTC汇兑费率来自bitfnex网站数据</p>
          -->
        </div> 
      </div>
      <div class="table-div">
        <dd v-if="$store.getters['user/getBalance'].length" :cell-bordered="false">
          <!--<dl class="head">
            <span class="coin" v-text="$t('table.coin')"/>
            <span class="total" v-text="$t('table.total')"/>
            <span class="text-center action" v-text="$t('table.action')"/>
          </dl>
          -->
          <dl
            class="item"
            v-for="(data, index) in getAllCurrencies"
            :key="index"
          >
            <div class="item-info">
              <div class="name-td">{{ data.id.toUpperCase() }}</div>
              <div class="num-td">{{ getTotal(data.id) }}</div>
              <div class="action">
                <a
                  href="javascript:void(0)"
                  @click="changeAssets(data.id, 'deposit')"
                  :class="{ selected: select.id === data.id && select.type === 'deposit' }"
                  v-text="$t('action.deposit')"
                />
                <a
                  href="javascript:void(0)"
                  @click="changeAssets(data.id, 'withdraw')"
                  :class="{ selected: select.id === data.id && select.type === 'withdraw' }"
                  v-text="$t('action.withdrawal')"
                />
                <Dropdown trigger="click" @on-click="changeMarket">
                  <DropdownMenu slot="list">
                    <DropdownItem
                      v-for="(m, index) in getAllMarket(data.id)"
                      :key="index"
                      :name="m.name"
                    >{{ m.name }}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div v-if="select.id === data.id" class="action-box">
              <deposit-box
                v-if="select.type === 'deposit'"
                :deposit_address="select.deposit_address || 'ERROR'"
                :currencyArray="data"
              />
              <withdraw-box
                v-if="select.type === 'withdraw'"
                :balance="getAvailable(data.id)"
                :currencyArray="data"
              />
              <Spin size="large" fix v-if="loading"/>
            </div>
          </dl>
        </dd>
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from "@/views/assets/balance/helpers"
import { XTable, Selector, Group } from 'vux'
import { Select, Option } from 'iview'
import balance from "@/views/assets/balance";
export default {
  components: {
    XTable, Selector, Group
  },
  mixins: [Helpers, balance],
  data () {
    return {
      sShowPage: 'default',  // default, topup, rollout
      depositValue: '',
      withdrawValue: ''
    }
  },
  watch: {
    depositValue: function (n, o) {
      this.changeAssets(n, 'deposit')
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
.assets-body
  position: relative
  min-height: 100vh
  max-width: 100vw
  background-color: #f6f6f6
  padding-bottom: px2rem(120px)
  color: #333
  .default-div
    .top-div
      position: relative
      background-color: #fff
      .logo-img
        position: relative
        top: px2rem(8px)
        left: px2rem(10px)
        padding-bottom: 0.05rem
        width: px2rem(40px)
      .title
        position: relative
        left: px2rem(12px)
        top: -0.2rem
        font-size: px2rem(14px) 
        font-weight: 500
      p
        height: px2rem(50px)
        font-size: px2rem(16px)
        line-height: px2rem(50px)
        padding-left: px2rem(20px)
      .assets-total-div
        background-color: #003e58
        color: #8f9fb9
        .title-p
          font-size: px2rem(15px)
          color: #fff
        p
          font-size: px2rem(12px)
        .num-p
          line-height: px2rem(22px)
          height: px2rem(22px)
        .num-p span:nth-child(1)
          font-size: px2rem(22px)
          color: #fff
        .num-p span:nth-child(2)
          font-size: px2rem(22px)
          color: #fff
    .table-div
      padding-top: px2rem(12px)
      padding-bottom: px2rem(12px)
      padding-left: px2rem(3px)
      background-color: #fff
      .item
        padding: px2rem(12px)
        .item-info
          box-sizing: border-box
          display: flex
          .name-td
            width: px2rem(60px)
          .num-td
            width: px2rem(60px)
          .action
            flex: 1
            text-align: center           
            a
              color: #003e58
              padding-left: px2rem(60px) 
        .action-box
          font-size: px2rem(12px)
          .address-box
            display: block
            width: 100%
            height: auto
            color: #003e58
            .address-label
              color: #003e58
            .address-form
              a
                color: #003e58 
              input
                color: #333
              .show-qrcode 
                transform: translate(-80%,5%)
          a
            color: #003e58
          .assets-note  
            width: 60%
          .action
            text-align: center
            line-height: px2rem(43px)
            background: #2e3f5f
            border-radius: 4px;
            button
              color:#fff          
          .block-address
            width: 100%;
            text-align: left
    .operation-div
      position: fixed
      bottom: 53px
      width: 100%
      height: px2rem(50px)
      background-color: #fff
      border-top: 1px solid #C0BFC4
      button
        width: px2rem(100px)
        height: px2rem(36px)
        background-color: #003e58
        border: none
        border-radius: 8px
        color: #fff
        font-size: px2rem(16px)
      button:first-child
        position: absolute
        right: 60%
        top: 7px
      button:last-child
        position: absolute
        left: 60%
        top: 7px
  .topup-div, .rollout-div
    .top-div
      background-color: #fff
      .logo-img
        position: relative
        top: px2rem(4px)
        left: px2rem(10px)
        width: px2rem(40px)
      .title
        position: relative
        left: px2rem(12px)
        top: px2rem(-8px)
        font-size: px2rem(14px)
        font-weight: 500
    .main-div
      text-align: center
      .title
        font-size: px2rem(20px)
        padding-top: px2rem(20px)
      .ivu-select-dropdown-list
        width: px2rem(200px)
        background-color: #fff
      .ivu-select-item-focus, .ivu-select-item:hover
        background-color: #fff
      .address-title-p
        font-size: px2rem(18px)
        text-align: left
        padding-left: px2rem(10px)
      .address-p
        font-size: px2rem(14px)
        word-break: break-word
      .back-button
        border-radius: px2rem(4px)
        background-color: #003E58
        color: #fff
        font-size: px2rem(16px)
        padding: px2rem(12px) 0
        border: none
        width: px2rem(320px)
        margin-top: px2rem(200px)
</style>
