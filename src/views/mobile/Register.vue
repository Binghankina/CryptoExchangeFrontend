<template lang="html">
  <div class="register-body" :style="{minHeight: nWindowHeight + 'px'}">
    <div v-if="sShowRegisterPage === 'phone'" class="phone-div">
      <img @click="redirect_link ('login')" class="back-img" src="@/assets/img/m/back.png" alt="">
      <p class="title-p">
        <span>手机注册</span>
        <span></span>
      </p>
      <p class="phone-p">
        <span @click="bShowSelectPhoneAreaCodePopup = true" class="area-code-span">{{sSelectPhoneAreaCode[0]}}
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAJBJREFUOBFjYBgFAx8CjMhOmLd01QNGRgZ5ZDF09n8Gho9JUWECMHEmGANEA00LYPjP8AFZDIUNlGNkZAxAFkNxAUhi/tJVBkBqP9A0uC1gDRCDHROjwy6A+VACxQUgMbACLlZFoEsQCkFspr+G6JpB6jFcABIEgfnr1wswfPu9H8zhYnVMDAz8AGaPEtQPAQClfCFMEOd1bQAAAABJRU5ErkJggg==" alt="">
        </span>
        <input class="phone-input" type="text" name="" v-model="oPhoneRegisterInfo.sPhoneNumber" placeholder="手机号码">
      </p>
      <p class="verification-p">
        <span>验证码</span>
        <input type="text" name="" v-model="oPhoneRegisterInfo.sVerificationCode">
        <button @click="sendPhoneVerification" :class="oPhoneRegisterInfo.isGattingVerification ? 'disabled-button' : ''" type="button" name="button" v-click-effect>{{oPhoneRegisterInfo.sButtonText}}</button>
      </p>
      <button @click="clickNextButton" class="next-button" type="button" name="button" v-click-effect>下一步</button>
      <p class="jump-login-p">
        <span>已有GIH账号？</span>
        <router-link :to="{ path: '/m/login' }">
          <span>登录</span>
        </router-link>
      </p>
    </div>
    <!-- <div v-if="sShowRegisterPage === 'countries'" class="countries-div">
      <search
      @result-click="resultClick"
      @on-change="getResult"
      placeholder="请选择国家或者地区"
      :results="oSelectCountriesInfo.results"
      v-model="oSelectCountriesInfo.sSearchCountries"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
      <group v-show="oSelectCountriesInfo.bDefaultCountries">
        <cell @click.native="clickDefaultCountries(item.name)" v-bind:key="item.name" v-for="item in aCountriesList" :title="item.name">+{{item.number}}</cell>
      </group>
    </div> -->
    <div v-if="sShowRegisterPage === 'password'" class="password-div">
      <img @click="sShowRegisterPage = 'phone'" class="back-img" src="@/assets/img/m/back.png" alt="">
      <p class="title-p">
        设置密码
      </p>
      <p class="desc-p">
        8-20个字符，不可以是纯数字
      </p>
      <p class="password-p">
        <input @blur.prevent="verifyPasswordFormat" class="password-input" :type="oSetPasswordInputStats.bShowPasswordStats ? 'text' : 'password'" name="" v-model="oPasswordInfo.sPasswordInput" placeholder="请输入密码">
        <i class="eye" @click="clickEye('pw')" :class="oSetPasswordInputStats.bShowPasswordStats ? 'open-eye' : 'close-eye'"></i>
        <span v-if="oPasswordInfo.bShowPasswordDesc" class="desc">8-20位字符 不能为纯数字</span>
      </p>
      <p class="sure-password-p">
        <input @blur.prevent="judgeSurePasswordSame" class="sure-password-input" :type="oSetPasswordInputStats.bShowSurePasswordStats ? 'text' : 'password'" name="" v-model="oPasswordInfo.sSurePasswordInput" placeholder="请再次输入密码">
        <i class="eye" @click="clickEye('spw')" :class="oSetPasswordInputStats.bShowSurePasswordStats ? 'open-eye' : 'close-eye'"></i>
        <span v-if="oPasswordInfo.bShowSurePasswordDesc" class="desc">两次密码输入不一样</span>
      </p>
      <el-checkbox v-model="bPhoneCheckedValue" class="checkbox">
        {{ $t('auth.i_have_read_and_agree') }}
        <span style="color: #409EFF;">《{{ $t('auth.user_agreement_and_privacy_policy') }}》</span>
      </el-checkbox>
      <button @click="register" class="register-button" type="button" name="button" :disabled="!bPhoneCheckedValue" v-click-effect>注册</button>
    </div>
    <div v-transfer-dom>
      <popup v-model="bShowAgreementPopup" height="100%">
        <div class="">
          <img @click="bShowAgreementPopup = false" src="@/assets/img/m/back.png" alt="">
          <p>用户协议及隐私政策</p>
        </div>
      </popup>
      <!--
      <popup class="cant-countries-popup" v-model="bShowCantCountriesPopup" is-transparent>
        <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;color: #333;">
          <p>
            以下区域请勿注册
            <img @click="bShowCantCountriesPopup = false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA4ElEQVRYR+2WUQ4CMQhEh5vozfRkejO9CaaJTYhpy8Cq7Uf3d4F5O8C2gsmPTNbHBtgOuA6o6klEnplhZXKHAKp6AXADcBWRewSCze0CFHoADyNKQxjxmn7uucg6UAu5EA3xYQ4zA7UNLkRUvBR0AUoQU5iJac0QBeBBZMVpByp5S+j9rmyK26JDDgwgbF13SD8h6BbYxIYT5XVYPNwCx4X/AHS+PtX/sANTh3C0aj9fQ0aAiUmtYaRwJLbCrHsYrXYch3f88IXE/HTmXckiV7BsbOosyIql1vCbYhtgSQdeDpKoIXzqLREAAAAASUVORK5CYII=" alt="">
          </p>
          <x-table full-bordered>
            <tbody>
              <tr>
                <td>孟加拉国</td>
                <td>白俄罗斯</td>
                <td>玻利维亚</td>
                <td>布隆迪</td>
              </tr>
              <tr>
                <td>中非共和国</td>
                <td>刚果民主共和国</td>
                <td>科特迪瓦</td>
                <td>古巴</td>
              </tr>
              <tr>
                <td>厄瓜多尔</td>
                <td>伊朗</td>
                <td>伊拉克</td>
                <td>朝鲜</td>
              </tr>
              <tr>
                <td>吉尔吉斯斯坦</td>
                <td>利比亚</td>
                <td>美属维尔京群岛</td>
                <td>中国大陆地区</td>
              </tr>
              <tr>
                <td>威尔瑞拉</td>
                <td>也门</td>
                <td>俄罗斯</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </popup>
      -->
      <popup class="phone-area-popup" v-model="bShowSelectPhoneAreaCodePopup">
        <div style="width: 100%;background-color:#fff;margin:0 auto;">
          <picker :data="aPhoneAreaList" v-model="sSelectPhoneAreaCode"></picker>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
