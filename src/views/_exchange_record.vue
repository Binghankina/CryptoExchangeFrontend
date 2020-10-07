<template>
  <Content class="page-record">
    <div class="container">
      <ul class="order-menu">
        <router-link
          tag="li"
          to="open"
          :class="{ selected: $store.state.public.path === '/exchange_record/open' }"
        >
          <i class="ivu-icon custom-icon-list"/>
          {{$t('orders.open.title')}}
        </router-link>
        <router-link
          tag="li"
          to="history"
          :class="{ selected: $store.state.public.path === '/exchange_record/history' }"
        >
          <i class="ivu-icon custom-icon-history"/>
          {{$t('orders.history.title')}}
        </router-link>
        <router-link
          tag="li"
          to="transaction"
          :class="{ selected: $store.state.public.path === '/exchange_record/transaction' }"
        >
          <i class="ivu-icon custom-icon-history"/>
          {{$t('orders.transaction.title')}}
        </router-link>
      </ul>
      <router-view/>
    </div>
  </Content>
</template>
