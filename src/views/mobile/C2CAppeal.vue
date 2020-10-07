<template lang="html">
  <div class="c2c-appeal-body">
    <div class="title-div">
      我要申诉
      <p>如果您的权益受到损失，请在此处填写申诉单，客服会在1-2个工作日处理。您也可以直接咨询在线客服或拨打400-0000-0000</p>
    </div>
    <ul>
      <li>
        <p>申诉订单号</p>
        <div class="input-div">
          <input v-model="oFormData.ssddh" type="text" name="" value="" disabled>
        </div>
      </li>
      <li>
        <p>申诉原因</p>
        <Select v-model="oFormData.ssyy" size="small" style="width:100px">
          <Option v-for="item in [{value: '申诉原因1', label: '申诉原因1'}, {value: '申诉原因2', label: '申诉原因2'}]" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </li>
      <li>
        <p>联系方式</p>
        <div class="input-div">
          <input v-model="oFormData.lxfs" type="text" name="" value="">
        </div>
      </li>
      <li>
        <p>付款方式</p>
        <Select v-model="oFormData.fkfs" size="small" style="width:100px">
          <Option v-for="item in [{value: 'ALIPAY', label: '支付宝'}, {value: 'BANK', label: '银行卡'}]" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </li>
      <li>
        <p>渠道流水号</p>
        <div class="input-div">
          <input v-model="oFormData.qdlsh" type="text" name="" value="" disabled>
        </div>
      </li>
      <li>
        <p>付款截图</p>
      </li>
      <li>
        <p>备注信息</p>
        <textarea v-model="oFormData.bzxx" name="name" rows="8" cols="80" placeholder="" style="width: 100%;"></textarea>
      </li>
    </ul>
    <button @click="clickButton" class="done-button" type="button" name="button">申诉</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'iview'
import { Checker, CheckerItem } from 'vux'
Vue.component('Select', Select);
Vue.component('Option', Option);
export default {
  components: {
    Checker, CheckerItem
  },
  data () {
    return {
      oFormData: {
        qdlsh: '',
        ssddh: ''
      }
    }
  },
  mounted () {
    this.oFormData.qdlsh = this.$route.query.number
    this.oFormData.ssddh = this.$route.query.id
  },
  methods: {
    clickButton () {
      new ApiClient("auth")
        .post(
          "resource/users/tx/order/appeal/create", {
            order_id: this.oFormData.ssddh,
            payment_method: this.oFormData.fkfs,
            mobile: this.oFormData.lxfs,
            appeal_reason: this.oFormData.ssyy,
            image: '',
            remark: this.oFormData.bzxx
          }
        ).then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.c2c-appeal-body
  position: relative
  min-height: 100vh
  background-color: #f6f6f6
  padding-bottom: px2rem(120px)
  color: #333
  .title-div
    width: px2rem(320px)
    font-size: px2rem(14px)
    margin: 0 auto 0 auto
    padding: px2rem(20px)
    font-weight: 400
    background-color: #f2f2f2
    p
      text-align: center
      font-size: px2rem(12px)
      span
        color: #3251a1
  >ul
    font-size: px2rem(14px)
    margin: px2rem(20px) auto 0 auto
    width: px2rem(320px)
    li
      margin-top: px2rem(10px)
      p
        width: px2rem(120px)
        display: inline-block
      input
        width: px2rem(132px)
        border-radius: 6px
        border: 1px solid #eee
        font-size: px2rem(12px)
        padding: px2rem(4px) px2rem(26px) px2rem(4px) px2rem(8px)
    .ivu-select-dropdown-list
      width: px2rem(98px)
      background-color: #fff
      .ivu-select-item-focus, .ivu-select-item:hover
        background-color: #fff
    .input-div
      display: inline-block
      position: relative
      line-height: px2rem(12px)
      input
        width: px2rem(132px)
        border-radius: 6px
        border: 1px solid #eee
        font-size: px2rem(12px)
        padding: px2rem(4px) px2rem(26px) px2rem(4px) px2rem(8px)
      label
        font-size: px2rem(12px)
        position: absolute
        top: px2rem(6px)
        right: px2rem(4px)
    .input-margin
      margin: px2rem(10px) 0 0 px2rem(10px)
    .waves
      padding-left: px2rem(10px)
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

</style>
