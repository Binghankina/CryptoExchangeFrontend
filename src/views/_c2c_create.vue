<template lang="html">
  <div class="c2ccreate-page-auto">
    <div class="auto-box">
      <div class="top-body">
        <span>{{$t('usercenter.c2c.create_ad.title')}}  </span>
        <span>{{$t('usercenter.c2c.create_ad.desc')}}</span>
        <el-tag v-if="kyc_status !== 'verified'" type="danger">{{$t('usercenter.c2c.create_ad.kyc_desc')}}
          <router-link :to="{ path: 'account/kyc' }">
            {{$t('usercenter.c2c.kyc')}}
          </router-link>
        </el-tag>
        <el-tag v-if="radio === 'buy'" type="info">
          {{$t('usercenter.c2c.create_ad.buy_desc')}}
        </el-tag>
      </div>
      <div class="bottom-body">
        <el-form label-width="200px">
          <el-form-item :label="$t('usercenter.c2c.create_ad.type')">
            <el-radio-group v-model="radio">
              <el-radio-button label="sell">{{$t('usercenter.c2c.create_ad.sell')}}</el-radio-button>
              <el-radio-button label="buy">{{$t('usercenter.c2c.create_ad.buy')}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <template v-if="radio === 'sell'">
            <el-form-item :label="$t('usercenter.c2c.create_ad.coin_name')">
              <el-select v-model="oSellFormData.jybz" :placeholder="$t('usercenter.c2c.placeholder.coin_name')">
                <el-option label="OXT" value="OXT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.country')">
              <el-select v-model="oSellFormData.gj" :placeholder="$t('usercenter.c2c.placeholder.country')">
                <el-option label="中国" value="china"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.fiat')">
              <el-select v-model="oSellFormData.hb" :placeholder="$t('usercenter.c2c.placeholder.fiat')" disabled>
                <el-option label="CNY" value="CNY"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.price')">
              <el-input v-model="oSellFormData.jyjg" disabled>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.payment')">
              <el-radio v-model="oSellFormData.fkfs" label="ALIPAY" :disabled="!$store.state.user.alipay">
                {{$t('usercenter.c2c.alipay')}} <span>{{$store.state.user.alipay}}</span>
              </el-radio>
              <el-radio v-model="oSellFormData.fkfs" label="BANK" :disabled="!$store.state.user.bank_number">
                {{$t('usercenter.c2c.bank')}} <span>{{$store.state.user.bank_number}}</span>
              </el-radio>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.lowerlimit')">
              <el-input v-model="oSellFormData.zxscgs">
                <template slot="suffix">OXT</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.upperlimit')">
              <el-input v-model="oSellFormData.zdscgs">
                <template slot="suffix">OXT</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.contact')">
              <el-input type="textarea" v-model="oSellFormData.bzxx"></el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.assets_password')">
              <el-input type="password" v-model="oSellFormData.zjmm" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="clickButton">{{$t('usercenter.c2c.create_ad.publish')}}</el-button>
            </el-form-item>
          </template>
          <template v-if="radio === 'buy'">
            <el-form-item :label="$t('usercenter.c2c.create_ad.coin_name')">
              <el-select v-model="oBuyFormData.jybz" :placeholder="$t('usercenter.c2c.placeholder.coin_name')">
                <el-option label="OXT" value="OXT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.country')">
              <el-select v-model="oBuyFormData.gj" :placeholder="$t('usercenter.c2c.placeholder.country')">
                <el-option :label="中国" value="china"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.fiat')">
              <el-select v-model="oBuyFormData.hb" :placeholder="$t('usercenter.c2c.placeholder.currency')" disabled>
                <el-option label="CNY" value="CNY"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.price')">
              <el-input v-model="oBuyFormData.jyjg" disabled>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.expected_amount')">
              <el-input v-model="oBuyFormData.yjgm">
                <template slot="suffix">OXT</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('usercenter.c2c.create_ad.contact')">
              <el-input type="textarea" v-model="oBuyFormData.bzxx"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="clickButton">{{$t('usercenter.c2c.create_ad.publish')}}</el-button>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { RadioGroup, Radio, RadioButton, Select, Form, FormItem, Input, Button, Tag, Option } from 'element-ui'
import { runNotice } from "@/helpers";
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Option);
export default {
  data () {
    return {
      oSellFormData: {
        gj: 'china',
        hb: 'CNY',
        jyjg: 1
      },
      oBuyFormData: {
        gj: 'china',
        hb: 'CNY',
        jyjg: 1
      },
      radio: 'sell'
    }
  },
  mounted () {
    //kyc_status=this.$store.dispatch("user/GET_KYC_STATUS");
    // this.$store.dispatch("user/getTxInfo");
    //console.log(this.$store.state)
  },
  watch: {
    radio (n, o) {
      // console.log(n)
    }
  },
  methods: {
    clickButton () {
      if (this.radio === 'sell') {
        this.createSellOrder()
      } else if (this.radio === 'buy') {
        this.createBuyOrder()
      }
    },
    createSellOrder () {
      new ApiClient("auth")
        .post(
          "resource/users/tx/ad/sell/publish", {
            min_count: this.oSellFormData.zxscgs,
            max_count: this.oSellFormData.zdscgs,
            payment_method: this.oSellFormData.fkfs,
            tx_pw: this.oSellFormData.zjmm,
            remark: this.oSellFormData.bzxx,
            country: this.oSellFormData.gj,
            token_type: this.oSellFormData.jybz
          }
        ).then((res) => {
          //console.log(res)
          if (res.data === 201) {
            runNotice("success", "发布成功");
            this.initData()
          } else {
          }
        })
    },
    createBuyOrder () {
      new ApiClient("auth")
        .post(
          "resource/users/tx/ad/buy/publish", {
            expected_count: this.oBuyFormData.yjgm,
            remark: this.oBuyFormData.bzxx,
            country: this.oBuyFormData.gj,
            token_type: this.oBuyFormData.jybz
          }
        ).then((res) => {
          //console.log(res)
          if (res.data === 201) {
            this.$Message.success('发布成功');
            this.initData()
          } else {

          }
        })
    },
    initData () {
      this.oSellFormData = {
        gj: 'china',
        hb: 'CNY',
        jyjg: 1,
        yjgm: '',
        bzxx: '',
        jybz: ''
      }
      this.oBuyFormData = {
        gj: 'china',
        hb: 'CNY',
        jyjg: 1,
        yjgm: '',
        bzxx: '',
        jybz: ''
      }
    }
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.c2ccreate-page-auto
  .auto-box
    width: 800px
    margin: 0 auto
    .top-body
      width: 600px
      margin: 20px auto 0 auto
      > span:first-child
        font-size: 20px
        font-weight: bold
      > span:nth-child(2)
        font-size: 14px
      .el-tag
        margin-top: 10px
        cursor: pointer
    .bottom-body
      width: 600px
      margin: 20px auto 0 auto
      .el-form
        margin-top: 20px
        .el-radio-button__inner
          padding: 10px 20px
        .el-radio
          color: #fff
        .el-form-item__label
          color: #fff
</style>
