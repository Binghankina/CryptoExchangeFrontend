<template>
  <Content class="page-auth">
    <div class="auth-box">
      <div>
        <h3 class="title">Reset Password</h3>
        <form @submit.prevent="ResetPassword">
          <auth-input
            name="password"
            type="password"
            v-model="password"
            :className="{ ierror: validPassword(), g: password }"
            :labelClass="{ berror: validPassword() }"
            placeholder="Password"
            :labelNeed="true"
            :enableVaild="validPassword()"
            :errorText="translation('password')"
          />
          <auth-input
            name="confirm_password"
            type="password"
            v-model="repassword"
            :className="{ ierror: validPassword(true) && repassword, g: repassword }"
            :labelClass="{ berror: validPassword(true) && repassword }"
            placeholder="Confirm Password"
            :labelNeed="true"
            :enableVaild="validPassword(true) && repassword != ''"
            :errorText="translation('repassword')"
          />
          <button type="submit" :disabled="validPassword(true)|| validPassword()">Reset Password</button>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import Helpers from "./helpers";
import { runNotice } from "@/helpers";
import router from "@/router";

export default {
  mixins: [Helpers],
  data: () => ({
    password: "",
    repassword: ""
  }),
  methods: {
    ResetInput() {
      this.password = "";
      this.confirm_password = "";
      this.$store.state.user.reset_password_token = "";
      router.push("/signin");
    },
    ResetPassword() {
      const token = this.$store.state.user.reset_password_token;
      const { password, repassword } = this;
      new ApiClient("auth")
        .post("/identity/users/password/set_password", {
          token,
          password,
          confirm_password: repassword
        })
        .then(() => {
          runNotice("warning", "Password was changed");
          this.ResetInput();
        })
        .catch(error => {
          return this.ResetInput();
        });
    }
  }
};
</script>