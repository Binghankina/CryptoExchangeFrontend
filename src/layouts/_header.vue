<template>
  <Header>
    <Menu mode="horizontal" theme="dark">
      <router-link class="layout-logo" tag="a" to="/" exact/>
      <router-link  tag="a" to="/">
        <span class="logo-title">GIH</span>
      </router-link>
      <div class="layout-nav-left">
        <router-link tag="a" to="/exchange" class="ivu-menu-item">{{$t('header.exchange')}}</router-link>
        <router-link tag="a" to="/c2c" class="ivu-menu-item">C2C</router-link>
        <router-link tag="a" to="/projectcenter" class="ivu-menu-item" disabled>{{$t('header.project_center')}}</router-link>
      </div>
      <div class="layout-nav-right">
        <div v-if="isLoggedIn" class="auth">
          <router-link
            tag="a"
            to="/assets/balance"
            class="ivu-menu-item"
            :class="{ 'ivu-menu-item-active': $store.state.public.path.includes('/assets') }"
            v-text="$t('header.my_assets')"
          />
          <Dropdown>
            <a href="javascript:void(0)">
              {{ $t("header.orders") }}
              <Icon type="ios-arrow-down"/>
            </a>
            <DropdownMenu slot="list">
              <router-link
                class="ivu-dropdown-item"
                tag="a"
                to="/exchange_record/open"
                v-text="$t('header.open_orders')"
              />
              <router-link
                class="ivu-dropdown-item"
                tag="a"
                to="/exchange_record/history"
                v-text="$t('header.order_history')"
              />
              <router-link
                class="ivu-dropdown-item"
                tag="a"
                to="/exchange_record/transaction"
                v-text="$t('header.trade_history')"
              />
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            @on-click="($name) => {
              if ($name === 'logout') logout();
            }"
          >
            <a href="javascript:void(0)" class="m-avatar">
              <img src="@/assets/img/avatar.png" width="32px" height="32px">
              <Icon type="ios-arrow-down"/>
            </a>
            <DropdownMenu class="user-dropdown" slot="list">
              <router-link class="ivu-dropdown-item information" tag="li" to="/account/information">
                <div class="email">{{ $store.state.user.email.indexOf('fake@fake.com') === -1 ? $store.state.user.email : '' }}</div>
                <div class="uid">UID: {{ $store.state.user.uid }}</div>
              </router-link>
              <div class="user-menu">
                <router-link
                  class="ivu-dropdown-item"
                  tag="a"
                  to="/account/information"
                  v-text="$t('header.user.account_information')"
                />
                <router-link
                  class="ivu-dropdown-item"
                  tag="a"
                  to="/account/security"
                  v-text="$t('header.user.account_security')"
                />
                <router-link
                  class="ivu-dropdown-item"
                  tag="a"
                  to="/account/kyc"
                  v-text="$t('header.user.kyc_account_verification')"
                />
                <DropdownItem name="logout" v-text="$t('header.user.logout')"/>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div v-else class="un-auth">
          <router-link
            class="ivu-btn"
            tag="button"
            type="button"
            to="/signin"
            v-text="$t('header.login')"
          />
          <router-link
            class="ivu-btn"
            tag="button"
            type="button"
            to="/signup"
            v-text="$t('header.register')"
          />
        </div>
        <Dropdown placement="top-end" @on-click="setLanguage">
          <a href="javascript:void(0)">
            {{ $t("name") }}
            <Icon type="ios-arrow-down"/>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(data, index) in $config.messages"
              :key="index"
              :name="index"
              :selected="checkSelectedLang(data.name)"
              class="lang-selector"
              v-text="data.name"
            />
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>

<script>
import { i18n } from "@/plugins";
import { error } from "util";

export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.status === "success";
    }
  },
  methods: {
    checkSelectedLang(name) {
      return this.$t("name") === name;
    },
    setLanguage(locale) {
      localStorage.setItem("LANGUAGE_HASH", locale);
      i18n.locale = locale;
      this.$EventBus.$emit("ChangeLanguage", "");
    },
    logout() {
      this.$store.dispatch("user/LOGOUT");
    }
  }
};
</script>

<style lang="sass">
.logo-title
  float: left
  margin-left: 30px
  font-size: 16px
  color: #fff
  font-weight: 400
</style>
