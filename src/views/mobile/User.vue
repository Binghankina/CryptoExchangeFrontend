<template lang="html">
  <div class="user-body">
    <div v-if="sShowPage === 'default'" class="default-div">
      <div class="top-div">
        <p>{{ $t('header.user_center') }}</p>
        <div class="user-info-div">
          <img src="@/assets/img/avatar.png" alt="">
          <span>{{ $t('header.user.name') }}: {{ $store.state.user.mobile }}</span>
        </div>
      </div>
      <div class="main-div">
        <CellGroup>
          <Cell class="action" @click.native="sShowPage = 'realnameauthentication'" :title="$t('header.user.kyc_account_verification')" :extra="$t('header.action.setting')">
            <img slot="icon" width="24" style="display: block;margin-right: 8px;" src="@/assets/img/m/download-15.png" alt="">
          </Cell>
          <!-- <Cell class="action" @click.native="clickGoogleValidation" title="谷歌验证器" extra="未开启">
            <img slot="icon" width="24" style="display: block;margin-right: 8px;" src="@/assets/img/m/download-16.png" alt="">
          </Cell> -->
          <Cell class="action" @click.native="sShowPage = 'changePassword'" :title="$t('header.user.password_change')"  :extra="$t('header.action.modify')">
            <img slot="icon" width="24" style="display: block;margin-right: 8px;" src="@/assets/img/m/download-17.png" alt="">
          </Cell>
          <Cell class="action" @click.native="clickChangeMoneyPassword" :title="$t('header.user.trade_password')" :extra="$store.state.user.tx_pw ? $t('header.action.modify') : $t('header.action.setting')">
            <img slot="icon" width="24" style="display: block;margin-right: 8px;" src="@/assets/img/m/download-18.png" alt="">
          </Cell>
          <Cell class="action" @click.native="sShowPage = 'changeLanguage'" :title="$t('header.user.language')" :extra="$t('header.action.setting')">
            <img slot="icon" width="24" style="display: block;margin-right: 8px;" src="@/assets/img/m/download-19.png" alt="">
          </Cell>
        </CellGroup>
      </div>
      <div class="" style="text-align: center">
        <button @click="logout" class="login-out-button" type="button" name="button" v-click-effect>{{ $t('header.user.logout') }}</button>
      </div>
    </div>
    <div v-else-if="sShowPage === 'changePassword'" class="change-password-div">
      <img @click="sShowPage = 'default'" class="back-img" src="@/assets/img/m/back.png" alt="">
      <div class="password-div">
        <p class="title-p">
          {{ $t('header.user.password_change') }}
        </p>
        <form @submit.prevent="changePSW()">
          <div class="form-control">
            <auth-input
              name="old_password"
              type="password"
              ref="old_password"
              v-model="old_password"
              :value="old_password"
              :className="{ g: old_password }"
              :placeholder="$t('placeholder.old_password')"
              :labelNeed="true"
            />
          <auth-input
            name="new_password"
            type="password"
            ref="new_password"
            v-model="new_password"
            :value="new_password"
            :className="{ g: new_password }"
            :placeholder="$t('placeholder.new_password')"
            :labelNeed="true"
          />
          <auth-input
            name="confirm_password"
            type="password"
            ref="confirm_password"
            v-model="confirm_password"
            :value="confirm_password"
            :className="{ g: confirm_password }"
            :placeholder="$t('placeholder.repassword')"
            :labelNeed="true"
          />
          </div>
          <div class="form-submit">
            <button type="submit">{{$t('usercenter.sure')}}</button>
          </div>
        </form>          
      </div>
    </div>
    <div v-else-if="sShowPage === 'changeLanguage'" class="language-div" >
      <img @click="sShowPage = 'default'" class="back-img" src="@/assets/img/m/back.png" alt="">
      <div align="center" class="lang">
        <button @click="setLanguage('zh')" class="change-button" type="button" name="button" v-click-effect>中文</button>
        <button @click="setLanguage('en')" class="change-button" type="button" name="button" v-click-effect>English</button>
      </div>
    </div>
    <div v-else-if="sShowPage === 'realnameauthentication'" class="realname-authentication-div">
      <img @click="sShowPage = 'default'" class="back-img" src="@/assets/img/m/back.png" alt="">
        <div class="setting-body">
          <div v-if="kyc_status === ''">
          </div>
          <div v-else-if="kyc_status === 'uploaded'">
            <p class="status">{{$t('usercenter.KYC_account_verification.status_uploaded')}}</p>
          </div>
          <div v-else-if="kyc_status === 'verified'">
            <p class="status">{{$t('usercenter.KYC_account_verification.status_verified')}}</p>
          </div>
          <div v-else>
            <div v-if="kyc_status === 'failed'">
              <p class="status">{{$t('usercenter.KYC_account_verification.status_failed')}}</p>
            </div>
            <form @submit.prevent="onSubmit">
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.country_region')}}：</label>
                <div class="form-control">
                  <auto-complete :rows="getAllRegion" :default_value="country" event="region" type="big"/>
                </div>
              </div>
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.first_name')}}：</label>
                <div class="form-control">
                  <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_first_name')" v-model="first_name">
                </div>
              </div>
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.last_name')}}：</label>
                <div class="form-control">
                  <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_last_name')" v-model="last_name">
                </div>
              </div>
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.type_of_certificate')}}：</label>
                <div class="form-control">
                  <auto-complete
                  :rows="[{
                      code: 'Passport',
                      type: 'certificate',
                      name: $t('usercenter.KYC_account_verification.passport')
                    }, {
                      code: 'Identity card',
                      type: 'certificate',
                      name: $t('usercenter.KYC_account_verification.identity_card')
                    }, {
                      code: 'Driver license',
                      type: 'certificate',
                      name: $t('usercenter.KYC_account_verification.driver_license')
                    }, {
                      code: 'Utility Bill',
                      type: 'certificate',
                      name: $t('usercenter.KYC_account_verification.utility_bill')
                    }]"
                    :default_value="doc_type"
                    event="doc_type"
                    type="big"
                  />
                </div>
              </div>
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.ID_number')}}：</label>
                <div class="form-control">
                  <input type="text" :placeholder="$t('usercenter.KYC_account_verification.please_enter_your_ID_Number')" v-model="doc_number">
                </div>
              </div>
              <div class="form-row">
                <label class="form-label">{{$t('usercenter.KYC_account_verification.ID_photo')}}：</label>
                <div class="form-control upload-photos">
                  <ul class="photos-list">
                    <li class="front">
                      <div class="upload-box">
                        <input
                          type="file"
                          ref="front_file"
                          name="front_file"
                          accept="image/*"
                          @change="onFileChange($event, 'front')"
                        >
                        <div class="img-uploaded">
                          <img :src="uploaded_front_side" class="preview" v-if="uploaded_front_side">
                        </div>
                        <div class="upload-area">
                          <img v-if="!uploaded_front_side" src="@/assets/img/action_add.png">
                          <p>{{$t('usercenter.KYC_account_verification.click_to_upload_the_front_side_of_the_ID_photo')}}</p>
                        </div>
                      </div>
                      <div class="upload-notice">
                        <p>{{$t('usercenter.KYC_account_verification.avatar_ID_number_gender_address_etc_need_to_be_clear')}}</p>
                      </div>
                    </li>
                    <li class="back">
                      <div class="upload-box">
                        <input
                          type="file"
                          ref="back_file"
                          name="back_file"
                          accept="image/*"
                          @change="onFileChange($event, 'back')"
                        >
                        <div class="img-uploaded">
                          <img :src="uploaded_back_side" class="preview" v-if="uploaded_back_side">
                        </div>
                        <div class="upload-area">
                          <img v-if="!uploaded_back_side" src="@/assets/img/action_add.png">
                          <p>{{$t('usercenter.KYC_account_verification.click_to_upload_the_back_side_of_the_ID_photo')}}</p>
                        </div>
                      </div>
                      <!--<img src="@/assets/img/kyc_example.png" class="thumbnail-box">-->
                      <div class="upload-notice">
                        <p>{{$t('usercenter.KYC_account_verification.issuing_authority_the_effective_date_need_to_be_clear')}}</p>
                      </div>
                    </li>
                    <li class="in-hand">
                      <div class="upload-box">
                        <input
                          type="file"
                          ref="hand_file"
                          name="hand_file"
                          accept="image/*"
                          @change="onFileChange($event, 'hand')"
                        >
                        <div class="img-uploaded">
                          <img :src="uploaded_hand_held" class="preview" v-if="uploaded_hand_held">
                        </div>
                        <div class="upload-area">
                          <img v-if="!uploaded_hand_held" src="@/assets/img/action_add.png">
                          <p>{{$t('usercenter.KYC_account_verification.upload_a_hand_held_ID_photo')}}</p>
                        </div>
                      </div>
                      <!--<img src="@/assets/img/kyc_example.png" class="thumbnail-box">-->
                      <div class="upload-notice">
                        <p>{{$t('usercenter.KYC_account_verification.hand_held_ID_photo_standards')}}:</p>
                        <p>1. {{$t('usercenter.KYC_account_verification.The_character_avatar_is_clear')}};</p>
                        <p>2. {{$t('usercenter.KYC_account_verification.The_identity_document_information_is_clear')}};</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form-submit">
                  <button type="submit">{{$t('usercenter.KYC_account_verification.submit')}}</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
