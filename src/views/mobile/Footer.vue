<template lang="html">
  <div class="" style="position: fixed;width: 100%;bottom: 0;max-width: 800px;">
    <tabbar>
      <tabbar-item @on-item-click="changeTabIndex('Index')" :selected="nTaberIndex == 0">
        <img slot="icon" :src="nTaberIndex == 0 ? require('@/assets/img/m/download-222.png') : require('@/assets/img/m/download-22.png')">
        <span slot="label">{{ $t('footer_m.markets') }}</span>
      </tabbar-item>
      <tabbar-item @on-item-click="changeTabIndex('TradingCenter')" :selected="nTaberIndex == 1">
        <img slot="icon" :src="nTaberIndex == 1 ? require('@/assets/img/m/download-2222.png') : require('@/assets/img/m/download-2.png')">
        <span slot="label">{{ $t('footer_m.exchange') }}</span>
      </tabbar-item>
      <tabbar-item @on-item-click="changeTabIndex('MC2C')" :selected="nTaberIndex == 2">
        <img slot="icon" :src="nTaberIndex == 2 ? require('@/assets/img/m/download-12.png') : require('@/assets/img/m/download-3.png')">
        <span slot="label">{{ $t('footer_m.c2c') }}</span>
      </tabbar-item>
      <tabbar-item @on-item-click="changeTabIndex('Assets')" :selected="nTaberIndex == 3">
        <img slot="icon" :src="nTaberIndex == 3 ? require('@/assets/img/m/download-44.png') : require('@/assets/img/m/download-4.png')">
        <span slot="label">{{ $t('footer_m.assets') }}</span>
      </tabbar-item>
      <tabbar-item @on-item-click="changeTabIndex('User')" :selected="nTaberIndex == 4">
        <img slot="icon" :src="nTaberIndex == 4 ? require('@/assets/img/m/download-55.png') : require('@/assets/img/m/download-5.png')">
        <span slot="label">{{ $t('footer_m.account') }}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar, TabbarItem
  },
  data () {
    return {
      nTaberIndex: undefined,
      aPageNameList: ['Index', 'TradingCenter', 'MC2C', 'Assets', 'User']
    }
  },
  inject: ['reload'],
  watch: {
    '$route' (to, from) {
      if (to.name === from.name) {
        this.reload()
      } else {
        this.nTaberIndex = this.aPageNameList.indexOf(to.name) || 0
      }
    }
  },
  methods: {
    changeTabIndex: function (e) {
      if (this.$route.name === e) {
        this.reload()
      } else {
        this.$router.push({name: e})
        this.nTaberIndex = this.aPageNameList.indexOf(this.$route.name) || 0
      }
    }
  },
  mounted() {
    this.nTaberIndex = this.aPageNameList.indexOf(this.$route.name) || 0
  }
}
</script>

<style lang="sass">
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label
  color: #43478c !important
.weui-tabbar__item
  padding: 8px 0 0 !important
.weui-tabbar__icon
  width: 24px !important
  height: 24px !important
</style>