// import Helpers from "../helpers"
import Vue from 'vue'
import { Group, Cell, PopupRadio, Search, Popup, XTable, Picker } from 'vux';
import { Checkbox } from 'element-ui';
Vue.use(Checkbox)
export default {
  // mixins: [Helpers],
  components: {
    Group, Cell, PopupRadio, Search, Popup, XTable, Picker
  },
  data () {
    return {
      sShowRegisterPage: 'phone', //  email, phone, password     //, countries
      nWindowHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
      oEmailRegisterInfo: {
        sEmailAddress: '',
        isGattingVerification: false,
        sVerificationCode: '',
        sButtonText: '获取验证码'
      },
      oPhoneRegisterInfo: {
        sPhoneNumber: '',
        isGattingVerification: false,
        sVerificationCode: '',
        sButtonText: this.$t('auth.get_verification_code'),
      },
      aCountriesList: [
        {
          name: '中国',
          number: '86'
        }, {
          name: '韩国',
          number: '112'
        }, {
          name: '日本',
          number: '113'
        }, {
          name: '美国',
          number: '114'
        }, {
          name: '澳大利亚',
          number: '115'
        }, {
          name: '英国',
          number: '116'
        }
      ],
      oSelectCountriesInfo: {
        results: [],
        sSearchCountries: '',
        bDefaultCountries: true
      },
      oPasswordInfo: {
        bShowInvitationInput: false,
        sPasswordInput: '',
        sSurePasswordInput: '',
        bShowPasswordDesc: false,
        bShowSurePasswordDesc: false
      },
      bShowAgreementPopup: false,
      oSetPasswordInputStats: {
        bShowPasswordStats: false,
        bShowSurePasswordStats: false
      },
      bShowCantCountriesPopup: true,
      bShowSelectPhoneAreaCodePopup: false,
      aPhoneAreaList: [[
        {
          name: '+65  新加坡',
          value: '+65'
        },
        {
          name: '+86  中国',
          value: '+86'
        }

      ]],
      sSelectPhoneAreaCode: ['+86'],
      checked: false,
      bPhoneCheckedValue: false
    }
  },
  methods: {
    clickNextButton () {
      if (this.sShowRegisterPage === 'phone' && this.oPhoneRegisterInfo.sPhoneNumber.length && this.oPhoneRegisterInfo.sVerificationCode.length === 6) {
        this.sShowRegisterPage = 'password'
      } else {
        this.$Message.error('请检查信息')
      }
    },
    verifyPasswordFormat () {
      //  @helpers/validPassword.js中
      var reg = /^(?![0-9]+$)[\x20-\x7e]{8,20}$/
      if (reg.test(this.oPasswordInfo.sPasswordInput)) {
        this.oPasswordInfo.bShowPasswordDesc = false
      } else {
        this.oPasswordInfo.bShowPasswordDesc = true
      }
    },
    judgeSurePasswordSame () {
      if (this.oPasswordInfo.sPasswordInput !== this.oPasswordInfo.sSurePasswordInput) {
        this.oPasswordInfo.bShowSurePasswordDesc = true
      } else {
        this.oPasswordInfo.bShowSurePasswordDesc = false
      }
    },
    sendEmailVerification () {
      if (this.oEmailRegisterInfo.isGattingVerification) {
        return
      }
      this.oEmailRegisterInfo.isGattingVerification = true
      var _t = 60
      this.oEmailRegisterInfo.sButtonText = _t + 's后重新获取'
      this.eTimer = setInterval(() => {
        if (_t <= 0) {
          clearInterval(this.eTimer)
          this.oEmailRegisterInfo.isGattingVerification = false
          this.oEmailRegisterInfo.sButtonText = '重新获取'
          return
        }
        _t--
        this.oEmailRegisterInfo.sButtonText = _t + 's后重新获取'
      }, 1000)
    },
    sendPhoneVerification () {
      if (this.oPhoneRegisterInfo.isGattingVerification) {
        return
      }
      //console.log(this.oPhoneRegisterInfo)
      new ApiClient("auth")
        .post("/identity/users/sms/send", {
          mobile: this.oPhoneRegisterInfo.sPhoneNumber
        })
        .then(() => {
          this.oPhoneRegisterInfo.isGattingVerification = true
          var _t = 60
          this.oPhoneRegisterInfo.sButtonText = _t + 's后重新获取'
          this.pTimer = setInterval(() => {
            if (_t <= 0) {
              clearInterval(this.pTimer)
              this.oPhoneRegisterInfo.isGattingVerification = false
              this.oPhoneRegisterInfo.sButtonText = '重新获取'
              return
            }
            _t--
            this.oPhoneRegisterInfo.sButtonText = _t + 's后重新获取'
          }, 1000)
        })
        .catch(error => error);
    },
    initEmailOrPhoneRegisterData (e) {
      if (e === 'email') {
        this.oEmailRegisterInfo = {
          sEmailAddress: '',
          isGattingVerification: false,
          sVerificationCode: '',
          sButtonText: '获取验证码'
        }
      } else if (e === 'phone') {
        this.oPhoneRegisterInfo = {
          sPhoneNumber: '',
          isGattingVerification: false,
          sVerificationCode: '',
          sButtonText: this.$t('auth.get_verification_code'),
        }
      }
    },
    changeRegisterMethod (e) {
      if (e === 'email') {
        this.initEmailOrPhoneRegisterData('phone')
        clearInterval(this.pTimer)
        this.sShowRegisterPage = 'email'
      } else if (e === 'phone') {
        this.initEmailOrPhoneRegisterData('email')
        clearInterval(this.eTimer)
        this.sShowRegisterPage = 'phone'
      }
    },
    clickDefaultCountries: function (e) {
      window.console.log(e)
      this.sShowRegisterPage = 'password'
    },
    setFocus () {
      window.console.log('setFocus')
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.console.log('resultClick', item)
      this.sShowRegisterPage = 'password'
    },
    getResult (val) {
      let self = this
      this.oSelectCountriesInfo.results = getResult(val)
      function getResult (val) {
        let rs = []
        for (let i of self.aCountriesList) {
          if (i.name.indexOf(val) !== -1) {
            rs.push({
              title: i.name
            })
          }
        }
        return rs
      }
    },
    onSubmit () {
    },
    onFocus () {
      window.console.log('on focus')
      this.oSelectCountriesInfo.bDefaultCountries = false
    },
    onCancel () {
      window.console.log('on cancel')
      this.oSelectCountriesInfo.bDefaultCountries = true
    },
    clickEye (e) {
      if (e === 'pw') {
        this.oSetPasswordInputStats.bShowPasswordStats = !this.oSetPasswordInputStats.bShowPasswordStats
      } else if (e === 'spw') {
        this.oSetPasswordInputStats.bShowSurePasswordStats = !this.oSetPasswordInputStats.bShowSurePasswordStats
      }
    },
    register () {
      //if (this.oPasswordInfo.bShowSurePasswordDesc || !this.oPasswordInfo.sPasswordInput.length || !this.checked) {
      //  return
      //}
      new ApiClient("auth")
        .post("/identity/users", {
          mobile: this.oPhoneRegisterInfo.sPhoneNumber,
          password: this.oPasswordInfo.sPasswordInput,
          code: this.oPhoneRegisterInfo.sVerificationCode,
          country_code: this.sSelectPhoneAreaCode[0]
        })
        .then(() => {
          console.log('注册成功')
          this.$Message.success('注册成功');
          setTimeout(() => {
            // this.$router.push({path: '/m/login'})
            this.login();
          }, 1000)
        })
        .catch(error => error);
    },
    redirect_link (link) {
        this.$router.push(link)
    },
    async login () {
      await this.$store.dispatch("user/LOGIN", {
        mobile: this.oPhoneRegisterInfo.sPhoneNumber,
        password: this.oPasswordInfo.sPasswordInput,
        otp_code: ''
      });
    },
  },
  created: function () {
    // this.$emit('changeAppFooterStatus', false)
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.register-body
  background-color: #fff
  .phone-div
    width: px2rem(320px)
    padding-top: px2rem(60px)
    margin: 0 auto
    color: #333
    .back-img
      position: fixed
      width: px2rem(28px)
      top: px2rem(10px)
      left: px2rem(10px)
    .title-p span:first-child
      color: #003E58
      font-size: px2rem(36px)
    .title-p span:last-child
      font-size: px2rem(14px)
      color: red
    .desc-p
      font-size: px2rem(14px)
      color: red
    .email-p, .phone-p
      margin-top: px2rem(20px)
      font-size: 0
      span
        margin-right: px2rem(4px)
    .email-input
      width: 100%
      font-size: px2rem(16px)
      padding: px2rem(12px) px2rem(12px)
      border: none
      border-radius: px2rem(4px)
      border: 1px solid #eee
    .area-code-span
      border: 1px solid #eee
      color: #003E58
      padding: px2rem(14px) px2rem(9px)
      font-size: px2rem(16px)
      border-radius: px2rem(4px)
      img
        width: px2rem(10px)
    .phone-input
      width: px2rem(254px)
      font-size: px2rem(16px)
      padding: px2rem(12px) px2rem(12px)
      border-radius: 6px
      border: 1px solid #eee
    .verification-p
      margin-top: px2rem(20px)
      text-align: center
      font-size: 0
      span
        margin-right: px2rem(4px)
        vertical-align: middle
      input
        font-size: px2rem(16px)
        width: px2rem(138px)
        padding: px2rem(9px) px2rem(9px)
        border: 1px solid #eee
        margin-right: px2rem(4px)
        border-radius: px2rem(4px)
        vertical-align: middle
      button
        background-color: #003E58
        color: #fff
        width: px2rem(112px)
        padding: px2rem(11px) 0
        font-size: px2rem(14px)
        border-radius: px2rem(4px)
        font-weight: 200
        vertical-align: middle
      .disabled-button
        background-color: #A9ABAC
    .verification-p span:nth-child(1)
      border: 1px solid #eee
      color: #003E58
      padding: px2rem(12.5px) px2rem(8.5px)
      border-radius: px2rem(4px)
      font-size: px2rem(14px)
    .next-button
      margin-top: px2rem(30px)
      border-radius: px2rem(4px)
      width: 100%
      background-color: #003E58
      color: #fff
      font-size: px2rem(16px)
      padding: px2rem(12px) 0
      border: none
    .phone-register-p
      font-size: px2rem(16px)
      margin-top: px2rem(20px)
      color: #08a7fc
    .jump-login-p
      margin-top: px2rem(40px)
      font-size: px2rem(16px)
    .jump-login-p span:first-child
      color: #888
    .jump-login-p span:last-child
      color: #08a7fc
  .countries-div
    line-height: px2rem(30px)
    font-size: px2rem(16px)
    position: relative
    .weui-cells
      margin-top: px2rem(10px)
    .weui-search-bar__box .weui-icon-search
      line-height: 30px
  .password-div
    position: relative
    width: px2rem(320px)
    padding-top: px2rem(60px)
    margin: 0 auto
    .back-img
      position: fixed
      width: px2rem(28px)
      top: px2rem(10px)
      left: px2rem(10px)
    .title-p
      color: #003E58
      font-size: px2rem(36px)
    .desc-p
      font-size: px2rem(14px)
      color: #9FA6AA
    .password-p, .sure-password-p
      margin-top: px2rem(20px)
      position: relative
      position: relative
      .eye
        position: absolute
        top: px2rem(30px)
        right: px2rem(12px)
        width: px2rem(16px)
        height: px2rem(16px)
        background-size: 100% 100%
      .open-eye
        background-image: url('../../assets/img/m/eye.png')
      .close-eye
        background-image: url('../../assets/img/m/eye-slash.png') !important
      .desc
        position: absolute
        font-size: px2rem(10px)
        color: #DA0E26
        left: px2rem(4px)
    .password-input, .sure-password-input, .invitation-input
      font-size: px2rem(16px)
      padding: px2rem(12px) px2rem(32px) px2rem(12px) px2rem(12px)
      width: 100%
      border-radius: 6px
      border: 1px solid #eee
    .invitation-p
      font-size: px2rem(14px)
      color: #9FA6AA
      margin-top: px2rem(20px)
    .agreement-p
      margin-top: px2rem(30px)
      font-size: px2rem(14px)
      color: #9FA6AA
      .weui-check
        position: relative
        // top: px2rem(-2px)
      span
        color: #08a7fc
    .register-button
      margin-top: px2rem(30px)
      border-radius: px2rem(4px)
      width: 100%
      background-color: #003E58
      color: #fff
      font-size: px2rem(16px)
      padding: px2rem(12px) 0
      border: none
    .register-button:disabled
      opacity: 0.6
.cant-countries-popup
  top: px2rem(100px)
  p
    position: relative
    text-align: center
    background-color: #053E59
    color: #fff
    padding: px2rem(10px)
    font-size: px2rem(20px)
    img
      position: absolute
      right: px2rem(4px)
      width: px2rem(28px)
  td
    padding: px2rem(8px) 0
    font-size: px2rem(14px)
    line-height: px2rem(16px)
.phone-area-popup
  // top: px2rem(100px)
.checkbox .el-checkbox__label
  color: #888 !important;
  font-size: 12px;

</style>
