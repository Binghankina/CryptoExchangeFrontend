<template lang="html">
  <div class="">
    <div v-if="sShowPage === 'info'" class="info-page">
      <div class="title-div">
        {{$t('usercenter.c2c.purchase')}}{{oData.token_type}}
        <p>只有通过等级一认证的用户才能购买<span>身份认证</span></p>
      </div>
      <div class="base-info-div">
        <p class="title-p">基本信息</p>
        <p>价格： <span>{{oData.price}} {{oData.currency_type}}/{{oData.token_type}}</span></p>
        <p>支付方式： <span>{{oData.payment_method}}</span><span class="payment-prompt-span">确认购买后可查看账号</span></p>
        <p>付款期限： <span>30分钟</span></p>
        <p>所在国家： <span>{{oData.country}}</span></p>
        <p>交易限额： <span>{{oData.min_count}} ~ {{oData.max_count}}</span>{{oData.token_type}}</p>
        <!-- <p>卖家：<span>()</span></p> -->
        <p>备注信息: <span>{{oData.remark}}</span></p>
      </div>
      <div class="buy-info-div">
        <p class="title-p">您想购买多少？</p>
        <div class="input-div">
          <input v-model="jyjg" type="text" name="" value="" placeholder="待支付金额" disabled>
          <label for="">{{oData.currency_type}}</label>
        </div>
        <img class="change-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJGOEJEOTlGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJGOEJEOUFGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MjJBNTU4RUZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkY4QkQ5OEZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Puk+0NwAAAGVSURBVHja7JjPKwRhGMffnfYmP8qBneQizpIQLSUupOSgXBz2b/CrPQsl/wFHuUmxJW1+5UBJHOWg1DZZKVkXUXyf+k7tbWpnd/aR96nPNFNz+PS88z7PM29s++DYINrBGhgBdaa68Q6yYAk8xHHpAFegwegISdAUGAZ9Di6rlDsELohVGZcu4rTicFklUsBTkEGPLhKjTtE35xk94bvUOkZ5WEEr+B8EO7krpd7GNQrWgya2rlPQqk3wjK3rDQyAGzCu7RvcA13gGjSCfQ4ngUse9EINl6dcMQvWmcFF0A9mQK5UwTvQVsHMJsEJJ6qSljiK/vwSZomTtlBbQSv4xwUvwE+FOQ8j2BxBktwwdXAI7BTVwwyYB59lFMyHEczxB3oZLLCHSm+eBo9aNsk3Z7kJ8Aq6OTJNatvFGY5Ml/zr3wWD2srME6U2wDMPetTVwS8wBxLg1hZqK2gFFQj6pSKhyMufAT5EMMuHzYiGg6BoAVu8P5JenGa/HTO6TlnlJCItGbwHPWxdBQViBbr0ituvAAMAzXVc50SF5aYAAAAASUVORK5CYII=" alt="">
        <div class="input-div">
          <input v-model="oSellFormData.jysl" type="text" name="" value="" placeholder="购买数量">
          <label for="">{{oData.token_type}}</label>
        </div>
        <p>
          支付方式
          <checker
          v-model="oSellFormData.fkfs"
          default-item-class="checker-item"
          selected-item-class="checker-item-selected"
          >
            <checker-item v-for="i in ['BANK', 'ALIPAY']" :key="i" :value="i" disabled>{{i}}</checker-item>
            <!-- <checker-item v-for="i in ['BANK', 'ALIPAY']" :key="i" :value="i">{{i}}</checker-item> -->
          </checker>
        </p>
        <textarea v-model="oSellFormData.bzxx" name="name" rows="8" cols="80" placeholder="告诉TA您的要求"></textarea>
        <button @click="clickButton" class="done-button" type="button" name="button">确认购买</button>
      </div>
      <div class="trading-instructions-div">
        <p class="title-p">交易须知</p>
        <p>卖家的数字货币已被锁定在托管中，受到GIH保护，请您放心购买。</p>
        <p>建议您发起购买交易请求后，应在指定时间内付款并把交易标记为付款已完成，卖家在收到付款后将会放行处于託管中的数字货币。</p>
        <p>为了保障资金账户安全及争议，请一定要通过您在GIH平台实名认证的账号进行付款，如果使用其他账户进行付款并发生争议，平台方将有权利不做处理。</p>
        <p>当心骗子！交易前请检查该用户收到的评价，并对新近创建的账户多加留意。</p>
        <p>请注意，四捨五入和价格的波动可能会影响最终成交的数字货币数额。您输入的固定数额决定最后数额，数字货币金额将在请求发佈的同一时间由即时的汇率算出。</p>
        <p>託管服务保护网上交易的买卖双方。在发生争议的情况下，我们将评估所提供的所有信息，并将托管的数字货币放行给其合法所有者。</p>
      </div>
    </div>
    <!-- <div v-else class="success-page">
      <div class="success-info-div">
        <p class="success-p">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACiElEQVRYR8WXTXLaQBCFX4PN1uQEIScILFMpEThB8AnCwmhr5wSxTxC8S4lUxTmByQkgUFlHnCBwA7xF4E71DLIQ+huEnMyKKmbmfd3q7ukmHLImdgfg9yDUAFQBquvj7AJYgjEHeIjm1x+m11LmxlG3ivLpZwAdEFUz9yseXgIYYuN9RPtOfieudICpfQ3mS2PhfRkBIerDcm6SCOIBxOqT01HgYiO7Uzaxi7XXjvNGFOBXr44N3W+/87HKwXmJjzKf4+1A4uVphQHU9678LlzclxOIzaqx64kwwNQWutfFmR13E7uwBg3/nwBAAg749LziT7ffwHJEDxpAp9qf3NGeSs0LgF6Gtkh2bLxX8ik0wMS+A+FDwdbPcFLq4M2XOSa9Loi+hSHwHU2n6wMsQTgrEGCG9aoVSrupzREvNAcvCFJeCffPK37RAkqjiAbjXACKdH/UclVXMIqPL74lTHtjgN4V4IEDxUWRfxKSc1+nyvSiBS4NM2Ikh7gCcAUgHBy+KywnqBG6PI8TIHKKa6FkgBI3QnU7HuIocR8gvvxKsSijnQJxtDiAWXoQJkE8oo+11wnleWq0J4W4BGFWGsZB7N+XS1wF4a1ZIUqDyC0u+lKI9FuQXYoTYyKpyGRUFsYDmk71sMdoF0LVB+mcDBvVfR7efYx0JzQ3fpCks9Gteb4l1m9WteA5lmv+a0Pi2/FPWjLMYDnbgcbviHwA3Y67kQ4mn6NjTvECa6+e3JTKEUmrRwyLh+AFSuikt+UhT1TGBXbI0bK91TIYzXBlnB3RVHsAQUYz1QHHLcPhtNLXw6lh3yhppobT1dVxw+k+shrPBYRrgCpA/hAzA9RE7IJpjKYzNI3bv1pbS6DETqCYAAAAAElFTkSuQmCC" alt="">
          下单成功</p>
        <p class="desc-p">您的订单xxxxxxxxxxxxxxx已经生成，请在30分钟内完成支付</p>
        <p>付款方式：
          <span>ALI Pay</span>
        </p>
        <p>卖家姓名：
          <span>xxx</span>
        </p>
        <p>ALI Pay账号：
          <span>11111111111</span>
        </p>
        <p>支付金额：
          <span>16.00CNY</span>
        </p>
        <p>付款参考号：
          <span>811111 付款备注里填写</span>
        </p>
      </div>
      <button @click="jump2OrderPayPage" class="to-order-button" type="button" name="button">进入订单完成付款</button>
      <p class="desc-p">确认完成付款，并点击此按钮后。<br>卖家确认收到款项后通知系统将币打入您的账户中，请注意查收。</p>
    </div> -->
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker, CheckerItem
  },
  props: {
    data: Object
  },
  data () {
    return {
      sShowPage: 'info', //  info, success
      oData: {},
      oSellFormData: {}
    }
  },
  computed: {
    jyjg () {
      if (this.oSellFormData.jysl && this.oData.price) {
        return (this.oSellFormData.jysl * this.oData.price)
      } else {
        return ''
      }
    }
  },
  mounted () {
    console.log(this.data)
    this.oData = this.data
    this.oSellFormData.fkfs = this.data.payment_method
  },
  methods: {
    jump2OrderPayPage () {
      this.$parent.sShowPage = 'default'
      this.$parent.nShowBuyTableOrOrderPage = 1
      this.$parent.nOrderTitleTabIndex = 1
      // console.log(this)
    },
    clickButton () {
      var self = this
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        // console.log(value)
        new ApiClient("auth")
          .post("resource/users/tx/order/create", {
            ad_id: this.oData.ad_id,
            amount: this.oSellFormData.jysl,
            remark: this.oSellFormData.bzxx,
            payment_method: this.oData.payment_method,
            tx_pw: value
          }).then((res) => {
            console.log(res)
            if (res.data === 200) {
              this.$Message.success('下单成功');
              setTimeout(function () {
                self.$emit('childFun', 'success')
              }, 1000)
            }
          })
      }).catch(() => {

      });

    }
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.info-page
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
  .base-info-div, .buy-info-div
    margin: px2rem(20px) auto 0 auto
    width: px2rem(320px)
    text-align: center
    .title-p
      font-size: px2rem(14px)
      border-bottom: 1px solid #e8e8e9
      text-align: left
    p
      text-align: left
      font-size: px2rem(12px)
      margin-top: px2rem(20px)
    img
      position: relative
      top: px2rem(4px)
      width: px2rem(20px)
    .payment-prompt-span
      color: #6dc068
      padding-left: px2rem(10px)
    .input-div
      display: inline-block
      position: relative
      line-height: px2rem(12px)
      input
        width: px2rem(130px)
        border-radius: 6px
        border: 1px solid #eee
        font-size: px2rem(12px)
        line-height: px2rem(16px)
        padding: px2rem(4px) px2rem(26px) px2rem(4px) px2rem(2px)
      label
        font-size: px2rem(12px)
        position: absolute
        top: px2rem(6px)
        right: px2rem(4px)
    .change-img
      margin: 0 px2rem(4px)
      position: relative
      top: px2rem(5px)
    textarea
      margin: px2rem(10px) auto 0 auto
      width: px2rem(300px)
      height: px2rem(160px)
      border-radius: px2rem(10px)
      padding: px2rem(4px)
      font-size: px2rem(14px)
  .trading-instructions-div
    margin: px2rem(20px) auto px2rem(50px) auto
    width: px2rem(320px)
    color: red
    .title-p
      font-size: px2rem(14px)
      border-bottom: 1px solid #e8e8e9
      text-align: left
    p
      font-size: px2rem(12px)
.success-page
  font-size: px2rem(14px)
  .success-info-div
    background-color: #f8f8f9
    width: px2rem(320px)
    margin: 0 auto 0 auto
    padding: px2rem(20px)
    p
      text-align: left
      color: #808695
      span
        color: #515a6e
    .success-p
      text-align: center
      color: #19be6b
      font-size: px2rem(20px)
      font-weight: 500
      img
        vertical-align: middle
  .to-order-button
    display: block
    margin: px2rem(20px) auto 0 auto
    border-radius: px2rem(4px)
    width: px2rem(300px)
    background-color: #3251a1
    color: #fff
    font-size: px2rem(16px)
    padding: px2rem(6px) 0
    border: none
  .desc-p
    color: #515a6e !important
    text-align: center !important
    margin: px2rem(20px) auto px2rem(10px) auto
.ivu-select-dropdown-list
  background-color: #fff
  width: px2rem(100px)
  margin: 0 auto
  padding: 0
.el-message-box
  width: 240px !important
</style>
