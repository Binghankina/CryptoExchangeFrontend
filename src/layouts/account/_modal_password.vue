<template>
  <Modal
    v-model="modal.enabled"
    @on-visible-change="onChangeShow()"
    class-name="password-modal"
    footer-hide
    width="400"
    padding-top="40px"
  >
    <need-security
      v-if="0 && !$store.state.user.otp"
      @closeModal="modal.enabled = false"
      @changeModal="changeModal"
    />
    <div v-else-if="1 || ($store.state.user.otp && step === 1)">
      <div class="title">{{ $t("usercenter.account_security.rows.psw.action") }}</div>
      <form @submit.prevent="changePSW()">
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
        <button type="submit" :disabled="vaildPassword()">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading" v-if="modal.loading_button" />
          {{$t('usercenter.sure')}}
        </button>
      </form>
    </div>
  </Modal>
</template>

<script>
import { validPassword, runMessage, runNotice, translation } from "@/helpers";
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    step: 1,
    old_password: "",
    new_password: "",
    confirm_password: "",
  }),
  methods: {
    vaildPassword() {
      const {
        step,
        old_password,
        new_password,
        confirm_password
      } = this;
      if (!old_password || !new_password || !confirm_password) return true;
      return !old_password || old_password === new_password || validPassword(new_password) || validPassword(new_password, confirm_password);
    },
    resetInput() {
      this.old_password = this.new_password = this.confirm_password = "";
      this.resetStep();
    },
    checkPassword() {
      this.modal.loading_button = true;
      new ApiClient("auth")
        .post("resource/users/checkpassword", { password: this.old_password })
        .then(() => {
          this.step++;
          this.modal.loading_button = false;
        })
        .catch(error => error);
    },
    changePSW() {
      this.modal.loading_button = true;
      const { old_password, new_password, confirm_password } = this;
      new ApiClient("auth")
        .put("resource/users/password", {
          old_password,
          new_password,
          confirm_password,
        })
        .then(() => {
          this.modal.loading_button = false;
          this.remove();
          runNotice("success", translation("密码修改成功"));
        })
        .catch(() => (this.modal.loading_button = false));
    }
  }
};
</script>
