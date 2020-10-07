<template>
  <Content class="page-user">
    <div class="container">
      <ul class="setting-menu">
        <li class="avatar-user">
          <img src="@/assets/img/avatar.png">
          <p class="uid">{{ $store.state.user.mobile }}</p>
          <!-- <div class="email">{{ $store.state.user.email }}</div> -->
        </li>
        <router-link
          tag="li"
          to="information"
          :class="{ selected: $store.state.public.path === '/account/information' }"
          class="pick"
        >
          <i class="ivu-icon custom-icon-user"/>
          {{ $t("usercenter.account_information.title") }}
        </router-link>
        <router-link
          tag="li"
          to="security"
          :class="{ selected: $store.state.public.path === '/account/security' }"
          class="pick"
        >
          <i class="ivu-icon custom-icon-protect"/>
          {{ $t("usercenter.account_security.title") }}
        </router-link>
        <router-link
          tag="li"
          to="kyc"
          :class="{ selected: $store.state.public.path === '/account/kyc' }"
          class="pick"
        >
          <i class="ivu-icon custom-icon-card"/>
          {{ $t('header.user.kyc_account_verification') }}
        </router-link>
         <router-link
          tag="li"
          to="c2c"
          :class="{ selected: $store.state.public.path === '/account/c2c' }"
          class="pick"
        >
          <Icon type="ios-card-outline" />
          {{ $t("usercenter.c2c.title") }}
        </router-link>
        <router-link
          tag="li"
          to="history"
          :class="{ selected: $store.state.public.path === '/account/history' }"
          class="pick"
        >
          <i class="ivu-icon custom-icon-history"/>
          {{ $t("usercenter.login_history.title") }}
        </router-link>    
      </ul>
      <router-view/>
    </div>
  </Content>
</template>
