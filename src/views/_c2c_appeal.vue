<template lang="html">
  <Content class="c2cbuy-page-auto">
    <div class="auto-box">
      <el-row style="width: 1000px">
        <el-col :span="18">
          <div class="top-body">
            <p>我要申诉</p>
            <span>如果您的权益受到损失，请在此处填写申诉单，客服会在1-2个工作日处理。</span><br>
            <span>您也可以直接咨询在线客服或拨打400-0000-0000</span>
          </div>
          <div class="bottom-body">
            <el-form label-width="100px">
              <p class="title">基本信息</p>
              <el-form-item label="申诉订单号">
                <el-input v-model="oFormData.ssddh" disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="申诉原因">
                <el-select v-model="oFormData.ssyy" placeholder="请填写申诉原因">
                  <el-option label="申诉原因1" value="申诉原因1"></el-option>
                  <el-option label="申诉原因2" value="申诉原因2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="oFormData.lxfs">
                </el-input>
              </el-form-item>
              <el-form-item label="付款方式">
                <el-select v-model="oFormData.fkfs" placeholder="请填写付款方式">
                  <el-option label="支付宝" value="ALIPAY"></el-option>
                  <el-option label="银行卡" value="BANK"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="渠道流水号">
                <el-input v-model="oFormData.qdlsh" disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="付款截图">

              </el-form-item>
              <el-form-item label="备注信息">
                <el-input type="textarea" v-model="oFormData.bzxx"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="clickButton">申诉</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Card, Form, Select, FormItem, Input, Button, Table, TableColumn, Option, Tag, Radio, RadioGroup } from 'element-ui'

Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(Select);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Option);
Vue.use(Tag);
Vue.use(Radio);
Vue.use(RadioGroup);
export default {
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
</style>
