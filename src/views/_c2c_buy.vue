<template lang="html">
  <Content class="c2cbuy-page-auto">
    <div class="auto-box">
      <el-row style="width: 1000px">
        <el-col :span="18">
          <div class="top-body">
            <p>{{$t('usercenter.c2c.purchase')}} OXT</p>
            <el-tag type="danger">
              {{$t('usercenter.c2c.create_ad.kyc_desc')}}
            </el-tag>
          </div>
          <div class="bottom-body">
            <el-form label-width="150px">
              <p class="title">{{$t('usercenter.c2c.buy_order.title')}}</p>
              <el-form-item :label="$t('usercenter.c2c.price')">
                <p>{{oData.advertisement.price}} {{oData.advertisement.currency_type}}/{{oData.advertisement.token_type}}</p>
              </el-form-item>
              <el-form-item :label="$t('usercenter.c2c.payment')">
                <p>
                  {{oData.advertisement.payment_method}}
                  <span>确定买入后可查看账号</span>
                </p>
              </el-form-item>
              <el-form-item label="付款期限">
                <p>30分钟</p>
              </el-form-item>
              <el-form-item label="所在国家">
                <p>{{oData.advertisement.country}}</p>
              </el-form-item>
              <el-form-item label="交易限额">
                <p>{{oData.advertisement.min_count}} ~ {{oData.advertisement.max_count}} {{oData.advertisement.token_type}}</p>
              </el-form-item>
              <el-form-item label="备注信息">
                <p>{{oData.advertisement.remark}}</p>
              </el-form-item>
              <p class="title">您想购买多少？</p>
              <el-form-item label="">
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="jyjg" disabled>
                      <template slot="suffix">{{oData.advertisement.currency_type}}</template>
                    </el-input>
                  </el-col>
                  <el-col class="line" :span="2">
                    <img class="change-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJGOEJEOTlGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJGOEJEOUFGRkU5MTFFNzk4NUZGMENFQzczMzEzRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MjJBNTU4RUZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkY4QkQ5OEZGRTkxMUU3OTg1RkYwQ0VDNzMzMTNFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Puk+0NwAAAGVSURBVHja7JjPKwRhGMffnfYmP8qBneQizpIQLSUupOSgXBz2b/CrPQsl/wFHuUmxJW1+5UBJHOWg1DZZKVkXUXyf+k7tbWpnd/aR96nPNFNz+PS88z7PM29s++DYINrBGhgBdaa68Q6yYAk8xHHpAFegwegISdAUGAZ9Di6rlDsELohVGZcu4rTicFklUsBTkEGPLhKjTtE35xk94bvUOkZ5WEEr+B8EO7krpd7GNQrWgya2rlPQqk3wjK3rDQyAGzCu7RvcA13gGjSCfQ4ngUse9EINl6dcMQvWmcFF0A9mQK5UwTvQVsHMJsEJJ6qSljiK/vwSZomTtlBbQSv4xwUvwE+FOQ8j2BxBktwwdXAI7BTVwwyYB59lFMyHEczxB3oZLLCHSm+eBo9aNsk3Z7kJ8Aq6OTJNatvFGY5Ml/zr3wWD2srME6U2wDMPetTVwS8wBxLg1hZqK2gFFQj6pSKhyMufAT5EMMuHzYiGg6BoAVu8P5JenGa/HTO6TlnlJCItGbwHPWxdBQViBbr0ituvAAMAzXVc50SF5aYAAAAASUVORK5CYII=" alt="">
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="oSellFormData.jysl">
                      <template slot="suffix">{{oData.advertisement.token_type}}</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="付款方式">
                <el-radio v-if="oSellFormData.fkfs === 'ALIPAY'" v-model="oSellFormData.fkfs" label="ALIPAY"></el-radio>
                <el-radio v-else-if="oSellFormData.fkfs === 'BANK'" v-model="oSellFormData.fkfs" label="BANK"></el-radio>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input type="textarea" v-model="oSellFormData.bzxx"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="clickButton">确认购买</el-button>
              </el-form-item>
            </el-form>
            <p class="title">交易须知</p>
            <ul class="notice">
              <li>卖家的数字货币已被锁定在托管中，受到GIH保护，请您放心购买。</li>
              <li>建议您发起购买交易请求后，应在指定时间内付款并把交易标记为付款已完成，卖家在收到付款后将会放行处于托管中的数字货币。</li>
              <li>为了保障资金账户安全及争议，请一定要通过您在GIH平台实名认证的账号进行付款，如果使用其他账户进行付款并发生争议，平台方将有权利不做处理。</li>
              <li>当心骗子！交易前请检查该用户收到的评价，并对新近创建的账户多加留意。</li>
              <li>请注意，四舍五入和价格的波动可能会影响最终成交的数字货币数额。您输入的固定数额决定最后数额，数字货币金额将在请求发布的同一时间由即时的汇率算出。</li>
              <li>托管服务保护网上交易的买卖双方。在发生争议的情况下，我们将评估所提供的所有信息，并将托管的数字货币放行给其合法所有者。</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div class="head-div"></div>
              <p v-if="oData.advertisement.user">{{oData.advertisement.user.uid}}</p>
              <p>交易次数 482</p>
              <p>鼓励次数 6</p>
            </div>
            <div class="">
              <p>手机已认证<i class="el-icon-success icon"></i></p>
              <p>身份已认证<i class="el-icon-success icon"></i></p>
            </div>
          </el-card>
          <el-card class="box-card other-order">
            <div slot="header" class="clearfix">
              <p>其他OXT售卖的广告</p>
            </div>
            <div class="">
              <el-table
                :data="[{
                  price: '1CNY',
                  method: '支付宝'
                }, {
                  price: '1CNY',
                  method: '支付宝'
                }]"
                style="width: 100%">
                <el-table-column
                  prop="price"
                  label="交易价格"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="付款方式">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Card, Form, FormItem, Input, Button, Table, TableColumn, Tag, Radio, RadioGroup } from 'element-ui'

Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(RadioGroup);
export default {
  data () {
    return {
      oData: {},
      oSellFormData: {},
      sId: ''
    }
  },
  computed: {
    jyjg () {
      if (this.oSellFormData.jysl && this.oData.advertisement.price) {
        return (this.oSellFormData.jysl * this.oData.advertisement.price)
      } else {
        return ''
      }
    }
  },
  mounted () {
    if ('id' in this.$route.params) {
      this.sId = this.$route.params.id
      this.getData()
    } else {
      // TODO: 错误提示
    }
  },
  methods: {
    getData () {
      new ApiClient("auth")
      .get("resource/users/tx/order?id=" + this.sId, {})
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.oData = res.data
          this.oSellFormData.fkfs = this.oData.advertisement.payment_method
        }
      })
    },
    clickButton () {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        console.log(value)
        new ApiClient("auth")
          .post("resource/users/tx/order/create", {
            ad_id: this.oData.advertisement.ad_id,
            amount: this.oSellFormData.jysl,
            remark: this.oSellFormData.bzxx,
            payment_method: this.oData.advertisement.payment_method,
            tx_pw: value
          }).then((res) => {
            console.log(res)
            if (res.data === 200) {
              this.$Message.success('订单成功');
              setTimeout(() => {
                this.$router.push({path: '/c2c'})
              })
            }
          })
      }).catch(() => {

      });

    }
  }
}
</script>