// import { Cell, Alert } from 'vux'
import Vue from 'vue'
import { i18n } from "@/plugins";
import { validPassword, runMessage, runNotice, translation, getAllRegion } from "@/helpers";
import _AutoComplete from "@/components/custom/_AutoComplete.vue";
import { CellGroup, Cell, Icon, Select, Option, RadioGroup } from 'iview'
import _AuthInput from "@/components/custom/_AuthInput.vue";
Vue.component('Cell', Cell)
Vue.component('CellGroup', CellGroup)
Vue.component('Icon', Icon)
export default {
  components: {
    // Cell, Alert
    "auto-complete": _AutoComplete,
    "auth-input": _AuthInput
  },
  name: "",
  data () {
    return {
      first_name: "",
      last_name: "",
      language: '中文',
      sShowPage: 'default', //  default, changePassword, invite, realnameauthentication
      oChangePasswordInfo: {
        bShowPasswordDesc: false,
        bShowSurePasswordDesc: false,
        bShowPasswordStats: false,
        bShowSurePasswordStats: false
      },
      old_password: "",
      new_password: "",
      confirm_password: "",
      country: { code: "CN", name: this.$t('usercenter.KYC_account_verification.china') },
      doc_number: "",
      kyc_status: "",
      doc_type: {
        code: 'Passport',
        type: 'certificate',
        name: this.$t('usercenter.KYC_account_verification.passport')
      },
      upload_front_side: null,
      upload_back_side: null,
      upload_hand_held: null,
      uploaded_front_side: null,
      uploaded_back_side: null,
      uploaded_hand_held: null,
      visible: false,
      uploadList: []
    }
  },
  mounted () {
    this.$EventBus.$on("region", country => (this.country = country));
    this.$EventBus.$on("doc_type", doc_type => (this.doc_type = doc_type));
    this.$store.dispatch("user/GET_KYC_STATUS").then((res) => {
      this.kyc_status = res.kyc_status
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
    getAllRegion() {
      return getAllRegion();
    }
  },
  methods: {
    onFileChange($event, type) {
      const fileName = $event.target.name;
      const file = $event.target.files;
      if (!file.length) return;
      let formData = new FormData();
      let reader = new FileReader();
      //let imageURL = URL.createObjectURL(file[0]);

      if (type === "front") {
        this.upload_front_side = file[0];
        reader.onload = e => (this.uploaded_front_side = e.target.result);
      } else if (type === "back") {
        this.upload_back_side = file[0];
        reader.onload = e => (this.uploaded_back_side = e.target.result);
      } else if (type === "hand") {
        this.upload_hand_held = file[0];
        reader.onload = e => (this.uploaded_hand_held = e.target.result);
      }
      reader.readAsDataURL(file[0]);
      formData.append(fileName, file);
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("first_name", this.first_name);
      formData.append("last_name", this.last_name);
      formData.append("country", this.country.code);
      formData.append("doc_type", this.doc_type);
      formData.append("doc_number", this.doc_number);
      formData.append("upload_front_side", this.uploaded_front_side);
      formData.append("upload_back_side", this.uploaded_back_side);
      formData.append("upload_hand_held", this.uploaded_hand_held);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      try {
        await new ApiClient("trade")
        .post("account/kyc/upload", 
          formData, 
          config
        )
        .then(() => {
          this.$Message.success('KYC信息上传成功');
        })
        .catch(() => {
          this.$Message.error('KYC信息上传失败');
        });
        this.afterUpload();
      } catch (error) {
        return error;
      }
    },
    afterUpload() {
      this.uploaded_front_side = this.uploaded_back_side = this.uploaded_hand_held = this.upload_front_side = this.upload_back_side = this.upload_hand_held = null;
      this.first_name = this.last_name = this.doc_number = "";
    },
    vaildPassword() {
      const {
        old_password,
        new_password,
        confirm_password
      } = this;
      if (!old_password || !new_password || !confirm_password) return true;
      return !old_password || old_password === new_password || validPassword(new_password) || validPassword(new_password, confirm_password);
    },
    changePSW() {
      const { old_password, new_password, confirm_password } = this;
      new ApiClient("auth")
        .put("resource/users/password", {
          old_password,
          new_password,
          confirm_password,
        })
        .then(() => {
          this.$Message.success('密码修改成功');
        })
        .catch(() => {
          this.$Message.error('密码修改失败');
        });
    },
    verifyPasswordFormat () {
      var reg = /^(?![0-9]+$)[\x20-\x7e]{8,20}$/
      if (reg.test(this.new_password)) {
        this.oChangePasswordInfo.bShowPasswordDesc = false
      } else {
        this.oChangePasswordInfo.bShowPasswordDesc = true
      }
    },
    judgeSurePasswordSame () {
      if (this.new_password !== this.confirm_password) {
        this.oChangePasswordInfo.bShowSurePasswordDesc = true
      } else {
        this.oChangePasswordInfo.bShowSurePasswordDesc = false
      }
    },
    clickEye (e) {
      if (e === 'pw') {
        this.oChangePasswordInfo.bShowPasswordStats = !this.oChangePasswordInfo.bShowPasswordStats
      } else if (e === 'spw') {
        this.oChangePasswordInfo.bShowSurePasswordStats = !this.oChangePasswordInfo.bShowSurePasswordStats
      }
    },
    clickSeeInvitePage () {
      this.sShowPage = 'language'
    },
    clickChangePasswordSureButton () {
      this.sShowPage = 'default'
    },
    clickChangeMoneyPassword () {
      this.$Message.warning('请使用电脑版本设置密码')
    },
    logout() {
      this.$store.dispatch("user/LOGOUT");
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to one pictures can be uploaded.'
        });
      }
      return check;
    },
    checkSelectedLang(name) {
      return this.$t("name") === name;
    },
    setLanguage(locale) {
      localStorage.setItem("LANGUAGE_HASH", locale);
      i18n.locale = locale;
      this.$EventBus.$emit("ChangeLanguage", "");
    },
    redirect_link (link) {
        this.$router.push(link)
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
.user-body
  position: relative
  min-height: 100vh
  background-color: #f6f6f6
  padding-bottom: 55px
  color: #333
  .default-div
    .top-div
      background-color: #fff
      p
        height: px2rem(50px)
        font-size: px2rem(16px)
        line-height: px2rem(50px)
        padding-left: px2rem(20px)
      .user-info-div
        height: px2rem(100px)
        background-color: #003e58
        background-size: 100% 100%
        line-height: px2rem(90px)
        img
          width: px2rem(56px)
          line-height: px2rem(100px)
          margin-left: px2rem(20px)
          vertical-align: middle
        span
          font-size: px2rem(14px)
          color: #fff
          vertical-align: middle
          float: right
          margin-right: px2rem(20px)
          line-height: px2rem(100px)
    .main-div
      background-color: #fff
      .ivu-cell
        padding-top: px2rem(12px)
        padding-bottom: px2rem(12px)
      .action
        .ivu-cell-extra
          color: #003e58
    .login-out-button
      width: 80%
      background-color: #fff
      border: none
      font-size: px2rem(16px)
      padding: px2rem(10px) 0
      border-radius: px2rem(20px)
      margin: px2rem(100px) auto 0 auto
  .change-password-div
    background-color: #fff
    position: absolute
    min-height: 100%
    width: 100%
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
          border-radius: 6px
          border: 1px solid #eee
      .password-p, .sure-password-p
        margin-top: px2rem(20px)
        position: relative
        .eye
          position: absolute
          top: px2rem(28px)
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
      .form-control
        width: 100%
        input
          display: inline-block
          width: 100%
          position: relative
          cursor: text
          border: 1px solid #314362
          height: 32px
          padding: 0 15px
          border-radius: 4px
          transition: border 0.2s ease-in-out
        .autocomplete
          width: 100%
          background-color: #fff
          .select-con
            height: 32px
            line-height: 32px
            .con
              color: #333
          .list
            top: 33px
            z-index: 10003
            background-color: #fff
            li
              color: #333
      .form-submit
        margin-left: 10%
        text-align: center
        width: 80%
        line-height: 1.14667rem
        background: #2e3f5f
        border-radius: 4px
        button
          font-size: px2rem(16px)
          color: #fff
      .verification-p
        margin-top: px2rem(20px)
        font-size: px2rem(0px)
        text-align: center
        span
          font-size: px2rem(14px)
          margin-right: px2rem(4px)
          vertical-align: middle
          border: 1px solid #eee
          color: #003E58
          padding: px2rem(12.5px) px2rem(8.5px)
        input
          font-size: px2rem(16px)
          width: 63%
          padding: px2rem(9px) px2rem(9px)
          border: 1px solid #eee
          margin-right: px2rem(4px)
          vertical-align: middle
        button
          background-color: #003E58
          color: #fff
          width: px2rem(112px)
          padding: px2rem(11px) 0
          font-size: px2rem(14px)
          border-radius: 4px
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
  .language-div
    position: absolute
    min-height: 100%
    width: 100%
    .back-img
      position: fixed
      width: px2rem(28px)
      top: px2rem(10px)
      left: px2rem(10px)
    .lang
      padding-top: px2rem(60px)
      .change-button
        width: 80%
        background-color: #fff
        border: none
        font-size: px2rem(16px)
        padding: px2rem(10px) 0
        border-radius: px2rem(20px)
        margin: px2rem(100px) auto 0 auto

  .realname-authentication-div
    background-color: #fff
    position: absolute
    min-height: 100%
    width: 100%
    padding-bottom: 60px
    .back-img
      position: fixed
      width: px2rem(28px)
      top: px2rem(10px)
      left: px2rem(10px)
    .setting-body
      padding-top: px2rem(50px)
      left: 10%
      .form-row
        width: 85%
        margin-bottom: px2rem(10px)
        .form-label
          width: px2rem(180px)
          padding-left: px2rem(50px)
          color: #003e58
        .form-control
          width: 100%
          input
            display: inline-block
            width: 100%
            position: relative
            cursor: text
            border: 1px solid #314362
            height: 32px
            padding: 0 15px
            border-radius: 4px
            transition: border 0.2s ease-in-out
          .autocomplete
            width: 100%
            background-color: #fff
            .select-con
              height: 32px
              line-height: 32px
              .con
                color: #333
            .list
              top: 33px
              z-index: 10003
              background-color: #fff
              li
                color: #333
        .form-control.upload-photos
          width: 80%
          position: relative
          padding-top: px2rem(20px)
          .photos-list
            width: 100%
            position: relative
          .upload-box
            position: relative
            input
              position: absolute
              width: 100%
              height: 100%
              left: 0
              top: 0
              outline: none
              cursor: pointer
              opacity: 0
              z-index: 10002
            .upload-area
              width: 100%
              position: relative
            .img-uploaded
              border-radius: 4px
              width: px2rem(160px)
              // height: px2rem(70px)
              // position: absolute
              z-index: 999
              .preview
                width: 100%
          .upload-notice
              width: 100%;
              position: relative
      .form-submit
        margin-left: 10%
        text-align: center
        width: 80%
        line-height: 1.14667rem
        background: #2e3f5f
        border-radius: 4px
        button
          font-size: px2rem(16px)
          color: #fff


    .identity-authentication-div
      width: px2rem(350px)
      margin: 0 auto
      font-size: px2rem(14px)
      p
        text-align: right
        display: inline-block
        width: px2rem(120px)
      input
        width: px2rem(180px)
        padding: px2rem(2px) px2rem(4px)
        border-radius: 6px
        border: 1px solid #eee
        margin-left: px2rem(4px)
    ul
      li
        margin-top: px2rem(6px)
    .iviews-select
      width: px2rem(180px)
      margin-left: px2rem(4px)
      .ivu-select-dropdown
        background-color: #fff
      .ivu-select-item
        padding: 0 px2rem(14px)
    .sure-button
      margin-top: px2rem(30px)
      border-radius: px2rem(4px)
      width: px2rem(320px)
      background-color: #003E58
      color: #fff
      font-size: px2rem(16px)
      padding: px2rem(12px) 0
      border: none
.vux-alert
  .weui-dialog__hd
    padding: 0 !important
.demo-upload-list
  display: inline-block
  width: 60px
  height: 60px
  text-align: center
  line-height: 60px
  border: 1px solid transparent
  border-radius: 4px
  overflow: hidden
  background: #fff
  position: relative
  box-shadow: 0 1px 1px rgba(0,0,0,.2)
  margin-right: 4px
.demo-upload-list img
  width: 100%
  height: 100%
.demo-upload-list-cover
  display: none
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(0,0,0,.6)
.demo-upload-list:hover .demo-upload-list-cover
  display: block
.demo-upload-list-cover i
  color: #fff
  font-size: 20px
  cursor: pointer
  margin: 0 2px
</style>
