<template lang="html">
  <div class="login-body" :style="{minHeight: nWindowHeight + 'px'}">
    <div v-if="sShowPage === 'login'" class="logo-box-div">
      <img src="@/assets/img/m/logo.png" alt="">
      <form class="" action="#" method="post">
        <p class="">
    			<input v-model="mobile" name="logname" class="user-input" placeholder="手机号码" style="" type="text">
    		</p>
        <p class="password-p">
          <input v-model="password" :type="bShowPasswordStats ? 'text' : 'password'" name="logpass" class="user-input" placeholder="密码" style="">
          <i class="eye" @click="clickEye" :class="bShowPasswordStats ? 'open-eye' : 'close-eye'"></i>
    		</p>
        <div class="mb2">
          <a @click="login" class="act-but submit" href="javascript:;" style="">登录</a>
        </div>
      </form>
      <p class="options-p">
        <span @click="sShowPage = 'forgetpassword'">忘记密码?</span>
      </p>
      <p class="register-p">
        <span>还没注册GIH账号？</span>
        <router-link :to="{ path: '/m/register' }">
          <span>注册</span>
        </router-link>
      </p>
    </div>
    <div v-else-if="sShowPage === 'forgetpassword'" class="forget-password-div">
      <img @click="sShowPage = 'login'" class="back-img" src="@/assets/img/m/back.png" alt="">
      <div class="password-div">
        <p class="title-p">
          重置密码
        </p>
        <p>
          <input class="phone-input" type="text" name="" value="" v-model="oChangePasswordInfo.sPhoneNumber" placeholder="手机号码">
        </p>
        <p>
          <p class="verification-p">
            <span>验证码</span>
            <input type="text" name="" v-model="oChangePasswordInfo.sVerificationCode">
            <button @click="sendPhoneVerification" :class="oChangePasswordInfo.bIsGattingVerification ? 'disabled-button' : ''" type="button" name="button" v-click-effect>{{oChangePasswordInfo.sButtonText}}</button>
          </p>
          <p class="password-p">
            <input @blur.prevent="verifyPasswordFormat" class="password-input" :type="oChangePasswordInfo.bShowPasswordStats ? 'text' : 'password'" name="" v-model="oChangePasswordInfo.sPasswordInput" placeholder="请输入密码">
            <i class="eye" @click="clickForgetPageEye('pw')" :class="oChangePasswordInfo.bShowPasswordStats ? 'open-eye' : 'close-eye'"></i>
            <span v-if="oChangePasswordInfo.bShowPasswordDesc" class="desc">8-20位字符 不能为纯数字</span>
          </p>
          <p class="sure-password-p">
            <input @blur.prevent="judgeSurePasswordSame" class="sure-password-input" :type="oChangePasswordInfo.bShowSurePasswordStats ? 'text' : 'password'" name="" v-model="oChangePasswordInfo.sSurePasswordInput" placeholder="请再次输入密码">
            <i class="eye" @click="clickForgetPageEye('spw')" :class="oChangePasswordInfo.bShowSurePasswordStats ? 'open-eye' : 'close-eye'"></i>
            <span v-if="oChangePasswordInfo.bShowSurePasswordDesc" class="desc">两次密码输入不一样</span>
          </p>
          <div class="" style="text-align: center">
            <button @click="ForgotPassword" class="sure-button" type="button" name="button" v-click-effect>确认</button>
          </div>
          <p class="options-p">
            <span @click="sShowPage = 'login'">回到登录</span>
          </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sShowPage: 'login',  // login, forgetpassword
      mobile: '',
      password: "",
      otp_code: "",
      nWindowHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
      bShowPasswordStats: false,
      oChangePasswordInfo: {
        sPhoneNumber:'',
        sPasswordInput: '',
        sSurePasswordInput: '',
        sVerificationCode: '',
        bIsGattingVerification: false,
        sButtonText: this.$t('auth.get_verification_code'),
        bShowPasswordDesc: false,
        bShowSurePasswordDesc: false,
        bShowPasswordStats: false,
        bShowSurePasswordStats: false
      }
    }
  },
  methods: {
    async callLogin() {
      this.loading = true;
      const { mobile, password, otp_code } = this;
      await this.$store.dispatch("user/LOGIN", { mobile, password, otp_code });
      // XXX: 加到登陆成功回调中
      setTimeout(() => {
        this.$store.dispatch("user/getTxInfo");
      }, 1000)
      this.loading = false;
    },
    login() {
      this.callLogin();
    },
    clickEye: function () {
      this.bShowPasswordStats = !this.bShowPasswordStats
    },
    clickForgetPageEye: function (e) {
      if (e === 'pw') {
        this.oChangePasswordInfo.bShowPasswordStats = !this.oChangePasswordInfo.bShowPasswordStats
      } else if (e === 'spw') {
        this.oChangePasswordInfo.bShowSurePasswordStats = !this.oChangePasswordInfo.bShowSurePasswordStats
      }
    },
    sendPhoneVerification () {
      if (this.oChangePasswordInfo.bIsGattingVerification) {
        return
      }
      new ApiClient("auth")
        .post("/identity/users/sms/send", {
          mobile: this.oChangePasswordInfo.sPhoneNumber
        })
        .then(() => {
          this.oChangePasswordInfo.bIsGattingVerification = true
          var _t = 60
          this.oChangePasswordInfo.sButtonText = _t + 's后重新获取'
          this.eTimer = setInterval(() => {
            if (_t <= 0) {
              clearInterval(this.eTimer)
              this.oChangePasswordInfo.bIsGattingVerification = false
              this.oChangePasswordInfo.sButtonText = '重新获取'
              return
            }
            _t--
            this.oChangePasswordInfo.sButtonText = _t + 's后重新获取'
          }, 1000)
        })
        .catch(error => error);
    },
    verifyPasswordFormat () {
      var reg = /^(?![0-9]+$)[\x20-\x7e]{8,16}$/
      if (reg.test(this.oChangePasswordInfo.sPasswordInput)) {
        this.oChangePasswordInfo.bShowPasswordDesc = false
      } else {
        this.oChangePasswordInfo.bShowPasswordDesc = true
      }
    },
    judgeSurePasswordSame () {
      if (this.oChangePasswordInfo.sPasswordInput !== this.oChangePasswordInfo.sSurePasswordInput) {
        this.oChangePasswordInfo.bShowSurePasswordDesc = true
      } else {
        this.oChangePasswordInfo.bShowSurePasswordDesc = false
      }
    },
    ForgotPassword() {
      const { mobile} = this;
      new ApiClient("auth")
        .post("/identity/users/password/reset_password", {
          mobile: this.oChangePasswordInfo.sPhoneNumber,
          password: this.oChangePasswordInfo.sPasswordInput,
          password_confirm: this.oChangePasswordInfo.sSurePasswordInput,
          code: this.oChangePasswordInfo.sVerificationCode
        })
        .then(() => {
          runNotice("success", "密码重置成功");
          router.push("/signin");
        })
        .catch(error => error);
    }
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
.login-body
  font-size: px2rem(14px)
  background-color: #fff
  background-position: 50%
  color: #333
  .logo-box-div
    width: px2rem(280px)
    height: px2rem(490px)
    padding-top: px2rem(80px)
    margin: 0 auto
    text-align: center
    form
      margin-top: px2rem(20px)
      .password-p
        position: relative
        margin-top: px2rem(10px)
        .eye
          position: absolute
          top: px2rem(16px)
          right: px2rem(8px)
          width: px2rem(16px)
          height: px2rem(16px)
          background-size: 100% 100%
        .open-eye
          background-image: url('../../assets/img/m/eye.png')
        .close-eye
          background-image: url('../../assets/img/m/eye-slash.png') !important
      .user-input
        font-size: px2rem(16px)
        padding: px2rem(12px) px2rem(32px) px2rem(12px) px2rem(12px)
        width: 100%
        border-radius: px2rem(6px)
        border: 1px solid #eee
      .u-user
      	position: absolute
      	width: px2rem(25px)
      	height: px2rem(25px)
      	background-image: url('../../assets/img/m/user.png')
      	margin: px2rem(12px) px2rem(13px)
      .l-login
      	position: absolute
      	z-index: 1
      	left: 30px
      	top: 0
      	height: 46px
      	line-height: 46px
      .us-uer
      	position: absolute
      	width: px2rem(25px)
      	height: px2rem(25px)
      	background-image: url('../../assets/img/m/password.png')
      	margin: px2rem(12px) px2rem(13px)
        background-repeat: no-repeat
        background-size: 100% 100%
      .mb2
      	margin-bottom: px2rem(20px)
        height: px2rem(50px)
      .submit
        padding: px2rem(15px)
        margin-top: px2rem(20px)
        display: block
        color: #fff
      .act-but
        height: 100%
        line-height: px2rem(20px)
        text-align: center
        font-size: px2rem(20px)
        border-radius: px2rem(50px)
        background: #003E58
      .mb2 a
      	text-decoration: none
      	outline: none
    .options-p
      font-size: px2rem(16px)
      overflow: auto
      text-align: left
      color: #08a7fc
    .register-p
      font-size: px2rem(16px)
      margin-top: px2rem(40px)
      text-align: left
    .register-p span:first-child
      color: #888
    .register-p span:last-child
      color: #08a7fc
  .forget-password-div
    position: relative
    width: px2rem(320px)
    margin: 0 auto
    .back-img
      position: fixed
      width: px2rem(28px)
      top: px2rem(10px)
      left: px2rem(10px)
    .password-div
      position: relative
      width: px2rem(320px)
      padding-top: px2rem(60px)
      margin: 0 auto
      .title-p
        margin-top: 0
        text-align: left
        color: #003E58
        font-size: px2rem(36px)
      p
        margin-top: px2rem(20px)
        text-align: center
        input
          width: 100%
          font-size: px2rem(16px)
          padding: px2rem(12px) px2rem(12px)
          border-radius: px2rem(6px)
          border: 1px solid #eee
      .password-p, .sure-password-p
        margin-top: px2rem(20px)
        position: relative
        position: relative
        .eye
          position: absolute
          top: px2rem(14px)
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
      .password-input, .sure-password-input
        padding: px2rem(12px) px2rem(32px) px2rem(12px) px2rem(12px)
        width: 100%
        border: 1px solid #eee
      .verification-p
        margin-top: px2rem(20px)
        font-size: px2rem(14px)
        text-align: center
        span
          margin-right: px2rem(4px)
          vertical-align: middle
          border: 1px solid #eee
          color: #003E58
          padding: px2rem(13px) px2rem(8px)
        input
          font-size: px2rem(16px)
          width: px2rem(132px)
          padding: px2rem(9px) px2rem(8px)
          border: 1px solid #eee
          margin-right: px2rem(4px)
          vertical-align: middle
        button
          background-color: #003E58
          color: #fff
          width: px2rem(112px)
          padding: px2rem(12px) 0
          font-size: px2rem(14px)
          border-radius: px2rem(4px)
          font-weight: 200
          vertical-align: middle
        .disabled-button
          background-color: #A9ABAC
      .sure-button
        margin-top: px2rem(30px)
        border-radius: px2rem(4px)
        width: px2rem(320px)
        background-color: #003E58
        color: #fff
        font-size: px2rem(16px)
        padding: px2rem(12px) 0
        border: none
      .options-p
        font-size: px2rem(14px)
        overflow: auto
        text-align: left
        color: #08a7fc
</style>