<style lang="sass">
.c2cbuy-page-auto
  color: #fff
  .auto-box
    width: 800px
    margin: 0 auto
    .top-body
      width: 600px
      margin: 20px auto 0 auto
      > p
        font-size: 20px
        font-weight: bold
      .el-tag
        margin-top: 10px
        cursor: pointer
    .bottom-body
      width: 600px
      margin: 20px auto 0 auto
      .el-form
        margin-top: 20px
      .change-img
        position: relative
        top: 4px
        width: 32px
      .el-radio-button__inner
        padding: 10px 20px
      .el-radio
        color: #fff
      .el-form-item__label
        color: #fff
    .title
      font-size: 18px
      border-bottom: 1px solid #e8eaec
      margin-bottom: 10px
    .notice
      padding-left: 20px
      font-size: 14px
      li
        list-style-type: disc
        padding-bottom: 8px
  .box-card
    margin-top: 40px
    .el-card__header
      padding: 20px 20px
    .head-div
      float: left
      width: 50px
      height: 50px
      line-height: 50px
      border-radius: 50%
      background-color: #0ae
      color: #fff
      font-size: 18px
      text-align: center
      margin-right: 10px
    .icon
      margin-left: 20px
  .other-order
    margin-top: 10px
    .el-card__header
      font-size: 14px
      font-weight: 700
    .el-card__body
      padding: 0 20px 20px 20px
    .el-table td
      border: none
      padding: 6px 0
</style>
