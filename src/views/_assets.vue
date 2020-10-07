<template>
  <Content class="page-assets">
    <div class="container">
      <ul class="assets-menu">
        <router-link
          tag="li"
          to="balance"
          :class="{ selected: $store.state.public.path === '/assets/balance' }"
        >{{$t('assets.balance')}}</router-link>
        <router-link
          tag="li"
          to="history"
          :class="{ selected: $store.state.public.path === '/assets/history' }"
        >{{$t('assets.history_record')}}</router-link>
      </ul>
      <router-view/>
    </div>
  </Content>
</template>
