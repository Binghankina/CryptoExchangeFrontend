<template lang="html">
  <div class="setting-main c2c">
    <div class="setting-head">{{$t('usercenter.c2c.title')}}</div>
    <div class="setting-body c2c-body">
      <div>{{$t('usercenter.c2c.alipay')}}
        <a @click="onClick('bindAlipay')" class="setting-a">{{$store.state.user.alipay ? $t('usercenter.c2c.change') : $t('usercenter.c2c.add')}}</a>
      </div>
      <div>{{$t('usercenter.c2c.bank')}}
        <a @click="onClick('bindBank')" class="setting-a">{{$store.state.user.bank_number ? $t('usercenter.c2c.change') : $t('usercenter.c2c.add')}}</a>
      </div>
    </div>
    <modal-alipay ref="bindAlipay" />
    <modal-bank ref="bindBank" />
  </div>
</template>

<script>
import _modal_alipay from "@/layouts/account/_modal_alipay.vue";
import _modal_bank from "@/layouts/account/_modal_bank.vue";
import Helpers from "./helpers";
export default {
  mixins: [Helpers],
  components: {
    "modal-alipay": _modal_alipay,
    "modal-bank": _modal_bank
  },
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
    // this.checkAssetsPasswordInfo()
    console.log(this.$store.state.user)
  },
  methods: {
  }
}
</script>

<style lang="sass">
  .c2c-body
    div
      padding: 20px 0
      font-size: 14px
      border-bottom: 1px solid #314363
      .setting-a
        color: #0095ff
        float: right
</style>
